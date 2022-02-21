const express = require('express')
const swaggerDocument = require('./swagger.json')
const swaggerUi = require('swagger-ui-express')
const bodyParser = require('body-parser')
const db = require('./products')
const app = express()
const cors = require("cors")
const PORT = process.env.PORT || 3000
const authorization = require('./middleware/authorize')

app.use("/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
)

app.use(
  cors({
    origin: "*",
  })
)

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (req, res) => {
  res.json({ api_documentation: '/api-docs'})
})

app.get('/products',authorization, db.getProducts)
app.get('/products/:pid', authorization, db.getProductByPid)
app.post('/products', authorization,db.createProduct)
app.patch('/products/edit/:pid', authorization,db.editProduct)
app.patch('/products/reduce/:pid',authorization ,db.reduceProduct)
app.delete('/products/delete/:pid', authorization ,db.deleteProduct)


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`)
})
