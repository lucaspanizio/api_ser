import sqlite3 from "sqlite3";

const DBSOURCE = "./database.db";
const SQL_CREATE_TABLE = `
  create table if not exists providers 
    (id    integer primary key autoincrement, 
     name  text unique not null,
     cpf   text unique not null, 
     phone text,
     email text unique,
     bio   text,
     photoimage text)`;

export const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Não conseguiu conectar na base
    console.error(err.message);
    throw err;
  } else {
    // Crio a tabela se ainda não existir
    db.run(SQL_CREATE_TABLE, (err) => {
      if (err) {
        console.error(err.message);
        throw err;
      }
    });
  }
});
