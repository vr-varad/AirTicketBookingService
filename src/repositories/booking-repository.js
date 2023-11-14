const {Booking} = require('../models/index')
const {StatusCodes } = require('http-status-codes')
const {ValidationError, AppError} = require('../utils/errors/index')


class BookingRepository{
  async create(data){
    try {
      const booking = await Booking.create(data)
      return booking
      
    } catch (error) {
      console.log('hello ji')
      if(error.name == 'SequelizeValidationError'){
        throw new ValidationError(error)
      }
      throw new AppError('RepositoryError','Cannot Create Booking','There was some issue creating the booking, please try this again',StatusCodes.INTERNAL_SERVER_ERROR)
    }
  }

  async update(bookingId, data){
    try {
      const booking = await Booking.findByPk(bookingId)
      if(data.status){
        booking.status  = data.status
      }
      await booking.save()

      return booking
    } catch (error) {
      throw new AppError(
        'RepositoryError',
        'Cannot Update Booking',
        'There was some issue updating the booking, please try this again',
        StatusCodes.INTERNAL_SERVER_ERROR)
    }
  }
}

module.exports = BookingRepository