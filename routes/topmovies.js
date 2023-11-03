const express = require('express')
const router = express.Router();
const { listMovie,
    getMovieByID,
     addMovie, 
     updateMovie,
    deleteMovie,
    } = require('../controllers/topmovies');


router.get('/', listMovie);                                //get= // obtener////
router.get('/:Rank', getMovieByID);                          //http://localhost:3000/api/v1/users/?                
router.put('/', addMovie);
router.patch('/:Rank', updateMovie);
router.delete('/:Rank', deleteMovie);



module.exports = router