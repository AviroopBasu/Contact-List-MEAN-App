const express = require('express');
const router = express.Router();
var Contact = require('../models/contacts');
//Retrieve data
router.get('/contacts', (req, res, next)=> {
    Contact.find((err, contacts)=> {
        res.json(contacts);
    })
});

//Add Contact
router.post('/contact', (req, res, next)=> {
    let newContact = new Contact({
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        phone: req.body.phone
    });

    newContact.save((err, contact)=> {
        if(err){
            res.json({msg : 'Failed to add'});
            console.log(err);
        } else {
            res.json({msg : 'Contact added successfully'});
        }
    })
});


//Delete contact
router.post('/contact/:id', (req, res, next)=> {
   Contact.remove({_id : req.params.id}, (err, result)=>{
       if(err){
           res.json(err);
       }
       else {
           res.json(result);
       }
   })
});

module.exports = router;
