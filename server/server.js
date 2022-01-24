const express = require('express')
const cors = require('cors')
const ConnectDB = require("./config/db.js")

// SETTING ENV VARIABLES: 
if( process.env.NODE_ENV !== "production" ) {
    require('colors')
    require('dotenv').config({ path: './config/dev.env' })
}

// SERVER AND DATABASE LAUNCH:
ConnectDB()
const app = express()

// BODY PARSERS:
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// CORS:
app.use(cors())

// POSTS ROUTER:
const PostsRouter = require('./routes/posts.js')
app.use('/posts', PostsRouter)

// REDIRECT TO FRONTEND IF PATH IS NOT POSTS:
app.get('*', (req, res)=>{
    if( process.env.NODE_ENV === "production" ) {
        res.redirect('https://memoreel.netlify.app/')
    } else {
        res.redirect('http://localhost:3000/')
    }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    if( process.env.NODE_ENV === "production" ) {
        console.log(`- server running on port ${PORT}...`)
    } else {
        console.log(`- server running on port ${PORT}...`.yellow.bold.underline)
    }
})