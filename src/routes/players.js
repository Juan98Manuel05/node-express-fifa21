const { Router } = require("express");
const router = Router()

const mysqlConnection = require('../database');

router.get('/players', (req, res) => {

    let { search, order = 'asc', page } = req.query

    if(search){
        let numPerPage = parseInt(req.query.npp, 10) || 24
        page = parseInt(req.query.page, 10) || 0

        let skip = page * numPerPage

        let limit = skip + ',' + numPerPage

        const query = `SELECT * FROM players WHERE nombre_jugador LIKE '%${search}%' ORDER BY nombre_jugador ${order} LIMIT ${limit}`
    
        mysqlConnection.query(query, (err, rows, fields) => {
            if(!err){
                res.json({
                    "page": page,
                    "items": rows.length,
                    "totalItems": rows.length, 
                    "players": rows
                })
            }else{
                throw err;
            }
        })
    }else{

        let numPerPage = parseInt(req.query.npp, 10) || 24
        let page = parseInt(req.query.page, 10) || 0
        let skip = page * numPerPage

        let limit = skip + ',' + numPerPage
    
        mysqlConnection.query('SELECT * FROM players LIMIT ' + limit , (err, rows, fields) => {
            if(!err){
                res.json({
                    "page": 1,
                    "items": rows.length,
                    "totalItems": rows.length, 
                    "players": rows
                })
            }else{
                throw err;
            }
        })
    }

})

router.get('/:id', (req, res) => {
    const { id } = req.params
    mysqlConnection.query(`SELECT * FROM players WHERE id = ?`, [id], (err, rows, fields) => {
        if(!err){
            res.json(rows[0])
        }else{
            console.log(err)
        }
    })
})


module.exports = router