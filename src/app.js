import express from 'express'
import router from './routes.js'

const app = express()
const PORT = 3000

app.use(express.json())
app.use(router)
app.listen(PORT, function(err){
  if (err) console.log(err);
  console.log(`Api Online em: http://localhost:${port}`)
});