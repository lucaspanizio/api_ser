import express from 'express'
import { db } from './configDB.js';

const app = express()
const PORT = 3000

app.use(express.json())

// Rota padrão
app.get("/", (req, res) => {
  res.json({ message: "Bem vindo a api_ser!" });
});

// Insere um novo prestador
app.post('/provider', (req, res) => {
  let provider = req.body;
  let query = 'insert into providers (name, phone, email, bio, photoimage) values (?,?,?,?,?)'
  let params = [provider.name, provider.phone, provider.email, provider.bio, provider.photoImage]

  db.run(query, params, (err, data) => {
    if (err) {
      return res.status(400).json({ error: err.message })
    } else {
      query = `select seq id from sqlite_sequence where name = 'providers'`
      db.get(query,(err, data) => {
        res.status(201).json({ 
          id: data.id,
          message: 'Prestador incluído com sucesso!'
        })
      })
    }
  })
})

// Altera o prestador pelo id
app.put("/provider/:id", (req, res) => {
    let id = req.params.id
    let new_provider = req.body

    let query = 'update providers set'  
    for (let key in new_provider) {
      query += ` ${key} = '${new_provider[key]}',`;
    }
    query = query.slice(0, -1) + ` where id = ${id}`

    db.run(query, (err, data) => {
      if (err) {
        return res.status(400).json({ error: err.message })
      } else {
        res.status(200).json({ 
          id,
          message: 'Prestador alterado com sucesso!'
        })
      }
    });
})

// Remove o prestador pelo id
app.delete('/provider/:id', (req, res) => {
  let id = req.params.id
  let query = `delete from providers where id = ${id}`

  db.run(query, (err, data) => {
    if (err) {
      return res.status(400).json({ error: err.message })
    }
    res.status(200).json({
      id,
      message: 'Prestador excluído com sucesso!'
    })
  });
})

// Consulta pelo id
app.get('/provider/:id', (req, res) => {
  let id = req.params.id
  let query = `select * from providers where id = ${id}`

  db.get(query, (err, data) => {
    if (err) {
      return res.status(400).json({ error: err.message })
    }
    res.status(200).json(data)
  })
})

// Consulta por trecho do nome
app.get('/provider', (req, res) => {
  let name = req.body.name.toUpperCase()
  let params = ['%' + name + '%']
  let query = 'select * from providers where upper(name) like ?'

  db.all(query, params, (err, data) => {
    if (err) {
      return res.status(400).json({ error: err.message })
    }
    res.status(200).json(data)
  })
})

// Retorna todos os prestadores
app.get('/providers', (req, res) => {
  let query = "select * from providers"

  db.all(query, (err, data) => {
    if (err) {
      return res.status(400).json({ error: err.message })
    }
    res.status(200).json(data)
  })
})

app.listen(PORT, function(err){
  if (err) console.log(err);
  console.log(`Api Online em: http://localhost:${PORT}`)
});

function log(req, res){
  console.log(`
    ${new Date().toLocaleString()}
    Method:  ${req.method}
    Request: ${req.headers.host}${req.path} 
    Body:    ${JSON.stringify(req.body)}
    Params:  ${JSON.stringify(req.params)}
    Status:  ${res.statusCode} ${res.statusMessage}
    `
  ) 
}