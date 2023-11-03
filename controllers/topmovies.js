const {request, reponse, response} = require('express');
const movieModel = require('../models/topmovies');
const pool = require('../DB');

//1//
const listMovie = async(req = request, res = response)  => {
let conn;
try {
    conn = await pool.getConnection();

    const movie = await conn.query(movieModel.getAll, (err) => {
        if (err) {
            throw err;
            
        }
    })    
    res.json(movie)
} 
catch (error) {
    console.log(error);
    res.status(500).json(error);

} finally{
    if(conn)
    {conn.end();}
}
}

//2//
const listMovieByID = async(req = request, res = response)  => {
    const {id}=req.params;
    let conn; 

    if (isNaN(Rank)) {   //cuando no es un número//
        res.status(400).json({msg: `THE ID - IS INVALID`});    //mostrata este mensaje cuando se tecleé un carácter en vez de un munero// 
        return;
        
    }
    
    try {
        conn = await pool.getConnection();
    
        const [user] = await conn.query(movieModel.getMovieByID, [id], (err) => {    //consulta de los registro en nuestra base de datos//
            if (err) {
                throw err;
                
            }
        })

        if (!user) {
            res.status(404).json({msg: `USER WITH ID ${id} NOT FOUND`});     //mostrata este mensaje cuando se tecleé un numero en vez de un carácter// 
            return;
        }

        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    
    } finally{
        if(conn)
        {conn.end();}
    }
    }


    //Nuevo EndPoint 3//
    const addMovie = async(req = request, res = response) => {
        const {
                Rank,
                Movie_Title,
                Year,
                Score,
                Director
                
        } = req.body;

        if (!Rank || !Movie_Title || !Year || !Score || !Director ) {
            res.status(400).json({msg: 'MISSING INFORMATION'});
            return;
        }

        const user = [
                Rank,
                Movie_Title,
                Year,
                Score,
                Director
                ]
        let conn;

        try {
            conn = await pool.getConnection();

            const [Movie_TitleExists] = await conn.query(movieModel.getByMovie_Title, [Movie_Title], (err) => {
                if (err) throw err;
                })
                if (Movie_TitleExists) {
                    res.status(409).json({msg: 'Movie title ${Movie_Title} already exists'});
                    return;
                   }


            const Movie_TitleAdded = await conn.query(movieModel.addMovie, [...Movie_Title], (err) => {
                if (err) throw err;
                })
                if (Movie_TitleAdded.affecteRows === 0){
                    throw new Error('Movie_Title not added')
                }                                                   
                res.json({msg: 'USER ADDED SECCESFULLY'});        
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
            return;
        }finally{
            
            if(conn)conn.end();
            
        }
        }


        //Nuevo EndPoint 4 Modificar o Actualizar un registro ya registrado en nuestra base de datos//
        const updateMovie = async (req = request, res = response) => {
            let conn;
        
            const {
                Rank,
                Movie_Title,
                Year,
                Score,
                Director
                
            } = req.body;

            const { id } = req.params;

            let movieNewData = [
                Rank,
                Movie_Title,
                Year,
                Score,
                Director
            ];
        
            try {
                conn = await pool.getConnection();
        
        const [userExists] = await conn.query
        (movieModel.getByRank, 
            [Rank], 
            (err) => {
            if (err) throw err;
        });

        if (!userExists || userExists.is_active ===0){
            res.status(409).json({msg: `User with ID ${id} not found`});
                 return;
        }

        const [usernameExists] = await conn.query(usersModel.getByUsername, [username], (err) => {
            if (err) throw err;
            })
            if (usernameExists) {
                res.status(409).json({msg: 'Username ${username} already exists'});
                return;
               }

        const [emailExists] = await conn.query(usersModel.getByEmail, [email], (err) => {
              if (err) throw err;
             })
              if (emailExists) {
                  res.status(409).json({msg: 'Email ${email} already exists'});
                 return;
                   }

                const userOldData = [
                userExists.username,
                userExists.password,
                userExists.email,
                userExists.name,
                userExists.lastname,
                userExists.phonenumber,
                userExists.role_id,
                userExists.is_active     
              ];

              userNewData.forEach((userData, index) =>{
                if (!userData){
                    userNewData[index] = userOldData[index];
                }
              })
                   const userUpdated = await conn.query(
                    usersModel.updateRow,
                    [...userNewData, id],
                    (err) =>{
                        if (err) throw err;
                    }
                   )

         if (userUpdated.affecteRows === 0){
           throw new Error('User not added')
                } 

                res.json({msg: 'USER UPDATED SECCESFULLY'});
                
            } catch (error) {
                console.log(error);
                res.status(500).json(error);
                return;
            } finally {
                if (conn) conn.end();
            }
        }
        
    


//endpoint 5//para eleminar  un usuario
        const deleteMovie = async(req = request, res = response) => {
            let conn;
            const {Rank} = req.params; 


           try {

            conn = await pool.getConnection();

            const [userExists] = await conn.query
            (movieModel.getByRank, 
                [Rank], 
                (err) => {
                if (err) throw err;
            });

            if (!userExists || userExists.is_active ===0){
                res.status(409).json({msg: `User with ID ${id} not found`});
                     return;

            }

            const userDeleted = await conn.query(
                movieModel.deleteMovie,
                [Rank],
                (err) => {
                    if (err) throw err;
                }
            );
            
            if (userDeleted.affecteRows === 0){
                throw new Error('User not deleted');

            }
            res.json ({msg: 'User deleted seccesfully'});

           } catch (error) {
            console.log(error);
            res.status(500).json(error);
        } finally{
            if(conn) (await conn).end();


        }
            
        }
   
        
    module.exports = {
        listMovie,
        listMovieByID,
        addMovie,
        updateMovie,
        deleteMovie,
        
     }
