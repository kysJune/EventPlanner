const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/hello/cleveland', (req, res) =>{
    res.send('Hello Cleveland!')
})

app.listen(port, () => {
  console.log(`server listening on port ${port}`)
});
