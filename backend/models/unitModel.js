// import connection
import db from "../config/database.js";
  
// Get All Units
export const getUnits = (result) => {
    db.query(
    "SELECT * FROM master_unit",
    (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}