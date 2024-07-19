const express = require('express')
const db = require('../modals/mongodb')
const {ObjectId} = require('mongodb')


const route = express.Router()

route.post('/', async(req, res)=>{
   try{
     let{name,email, password} = req.body
      let database=await db.getdatabase()
      const collection = database.collection('users')
       data={
       name:name,
       email:email,
       password:password
      }
      const user = collection.insertOne(data)
      if(!user){
       return res.status(400).send("Invaild Credentials")
      }

      res.status(200).json("user added")


   }
   catch(err){
       console.log(err)

   }
})

route.get('/login', async(req, res)=>{
   try{
      let database = await db.getdatabase()
      let collection= database.collection('users')
      let userdata =  collection.find({})
      let cursor = await userdata.toArray()
      res.status(200).json(cursor)

   }
   catch(err){
       console.log(err)
   }
})


route.post('/edit', async(req, res)=>{
  try{
     let {_id,name,email,password,place}= req.body
     let userId =new ObjectId(_id)
     let database = await db.getdatabase()
     let collection = await database.collection('users')

     let cursor = await collection.findOne({_id: new ObjectId(_id)})

     if(cursor){
        await collection.updateOne({_id: userId},{$set:{  name:name,
           email:email,
           password:password,
           place:place}})
        return res.status(200).send({message:"Updated successfully"})
     }
     else {
        return res.status(404).send({ message: "User not found" })
    }  
  
}
catch(err){
  console.log(err)
}
})

route.post('/delete',async(req, res)=>{
  try{
   let data = req.body
   let database = db.getdatabase()
   let collection = (await database).collection('users')
   const cursor = await collection.find({_id: new ObjectId(data._id)})
   let user = await cursor.toArray()
   if(user.length == 1){
     await collection.deleteOne({_id: new ObjectId(data._id)})
     return res.status(200).send({message:"deleted successfully"})
   }

  }
  catch(err){
     console.log(err)
  }
})

module.exports = route