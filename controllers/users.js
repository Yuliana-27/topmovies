const {request, reponse, response} = require('express');
const usersModel = require('../models/users');
const pool = require('../DB');


//Nuevo EndPoint 3//
const addUser=async(req = request, res = response) => {
    const {
        Rank,
        Movie_Title,
        Year,
        Score,
        Director,
        Cast
    } = req.body;

    if (!Rank || !Movie_Title || !Year || !Score || !Director || !Cast) {
        res.status(400).json({msg: 'MISSING INFORMATION'});
        return;
    }

    const user = [
        Rank,
        Movie_Title,
        Year,
        Score,
        Director,
        Cast
    ]
    let conn;

    try {
        conn = await pool.getConnection();

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



        const userAdded = await conn.query(usersModel.addRow, [...user], (err) => {
            if (err) throw err;
            })
            if (userAdded.affecteRows === 0){
                throw new Error('User not added')
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
        const updateUser = async (req = request, res = response) => {
            let conn;
        
            const {
                Rank,
                Movie_Title,
                Year,
                Score,
                Director,
                Cast
            } = req.body;

            const { id } = req.params;

            let userNewData = [
                Rank,
                Movie_Title,
                Year,
                Score,
                Director,
                Cast
            ];
        
            try {
                conn = await pool.getConnection();
        
        const [userExists] = await conn.query
        (usersModel.getByID, 
            [id], 
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
        const deleteUser = async(req = request, res = response) => {
            let conn;
            const {id} = req.params; 


           try {

            conn = await pool.getConnection();

            const [userExists] = await conn.query
            (usersModel.getByID, 
                [id], 
                (err) => {
                if (err) throw err;
            });

            if (!userExists || userExists.is_active ===0){
                res.status(409).json({msg: `User with ID ${id} not found`});
                     return;

            }

            const userDeleted = await conn.query(
                usersModel.deleteRow,
                [id],
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

//endpoint 6 //
        const signInUser = async (req = request, res = response) => {
            let conn;

            const {username, password} = req.body;

            conn = await pool.getConnection();


            try {
                if(!username || !password){
                    res.status(400).json({msg: 'YOU NEED MUST SEND USERNAME AND PASSWORD'});
                    return;
    
                }
    
                const [user]= await conn.query(usersModel.getByUsername,
                    [username],
                    (err) =>{
                        if(err)throw err;
                    });
    
                    if (!user) {
                        res.status(400).json({msg: `WRONG USERNAME OR PASSWORD`});
                        return;
                        
                    }
    
                    const passwordOK = await bcrypt.compare(password, user.password);

                    if (!passwordOK) {
                        res.status(400).json({msg: `WRONG USERNAME OR PASSWORD`});
                        return;  
                    }

                    delete(user.password);
                    delete(user.create_at);
                    delete(user.updated_at);

                    res.json(user);
            } catch (error) {
                console.log(error);
                res.status(500).json(error);

            }finally{
                if(conn)conn.end();
            }
        }
             
        
    module.exports = {
        listUsers,
        listUserByID,
        addUser,
        updateUser,
        deleteUser,
        signInUser,
     }