const express = require('express')
const bodyParser = require('body-parser')

const {Port} = require('./config/serverConfig')
const db = require('./models/index')

const app = express()
const apiRoutes = require('./routes/index')

const setupandStartServer = () =>{

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended:true}))

  app.use('/api',apiRoutes)

  app.listen(Port, ()=>{
    console.log('Server Started at port',Port)
  })
  if(process.env.DB_SYNC){
    db.sequelize.sync({alter: true})
  }
}
setupandStartServer()