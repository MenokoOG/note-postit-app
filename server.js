const express = require('express')
const app = express()
const morgan = require('morgan')
require('dotenv').config()
const { expressjwt } = require('express-jwt')
const connectToDb = require('./config/db')

app.use(express.json())
app.use(morgan('dev'))

// Connect to the database
connectToDb()

app.use('/api/auth', require('./routes/authRouter'))
app.use('/api/main', expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] }))
// other routes that need protecting here
app.use('/api/main/note/', require('./routes/noteRouter'))

app.use((err, req, res, next) => {
    console.log(err)
    if (err.name === "UnauthorizedError") {
        res.status(err.status)
    }
    return res.send({ errMsg: err.message })
})


// app.use(express.static(path.join(__dirname, "client", "dist")))

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "dist", "index.html")); });

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})
