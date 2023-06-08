// import connection
import db from "../config/database.js";
  
// Get All Items
export const getItems = (result) => {
    db.query(
    "SELECT \
        `item`.`id`, \
        `item`.`nama_item`, \
        `item`.`unit_id`, \
        `item`.`stok`, \
        `item`.`harga_satuan`, \
        `item`.`barang`, \
        `master_unit`.`unit` \
    FROM \
        `item` \
        INNER JOIN `master_unit` ON `master_unit`.`id` = `item`.`unit_id`",
    (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}
  
// Get Single Item
export const getItemById = (id, result) => {
    db.query(
    "SELECT \
        `item`.`id`, \
        `item`.`nama_item`, \
        `item`.`unit_id`, \
        `item`.`stok`, \
        `item`.`harga_satuan`, \
        `item`.`barang`, \
        `master_unit`.`unit` \
    FROM `item` \
    INNER JOIN `master_unit` ON `master_unit`.`id` = `item`.`unit_id` \
    WHERE (`item`.`id` = ?)", 
    [id], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });   
}
  
// Insert Item to Database
export const insertItem = (data, result) => {
    db.query(
    "INSERT INTO `item` (`nama_item`, `unit_id`, `stok`, `harga_satuan`, `barang`) \
     VALUES (?,?,?,?,?);", 
    [data.nama_item, data.unit_id, data.stok, data.harga_satuan, data.barang_url], 
    (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}
  
// Update Item to Database
export const updateItemById = (data, id, result) => {
    db.query(
    "UPDATE `item` \
    SET `harga_satuan` = ?, `nama_item` = ?, `unit_id` = ?, `stok` = ?, `barang` = ? \
    WHERE (`item`.`id` = ?)", 
    [data.harga_satuan, data.nama_item, data.unit_id, data.stok, data.barang_url, id], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}
  
// Delete Item to Database
export const deleteItemById = (id, result) => {
    db.query("DELETE FROM item WHERE id = ?", [id], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}