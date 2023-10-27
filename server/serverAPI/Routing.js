import Express, { query } from 'express'

import queryDatabase from './MongoControll.js'

try {
    queryDatabase(async db => {
      const data = await db.collection('Member').find({}).toArray()
      console.log('Members retrieved:', data.length)
    }, 'SteganographyDatabase')
  } catch(err) {
    console.error('Failed to connect to database')
    console.error(err)
  }


const gameRouter = new Express.Router()

gameRouter.use(Express.json())

// get endpoint for All Games 
gameRouter.get('/test', (req, res) => {

    queryDatabase(async db => {
      const data = await db.collection('Member').find({}).project(
        {_id:0, userId:1, userPw:1, email:1 , isAdmin:1 , userName:1}
      ).toArray()
      console.log('mems retrieved:', data.length)
      res.json(data)
    }, 'SteganographyDatabase')
  })

  gameRouter.get('/getById/:userId', (req, res) => {
    const iUserId = req.params.userId;
    queryDatabase(async db => {
      const data = await db.collection('Member').find({userId:parseInt(iUserId)}).project(
        {_id:0, userId:1, userPw:1, email:1 , userName:1}
      ).toArray()
      console.log('mems retrieved2:', data.length)
      res.json(data)
    }, 'SteganographyDatabase')
  })

//Member Object Parameters
//_id       (Auto-Generated By Mongo)
//int userId
//string userName
//string userPw
//string email
//bool isAdmin
gameRouter.get('/getUserByCredentials/:userName/:userPw', (req, res) => {
  const uName = req.params.userName
  const uPass = req.params.userPw
  queryDatabase(async db => {
    const data = await db.collection('Member').find({userName: uName, userPw:uPass}).toArray()
    res.json(data)
  }, 'SteganographyDatabase')
})

gameRouter.get('/getUserByUserNameAndEmail/:userName/:email', (req, res) => {
  const uName = req.params.userName
  const uEmail = req.params.email
  queryDatabase(async db => {
    const data = await db.collection('Member').find({userName: uName, email: uEmail}).toArray()
    res.json(data)
  }, 'SteganographyDatabase')
})

gameRouter.get('/getUserByUsername/:userName', (req, res) => {
  const uName = req.params.userName
  queryDatabase(async db => {
    const data = await db.collection('Member').find({userName: uName}).toArray()
    res.json(data)
  }, 'SteganographyDatabase')
})

gameRouter.get('/getUserByEmail/:email', (req, res) => {
  const uEmail = req.params.email
  queryDatabase(async db => {
    const data = await db.collection('Member').find({email: uEmail}).toArray()
    res.json(data)
  }, 'SteganographyDatabase')
})


gameRouter.delete('/testDell/:userId', (req, res) => {  /*  &userPw  */ 
  const iUserId = req.params.userId;
  //iUserId = 123456789;
  console.log('userID to delete: ',iUserId);


  queryDatabase(async db => {

    const result = await db.collection('Member').deleteOne({userId:parseInt(iUserId)})
    if (result.deletedCount > 0) {
      res.json({ success: true, id: `${iUserId}`, message: `${iUserId} found and deleted >:) ` })
    } else {
      res.status(404).json({error: true, message: ` ${iUserId} not foundx :(`})
    }
    console.log(res);
  }, "SteganographyDatabase") 
})

gameRouter.delete('/dellByUserName/:userName', (req, res) => { 
  const UserNm = req.params.userName;
  console.log('user to delete: ',UserNm);


  queryDatabase(async db => {

    const result = await db.collection('Member').deleteOne({userName:String(UserNm)})
    if (result.deletedCount > 0) {
      res.json({ success: true, userName: `${UserNm}`, message: `${UserNm} found and deleted >:) ` })
    } else {
      res.status(404).json({error: true, message: ` ${UserNm} not foundx :(`})
    }
    console.log(res);
  }, "SteganographyDatabase") 
})

gameRouter.put('/add', (req, res) => {
  const reqbody = req.body
  let valid = false

  if (/* typeof (reqbody.id) === 'number' && typeof (reqbody.name) === 'string' &&
    typeof (reqbody.year) === 'number' && typeof (reqbody.desc) === 'string' &&
    typeof (reqbody.minplayers) === 'number' && typeof (reqbody.maxplayers) === 'number' &&
    typeof (reqbody.minPlayTime) === 'number' && typeof (reqbody.maxPlayTime) === 'number' &&
    typeof (reqbody.minage) === 'number' &&
    typeof (reqbody.weight) === 'number' && typeof (reqbody.rating) === 'number' &&
    typeof (reqbody.designer) === 'object' && typeof (reqbody.artist) === 'object' &&
    typeof (reqbody.publisher) === 'object' && typeof (reqbody.thumb) === 'string' &&
    typeof (reqbody.poster) === 'string' */true) {
    valid = true
  }

    queryDatabase(async db => {
      const data = await db.collection('Member').find({userId: reqbody.userId}).toArray()
      if (data.length == 0 && valid) {
        const result = await db.collection('Member').insertOne({

          userId: reqbody.userId,
          userName: reqbody.userName,
          userPw: reqbody.userPw,
          email: reqbody.email,
          isAdmin: reqbody.isAdmin
        })

        res.status(200).json({ success: true, id: `${reqbody.iUserId}`, message: `${reqbody.iUserId} inserted into array` })
      }
      else {res.status(400).json({error: true, message: 'type mismatch error, check types are correct'})}
    }, "SteganographyDatabase")
  }
)

gameRouter.put('/addUser', (req, res) => {
  //const reqbody = JSON.parse(req.body);
  const reqbody = req.body;
  let valid = false;
  if(typeof(reqbody.userName) == 'string' &&
  typeof(reqbody.userPw) == 'string' && 
  typeof(reqbody.email) == 'string'){
    valid = true;
  }else{
    res.status(400).json({error: true, message: 'type mismatch. Check types'})
  }
  //One Mongo Error is looking like the connection to the db times out. 
  //I'm not sure why this would be the case since async is added where it should be.
  queryDatabase(async db => {
    const usersWithName = await db.collection('Member').find({userName: reqbody.userName}).toArray()
    const usersWithEmail = await db.collection('Member').find({email: reqbody.email}).toArray()
    if(usersWithName.length == 0 && usersWithEmail.length == 0 && valid){
      const data = await db.collection('Member').insertOne({
        userName: reqbody.userName,
        userPw: reqbody.userPw,
        email: reqbody.email,
        isAdmin: false
      })
      res.status(200).json({success:true,message: `A new user was added to the database. ${data}`})
    }else{
      res.status(400).json({error:true, message: 'User already exists.'})
    }
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