require('dotenv').config()
const express = require('express')
const axios = require('axios')
const app = express()
app.use(express.json())

const lembretes = {}
let id = 0

// GET - lembretes
app.get('/lembretes', (req, res) => {
    res.json(lembretes)
})

// POST - lembretes
app.post('/lembretes', (req, res) => {
    //identificador gerado com contador id++
    id++
    //gerar um identificador e pegar um obj da req {texto: 'fazer café'}
    const lembrete = {id, texto: req.body.texto}
    //adicionar à base, assim: {15: {id: 15, texto: fazer café}}
    lembretes[id] = lembrete

    axios.post('http://barramento-service:10000/eventos', {
      type: 'LembreteCriado',
      payload: {
        id, texto: req.body.texto
      }
    })
    //devolver o recurso criado e, mais ainda, ajustar o código de status para 201
    res.status(201).json(lembretes[id])
})

app.post('/eventos', (req, res) => {
  console.log(req.body)
  res.status(200).json({mensagem: 'ok'})
})

app.listen(4000, () => console.log(`Lembrete. Porta 4000`))