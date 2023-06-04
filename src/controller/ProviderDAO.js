import { db } from '../configDB.js';

// Insere um novo prestador
export async function insert(provider) {
  return new Promise((resolve, reject) => {
    let query = 'insert into providers (name, phone, email, bio, photoimage) values (?,?,?,?,?)'
    let params = [provider.name, provider.phone, provider.email, provider.bio, provider.photoImage]

    db.run(query, params, (err, data) => {
      if (err) {
        reject(err.message)
      } else {
        query = `select seq id from sqlite_sequence where name = 'providers'`
        db.get(query,(err, data) => {
          resolve({ 
            id: data.id,
            message: 'Prestador incluído com sucesso!'
          })
        })
      }
    })
  })
}

// Altera o prestador pelo id
export async function update(id, new_provider) {
  return new Promise((resolve, reject) => {
    let query = 'update providers set'  
    for (let key in new_provider) {
      query += ` ${key} = '${new_provider[key]}',`;
    }
    query = query.slice(0, -1) + ` where id = ${id}`

    db.run(query, (err, data) => {
      if (err) {
        reject(err.message)
      } else {
        resolve(data)        
      }
    })
  })
}

// Remove o prestador pelo id
export async function destroy(id){
  return new Promise((resolve, reject) =>{
    let query = `delete from providers where id = ${id}`

    db.run(query, (err, data) => {
      if (err) {
        reject(err.message)
      } else {
        resolve(data)        
      }
    })
  })
}

// Retorna prestador pelo id
export async function getById(id){
  return new Promise((resolve, reject) =>{
    let query = `select * from providers where id = ${id}`

    db.get(query, (err, data) => {
      if (err) {
        reject(err.message)
      } else {
        resolve(data)        
      }
    })
  })
}

// Retorna todos os prestadores por trecho do nome
export async function getByName(name){
  return new Promise((resolve, reject) =>{
    let params = ['%' + name.toUpperCase() + '%']
    let query = 'select * from providers where upper(name) like ?'

    db.get(query, params, (err, data) => {
      if (err) {
        reject(err.message)
      } else {
        resolve(data)        
      }
    })
  })
}

// Retorna todos os prestadores
export async function getAll(){
  return new Promise((resolve, reject) =>{
    let query = 'select * from providers'
    db.all(query, (err, data) => {
      if (err) {
        reject(err.message)
      } else {
        resolve(data)        
      }
    })
  })
}

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