// Import function from TipeDiskon Model
import { getTipeDiskons } from "../models/tipeDiskonModel.js";
  
// Get All TipeDiskons
export const showTipeDiskon = (req, res) => {
    getTipeDiskons((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}