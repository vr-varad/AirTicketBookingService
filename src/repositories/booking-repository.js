const {Booking} = require('../models/index')
const {StatusCodes } = require('http-status-codes')
const {ValidationError, AppError} = require('../utils/errors/index')


class BookingRepositories{
  async create(data){
    try {
      const booking = await Booking.create(data)
      return booking
      
    } catch (error) {
      if(error.name == 'SequelizeValidationError'){
        throw new ValidationError(error)
      }
      throw new AppError('RepositoryError','Cannot Create Booking','There was some issue creating the booking, please try this again',StatusCodes.INTERNAL_SERVER_ERROR)
    }
  }
}

module.exports = BookingRepositories