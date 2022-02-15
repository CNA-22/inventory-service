const express = require('express')
const bodyParser = require('body-parser')
const db = require('./products')
const app = express()
const cors = require("cors")
const PORT = process.env.PORT || 3000

app.use(
  cors({
    origin = "*",
  })
)

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (req, res) => {
  res.json({ all_data: '/products', by_sku: '/products/:pid'})
})

app.get('/products', db.getProducts)
app.get('/products/:pid', db.getProductByPid)
app.post('/products', db.createProduct)
app.patch('/products/edit/:pid', db.editProduct)
app.patch('/products/reduce/:pid', db.reduceProduct)
app.delete('/products/:pid', db.deleteProduct)

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`)
})
