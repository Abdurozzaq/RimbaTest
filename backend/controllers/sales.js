// Import function from Sale Model
import { getSales, getSaleById, insertSale } from "../models/salesModel.js";
  
// Get All Sales
export const showSales = (req, res) => {
    getSales((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
  
// Get Single Sale 
export const showSaleById = (req, res) => {
    getSaleById(req.params.id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
  
// Create New Sale
export const createSale = (req, res) => {
    const data = req.body;
    insertSale(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}