// import connection
import db from "../config/database.js";
  
// Get All Customers
export const getCustomers = (result) => {
    db.query(
    "SELECT \
        `customer`.`id`, \
        `customer`.`nama`, \
        `customer`.`contact`, \
        `customer`.`email`, \
        `customer`.`alamat`, \
        `customer`.`tipe_diskon_id`, \
        `customer`.`ktp`, \
        `customer`.`diskon`, \
        `master_tipe_diskon`.`tipe_diskon` \
    FROM \
        `customer` \
    LEFT JOIN `master_tipe_diskon` ON `master_tipe_diskon`.`id` = `customer`.`tipe_diskon_id`",
    (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}
  
// Get Single Customer
export const getCustomerById = (id, result) => {
    db.query(
    "SELECT \
        `customer`.`id`, \
        `customer`.`nama`, \
        `customer`.`contact`, \
        `customer`.`email`, \
        `customer`.`alamat`, \
        `customer`.`tipe_diskon_id`, \
        `customer`.`ktp`, \
        `customer`.`diskon`, \
        `master_tipe_diskon`.`tipe_diskon` \
    FROM \
        `customer` \
    LEFT JOIN `master_tipe_diskon` ON `master_tipe_diskon`.`id` = `customer`.`tipe_diskon_id` \
    WHERE (`customer`.`id` = ?)", 
    [id], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });   
}
  
// Insert Customer to Database
export const insertCustomer = (data, result) => {
    db.query(
    "INSERT INTO `customer` (`nama`, `contact`, `email`, `alamat`, `tipe_diskon_id`, `ktp`, `diskon`) \
     VALUES (?,?,?,?,?,?,?);", 
    [data.nama, data.contact, data.email, data.alamat, data.tipe_diskon_id, data.ktp_url, data.diskon], 
    (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}
  
// Update Customer to Database
export const updateCustomerById = (data, id, result) => {
    db.query(
    "UPDATE `customer` \
    SET `nama` = ?, `contact` = ?, `email` = ?, `alamat` = ?, `tipe_diskon_id` = ?, `ktp` = ?, `diskon` = ? \
    WHERE (`customer`.`id` = ?)", 
    [data.nama, data.contact, data.email, data.alamat, data.tipe_diskon_id, data.ktp_url, data.diskon, id], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}
  
// Delete Customer to Database
export const deleteCustomerById = (id, result) => {
    db.query("DELETE FROM customer WHERE id = ?", [id], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}