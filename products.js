require('dotenv').config()

const { Pool } = require('pg')
const pool = new Pool({
    user: process.env.NAME,
    host: process.env.HOST,
    database: process.env.NAME,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT,
})

const getProducts = (req, res) => {
    pool.query('SELECT * FROM lager', (err, result) => {
        if (err) {
            throw err
        }
        res.status(200).json(result.rows)
    })
}

const getProductByPid = (req, res) => {
    const pid = parseInt(req.params.pid)
    pool.query('SELECT * FROM lager WHERE pid = $1', [pid], (err, result) => {
        if (err) {
            throw err
        }
        res.status(200).json(result.rows[0])
    })
}

const createProduct = (req, res) => {
    const { pid, antal } = req.body
    pool.query('INSERT INTO lager (pid, antal) VALUES ($1, $2)', [pid, antal], (err, result) => {
        if (err) {
            throw err
        }

        res.status(201).send(`Produkten med PID: ${pid} har lagts till i lagret`)
    })
}

const editProduct = (req, res) => {
    const pid = parseInt(req.params.pid)
    const antal = req.body
    pool.query('UPDATE lager SET antal = antal - $1 WHERE pid = $2 RETURNING antal', [antal, pid], (err, result) => {
        if (err) {
            throw err
        }
        res.status(200).send(`Mängden av produkten ${pid} har ändrats. Ny saldo: ` + Object.values(result.rows[0]))
    })
}

const reduceProduct = (req, res) => {
    const pid = parseInt(req.params.pid)
    const antal = req.body
    pool.query('UPDATE lager SET antal = antal - $1 WHERE pid = $2 RETURNING antal', [antal, pid], (err, result) => {
        if (err) {
            throw err
        }
        res.status(200).send(`Mängden av produkten ${pid} har ändrats. Ny saldo: ` + Object.values(result.rows[0]))
    })
}

const deleteProduct = (req, res) => {
    const pid = parseInt(req.params.pid)
    pool.query('DELETE FROM lager WHERE pid = $1', [pid], (err, result) => {
        if (err) {
            throw err
        }
        res.status(200).send(`Produkten med PID: ${pid} raderad från lagret`)
    })
}



module.exports = {
    getProducts,
    getProductByPid,
    createProduct,
    deleteProduct,
    editProduct,
    reduceProduct,
}