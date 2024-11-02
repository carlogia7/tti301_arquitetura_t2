require('dotenv').config()
const express = require('express')
const axios = require('axios')
const app = express()
app.use(express.json())

const eventos = []

//Endpoint = POST /eventos
app.post('/eventos', async (req, res) => {
    //1. pega corpo da req 
    const evento = req.body
    eventos.push(evento)
    console.log(evento)
    try {
      await axios.post('http://localhost:4000/eventos', evento)
    }
    catch(err){}
    try {
      await axios.post('http://localhost:5000/eventos', evento)
    }
    catch(err){
      await axios.post('http://localhost:6000/eventos', evento)
    }
    try {
      await axios.post('http://localhost:7000/eventos', evento)
    }
    catch (err) {}
    res.status(200).json({mensagem: 'ok'})
})

app.get('/eventos', function(req, res){
    res.json(eventos)
})

app.listen(10000, () => console.log(`Barramento. Porta 10000.`))