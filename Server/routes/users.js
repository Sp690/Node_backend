const express = require('express');
const router = express.Router();
const User = require('../models/users')

router.get('/', (req, res) => {
  User.find()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(404).json({ error: 'No user found' }));
});

// Incase we need this API
router.get('/:userId', (req, res) => {
  User.findById({ _id: req.params.userId })
    .then(user => res.status(200).json(user))
    .catch(err => res.status(404).json({ error: 'No user found by this id' }));
});

// Create user
router.post('/', (req, res) => {
  const newUser = new User({
    name: req.body.name,
    emp_id: req.body.emp_id,
    team: req.body.team
  });
  newUser
    .save()
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ error: 'Failed to create' + err }));
});

// Edit user
router.put('/:userId', (req, res) => {
  User.findByIdAndUpdate(req.params.userId, {
    $set: {
      name: req.body.name,
      emp_id: req.body.emp_id,
      team: req.body.team
    }
  })
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ error: 'Failed to edit' }));
});

// Delete user
router.delete('/:userId', (req, res) => {
  User.findByIdAndDelete({ _id: req.params.userId })
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ error: 'Failed to delete' }));
});

module.exports = router;