const { default: axios } = require('axios');
const {BookingRepository} = require('../repositories/index');
const {FLIGHT_SERVICE_PATH} = require('../config/serverConfig');
const { ServiceError } = require('../utils/errors');


class BookingService{
  constructor(){
    this.bookingRepository = new BookingRepository()
  }

  async createBooking(data){
    try {
      const flightId = data.flightId;
      const  getFlightUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`
      const flight  = await axios.get(getFlightUrl)
      const flightData = flight.data.data
      if(data.noOfSeats > flightData.totalSeats){
        throw new ServiceError('Something went wrong in the booking Service','Insufficient Number Of seats available.')
      }
      const totalCost = flightData.price * data.noOfSeats
      const bookingPayload = {...data,totalCost }
      const booking = await this.bookingRepository.create(bookingPayload)
      const updateFlightUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`
      console.log('hello')
      await axios.patch(updateFlightUrl,{totalSeats: flightData.totalSeats-booking.noOfSeats})
      const finalBooking = await this.bookingRepository.update(booking.id,{status:'Booked'})
      return finalBooking
    } catch (error) {     
      if(error.name == 'ValidationError' || error.name == 'RepositoryError'){
        throw error
      }
      throw new ServiceError();
    }

  }
}


module.exports = BookingService