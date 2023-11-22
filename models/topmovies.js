const movieModel = {
    getAll: `
       SELECT 
             *
          FROM
             movie
    `,
    getByRank:`
    SELECT 
             *
          FROM
          movie
            WHERE
                Rank =?
    `,

    getByMovie_Title:`
    SELECT 
             *
          FROM
          movie
            WHERE
                Movie_Title =?
    `,

    addmovie: `
    INSERT INTO 
    movie(
        Rank,
        Movie_Title,
        Year,
        Score,
        Director
       
      
    )VALUES(
       ?, ?, ?, ?, ?
    )
    `,
    
    updatemovie: `
    UPDATE  
       movie
    SET 
    Movie_Title = ?,
    Year = ?,
    Score = ?,
    Director = ?
   
    
    WHERE
       Rank=?
    `,
    
    deletemovie:`
    
    DELETE FROM
           movie
       WHERE
           Rank =?
    
    `,
    }
    module.exports = movieModel;
    