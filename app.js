const express = require('express')
const bodyParser=require('body-parser')
const userRouter = require('./Routes/routes')
const cors= require('cors')

const app = express()
app.use(bodyParser.urlencoded())
app.use(express.json())

const corsOptions={
    origin:"*",
    method:"GET,POST,PUT,PATCH,DELETE",
    preFlightContinue:false,
    OptionSucessStatus:204
}
app.use(cors(corsOptions))

app.use('/user',userRouter)

app.use((req,res)=>{
    res.status(400).send("<h1>Error found</h1>")
})

app.listen(3500)
