const { Router } = require("express");
const router = Router()
const mysqlConnection = require('../database')

router.post('/team', (req, res) => {
    let { name, page } = req.body
    if( name || page){
        const query = `SELECT * FROM players WHERE equipo LIKE ? GROUP BY nombre_jugador`
        mysqlConnection.query(query, [name], (err, rows, fields) => {
            if(!err){
                res.json({
                    "page": 1,
                    "totalPages": 1,
                    "items": rows.length,
                    "totalItems": rows.length, 
                    "players": rows
                })
            }
        })
    }

})


module.exports = router