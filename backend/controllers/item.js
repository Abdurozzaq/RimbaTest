// Import function from Item Model
import { getItems, getItemById, insertItem, updateItemById, deleteItemById } from "../models/itemModel.js";
  
// Get All Items
export const showItems = (req, res) => {
    getItems((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
  
// Get Single Item 
export const showItemById = (req, res) => {
    getItemById(req.params.id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
  
// Create New Item
export const createItem = (req, res) => {
    if (!req.file) {
        console.log("No file upload");
    } else {
        var imgsrc = 'http://' + req.headers.host + '/images/' + req.file.filename
        var data = req.body;
        data['barang_url'] = imgsrc;
        insertItem(data, (err, results) => {
            if (err){
                res.send(err);
            }else{
                res.json(results);
            }
        });
    }
}
  
// Update Item
export const updateItem = (req, res) => {
    if (!req.file) {
        console.log("No file upload");
    } else {
        var data = req.body;
        var id = req.params.id;
        var imgsrc = 'http://' + req.headers.host + '/images/' + req.file.filename
        data['barang_url'] = imgsrc;
        updateItemById(data, id, (err, results) => {
            if (err){
                res.send(err);
            }else{
                res.json(results);
            }
        });
    }
}
  
// Delete Item
export const deleteItem = (req, res) => {
    const id = req.params.id;
    deleteItemById(id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}