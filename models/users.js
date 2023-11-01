const usersModel = {
    getAll: `
       SELECT 
             *
          FROM
            users
    `,
    getByID:`
    SELECT 
             *
          FROM
            users
            WHERE
                id=?
    `,
    getByUsername:`
    SELECT 
             *
          FROM
            users
            WHERE
                username=?
    `,
    getByEmail:`
    SELECT 
             *
          FROM
            users
            WHERE
                email=?
    `,
    addRow: `
    INSERT INTO 
    users(
        Rank,
        Movie_Title,
        Year,
        Score,
        Director,
        Cast
      
    )VALUES(
       ?, ?, ?, ?, ?, ?
    )
    `,
    
    updateRow: `
    UPDATE   users
    SET 
    Rank = ?,
    Movie_Title = ?,
    Year = ?,
    Score = ?,
    Director = ?,
    Cast = ?
    
    WHERE
       id=?
    `,
    
    deleteRow:`
    
    UPDATE 
        users
     SET
        is_active=0
       WHERE
           id=?
    
    
    `,
    
    
    
    }
    
    
    module.exports = usersModel;
    