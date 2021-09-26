const { Router } = require("express")
const router = Router()
const _ = require('underscore')


const mysqlConnection = require('../database');


const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

router.get('/', async(req, res) =>{

    for(let i = 0; i <= 908; i ++){
        const response = await fetch(`https://www.easports.com/fifa/ultimate-team/api/fut/item?page=${i}`)
        const { items } = await response.json()

        // const values = [] 
        _.each(items, (player, i) => {
            
            const name = `${player.firstName} ${player.lastName}`
            const position = player.position
            const nation = player.nation.name
            const club = player.club.name
            
            const query = "INSERT INTO players(nombre_jugador, posicion, nacionalidad, equipo) VALUES (?, ?, ?, ?)"
            
            if(name && position && nation && club){
                mysqlConnection.query(query, [name, position, nation, club], function(err) {
                    if (err) throw err;
                });

            }else{
                res.status(500).send('There was an error');
            }
        })
    }

    
})

module.exports = router