const express = require('express')
const cors = require('cors')
const moment = require('moment')
const app = express()
app.use(express.json())
app.use(cors())

const logs = []
let id = 1

// Formata data/hora
const formataDataHora = () => {
    return moment().format('DD/MM/YYYY HH:mm')
}

// Endpoint para eventos
app.post('/eventos', (req, res) => {
    const evento = req.body

    const registro = {
        id: id++,
        evento_tipo: evento.tipo,
        data_hora: formataDataHora(),
    }
    
    logs.push(registro)
    console.log(`Evento: ${JSON.stringify(registro)}`)
    res.status(201).send({ msg: "Log registrado!" })
})

// Endpoint para os logs
app.get('/logs', (req, res) => {
    res.status(200).json(logs)
})

app.listen(10000, () => console.log(`Logs. Porta 8000.`))