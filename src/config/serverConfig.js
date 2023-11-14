const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  Port : process.env.Port,
  FLIGHT_SERVICE_PATH: process.env.FLIGHT_SERVICE_PATH
}