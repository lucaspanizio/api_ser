import { Router } from "express";

const router = Router();

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

router.get('/',  function(req, res) {
  res.send('Olá mundo!')
  log(req, res)
})

export default router;