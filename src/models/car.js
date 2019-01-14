const cars = require('../db')
const uuid = require('uuid/v4')

function getAllCars (limit) {
  return limit ? cars.slice(0, limit) : cars
}

function getCar (id) {
  const carID = cars.find(car => car.id === parseInt(id))
  return carID
}

function deleteCar (id) {
const index = cars.findIndex(car => car.id === parseInt(id))
if (index === -1 ) {
  return { status: 404, message: 'The car was not found so it was not deleted'}
}
const deletedCar = cars.splice(index, 1)
return deletedCar
}

function newCar (make, model, year) {
  const makeCar = { id: uuid(), make: make, model: model, year: year }
  cars.push(makeCar)
  return makeCar
}

function updateCar (id, make, model, year) {
  const updatedCar = cars.find(car => car.id === parseInt(id) )
  if (make) {
    updatedCar.make = make
  }
  if (model) {
    updatedCar.model = model
  }
  if (model) {
    updatedCar.year = year
  }

  return updatedCar
}

module.exports = { getAllCars, getCar, deleteCar, newCar, updateCar }