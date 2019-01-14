const models = require('../models/car')

function getAllCars (req, res, next) {
  const limit = req.query.limit
  const result  = models.getAllCars(limit)

  if (!result) {
    return next({ status: 404, message: 'No cars were found'})
  }
  res.status(200).send(result)
  // I have seen multiple versions of this. why?
  // res.status(200).send(result)
  // res.status(200).send({data})
  // res.status(200).json(data)

}

function getCar (req, res, next) {
  const id = req.params.id
  if (!id) {
    return next({ status: 400, message: 'You need to provide an id'})
  }
  const result = models.getCar(id)

  // if (!result) {
  //   return next({ status: 404, message: 'The car was not found'})
  // }
  // why are these setup differently?
//   if (result.errors) {
//     return next({ status: 400, error: { message: result.errors } })
// }
// if (!result)
// return next({ status: 404, message: "Game not Found" });
  res.status(200).send(result)
  // res.status(200).json({ data: result })
  // res.status(302).send(result);
}

function deleteCar (req, res, next) {
  const id = req.params.id
  const result = models.deleteCar(id)
  if (!result) {
    return next({ status: 404, message: 'The car was not found so it was not deleted'})
  }
  res.status(200).send(result)
}

function newCar (req, res, next) {
  const { make, model, year } = req.body
  if(!make) {
    return next ({ status: 400, message: 'The car was not created. Needs a make!'})
  }
  if(!model) {
    return next ({ status: 400, message: 'The car was not created. Needs a model!'})
  }
  if(!year) {
    return next ({ status: 400, message: 'The car was not created. Needs a year!'})
  }
  const result = models.newCar(make, model, year)
  res.status(201).send(result)
}

function updateCar (req, res, next) {
  const id = req.params.id
  if (!id) {
    return next ({ status: 400, message: 'The car cannot be found without an id.'})
  }
  if (!req.body) {
    return next ({ status: 400, message: 'Must attach a body to update a car'})
  }
  const { make, model, year } = req.body
  if (!make && !model && !year) {
    return next ({ status: 400, message: 'Must update car with a make, model, or year'})
  }
  const result = models.updateCar(id, make, model, year)
  if (!result) {
    return next({ status: 404, message: 'The car was not found so it was not updated'})
  }

  res.status(201).send(result)
}

module.exports = { getAllCars, getCar, deleteCar, newCar, updateCar }