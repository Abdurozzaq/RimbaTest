// Import function from Unit Model
import { getUnits } from "../models/unitModel.js";
  
// Get All Units
export const showUnits = (req, res) => {
    getUnits((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}