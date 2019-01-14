
const express = require('express');
const router = express.Router();
const controller = require('../controllers/cars');


router.get('/', controller.getAllCars)
router.get('/:id', controller.getCar)
router.delete('/:id', controller.deleteCar)
router.post('/', controller.newCar)
router.put('/:id', controller.updateCar)

module.exports = router