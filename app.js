const express = require('express')
const bodyParser = require('body-parser')
const db = require('./products')
const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (req, res) => {
  res.json({ all_data: '/products', by_sku: '/products/:sku'})
})

app.get('/products', db.getProducts)
app.get('/products/:sku', db.getProductBySku)
app.post('/products', db.createProduct)
app.patch('/products/:sku', db.editProduct)
app.delete('/products/:sku', db.deleteProduct)

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`)
})
