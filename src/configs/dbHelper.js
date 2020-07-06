require('dotenv').config()

const mariadb = require('mariadb');
const pool = mariadb.createPool({ 
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
    multipleStatements: true,
    connectionLimit: 5
});

function dbHelper() { 
    // 
    this.getConnection = function(callback) { 
        pool.getConnection() 
        .then(conn => { 
            callback(conn); 
        }).catch(err => { 
            //not connected 
        }); 
    }; 
    
    this.getConnectionAsync = async function() { 
        try { 
            let conn = await pool.getConnection(); 
                // console.log("conn = " + conn); // { affectedRows: 1, insertId: 1, warningStatus: 0 } 
            return conn; 
        } catch (err) { 
            throw err; 
        } 
        return null; 
    }; 

    this.sendJSON = function(response, httpCode, body) { 
        var result = JSON.stringify(body); 
        response.send(httpCode, result); 
    }; 
} 
    
module.exports = new dbHelper();

