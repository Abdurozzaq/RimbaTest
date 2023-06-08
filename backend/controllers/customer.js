// Import function from Customer Model
import { getCustomers, getCustomerById, insertCustomer, updateCustomerById, deleteCustomerById } from "../models/customerModel.js";
  
// Get All Customers
export const showCustomers = (req, res) => {
    getCustomers((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
  
// Get Single Customer 
export const showCustomerById = (req, res) => {
    getCustomerById(req.params.id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
  
// Create New Customer
export const createCustomer = (req, res) => {
    if (!req.file) {
        console.log("No file upload");
    } else {
        var imgsrc = 'http://' + req.headers.host + '/images/' + req.file.filename
        var data = req.body;
        data['ktp_url'] = imgsrc;
        insertCustomer(data, (err, results) => {
            if (err){
                res.send(err);
            }else{
                res.json(results);
            }
        });
    }
}
  
// Update Customer
export const updateCustomer = (req, res) => {
    if (!req.file) {
        console.log("No file upload");
    } else {
        var data = req.body;
        var id = req.params.id;
        var imgsrc = 'http://' + req.headers.host + '/images/' + req.file.filename
        data['ktp_url'] = imgsrc;
        updateCustomerById(data, id, (err, results) => {
            if (err){
                res.send(err);
            }else{
                res.json(results);
            }
        });
    }
}
  
// Delete Customer
export const deleteCustomer = (req, res) => {
    const id = req.params.id;
    deleteCustomerById(id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}