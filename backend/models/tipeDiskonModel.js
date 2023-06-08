// import connection
import db from "../config/database.js";
  
// Get All TipeDiskons
export const getTipeDiskons = (result) => {
    db.query(
    "SELECT * FROM master_tipe_diskon",
    (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}