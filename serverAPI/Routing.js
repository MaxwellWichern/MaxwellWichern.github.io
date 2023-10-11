import Express, { query } from 'express'


import queryDatabase from '../serverAPI/MongoControll.js'

try {
    queryDatabase(async db => {
      const data = await db.collection('Member').find({}).toArray()
      console.log('Members retrieved:', data.length)
    }, 'SteganographyDatabase')
  } catch(err) {
    console.error('Failed to connect to database')
    console.error(err)
  }

  try {
    queryDatabase(async db => {
      const data = await db.collection('Member').find({}).project(
        {_id:0, userId:1}
      ).toArray()
      console.log('19Members retrieved:', data)
    }, 'SteganographyDatabase')
  } catch(err) {
    console.error('Failed to connect to database')
    console.error(err)
  }


const gameRouter = new Express.Router()

gameRouter.use(Express.json())

// get endpoint for All Games // what is '/bggGames for' ?
gameRouter.get('/bggGames', (req, res) => {

    queryDatabase(async db => {
      const data = await db.collection('Member').find({}).project(
        {_id:0, userId:1}
      ).toArray()
      console.log('Games retrieved2:', data.length)
      res.json(data)
    }, 'SteganographyDatabase')
  })

  export default gameRouter