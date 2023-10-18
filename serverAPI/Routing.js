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

  /* try {
    queryDatabase(async db => {
      const data = await db.collection('Member').find({}).project(
        {_id:0, userId:1}
      ).toArray()
      console.log('19Members retrieved:', data)
    }, 'SteganographyDatabase')
  } catch(err) {
    console.error('Failed to connect to database')
    console.error(err)
  } */


const gameRouter = new Express.Router()

gameRouter.use(Express.json())

// get endpoint for All Games // what is '/bggGames for' ?
gameRouter.get('/test', (req, res) => {

    queryDatabase(async db => {
      const data = await db.collection('Member').find({}).project(
        {_id:0, userId:1, userPw:1, email:1}
      ).toArray()
      console.log('mems retrieved2:', data.length)
      res.json(data)
    }, 'SteganographyDatabase')
  })

// delete endpoint



gameRouter.delete('/testDell/:userId', (req, res) => {
  const iUserId = req.params.userId;
  //iUserId = 123456789;
  console.log('userID to delete: ',iUserId);


  queryDatabase(async db => {

    const result = await db.collection('Member').deleteOne({userId:parseInt(iUserId)})
    if (result.deletedCount > 0) {
      res.json({ success: true, id: `${iUserId}`, message: `${iUserId} found and deleted >:) ` })
    } else {
      res.status(404).json({error: true, message: 'not foundx :('})
    }
    console.log(res);
  }, "SteganographyDatabase") 
})

/* gameRouter.insert('/testinsert/:MemberRecord', (req, res) => {
  const oMember = req.params.MemberRecord;

  queryDatabase(async db => {

    const result = await db.collection('Member').insertMany({id:parseInt(oMember)})

      res.json({ success: true, id: `${oMember}`, message: `${oMember} found and deleted` })
  
    console.log(res);
  }, "SteganographyDatabase")
}) */

  export default gameRouter