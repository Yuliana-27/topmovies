const netflixModel = {
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

    addmovie: `
    INSERT INTO 
    movie(
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
    
    updatemovie: `
    UPDATE  movie
    SET 
    Rank = ?,
    Movie_Title = ?,
    Year = ?,
    Score = ?,
    Director = ?,
    Cast = ?
    
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
    