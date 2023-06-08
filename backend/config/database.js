import mysql from "mysql2";
   
// Ubah credential database nya disini
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'rimba_test'
});
  
export default db;