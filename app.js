const express = require('express')
const bodyParser = require('body-parser')
const db = require('./products')
const app = express()
const cors = require("cors")
const PORT = process.env.PORT || 3000
const authorization = require('./middleware/authorize')

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

app.get('/products',authorization, db.getProducts)
app.get('/products/:pid', authorization, db.getProductByPid)
app.post('/products', authorization,db.createProduct)
app.patch('/products/edit/:pid', authorization,db.editProduct)
app.patch('/products/reduce/:pid',authorization ,db.reduceProduct)
app.delete('/products/:pid', authorization ,db.deleteProduct)


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`)
})
