require('dotenv').config()
const express = require('express')
const axios  = require('axios')
app = express()
app.use(express.json())

const baseConsulta = {}
const funcoes = {
    LembreteCriado: (lembrete) => {
        baseConsulta[lembrete.id] = lembrete
    },
    ObservacaoCriada: (observacao) => {
        const observacoes = baseConsulta[observacao.lembreteId]["observacoes"] || []
        observacoes.push(observacao)
        baseConsulta[observacao.lembreteId]["observacoes"] = observacoes
    },
    ObservacaoAtualizada: (observacao) => {
        const observacoes = baseConsulta[observacao.lembreteId]["observacoes"]
        const indice = observacoes.findIndex((o) => o.id === observacao.id)
        observacoes[indice] = observacao
    
    }
}

//GET /lembretes
app.get('/lembretes', (req, res) => {
    res.json(baseConsulta)
})
  

//POST /eventos
app.post('/eventos', (req, res) => {
    try {
      const evento = req.body
      console.log(evento)
      funcoes[evento.type](evento.payload)  
    }
    catch(err) {}
    res.json({msg: 'ok'})
})

app.listen(6000, async () => {
    console.log(`Consulta. 6000`)
    const resp = await axios.get('http://localhost:10000/eventos')
    resp.data.forEach((valor, indice, colecao) => {
      try {
        funcoes[valor.type](valor.payload)
      }
      catch(err) {}
    })
  
})