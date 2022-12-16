const express = require('express')
const router = express.Router()
const Employer = require('../models/employer')

// GET: /api/employers => return all employer data as json
router.get('/', (req, res) => {
    Employer.find((err, employers) => {
        if (err) {
            return res.json(err).status(404)
        }
        else {
            return res.json(employers).status(200)
        }
    }).sort('name')
})

// POST: /api/places => create a new place
router.post('/', (req, res) => {
    Employer.create(req.body, (err, newEmployer) => {
        if (err) {
            return res.json(err).status(400)
        }
        else {
            return res.json(newEmployer).status(201)
        }
    })
})

router.delete('/:_id', (req, res) => {
    Employer.deleteOne({_id: req.params._id}, (err, deleteResponse) => {
        if (err) {
            return res.json(err).status(400)
        } else {
            res.json(deleteResponse).status(200)
        }
    })
})

router.put('/:_id', (req, res) => {
    Employer.findOneAndUpdate({_id: req.params._id}, req.body, (err, employer) => {
        if (err) {
            return res.json(err).status(400)
        } else {
            res.json(employer).status(202)
        }
    })
})

// make public
module.exports = router