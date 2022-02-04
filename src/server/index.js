const express = require('express')

// import express from 'express'
const app = express()

const PORT = process.env.PORT || 8080
app.get('/api/:number', (req, res) => {
    const {number} = req.params
    res.json({message: 'the request is success with num, or else something'})
})

app.listen(PORT, () => {
    console.log(`Node server is listening to port: ${PORT}`)
})