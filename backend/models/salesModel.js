// import connection
import db from "../config/database.js";
  
const promiseQueryGetSingle = function (query, id) {
    return new Promise((resolve, reject) => {
        db.query(query, [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        })
    })
}

const promiseQueryGetAll = function (query) {
    return new Promise((resolve, reject) => {
        db.query(query, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        })
    })
}

// Get All Sales
export const getSales = async (result) => {
    let salesOrder = await promiseQueryGetSingle(
        "SELECT \
            `sales`.`id`, \
            `sales`.`code_transaksi`, \
            `sales`.`tanggal_transaksi`, \
            `sales`.`total_diskon`, \
            `sales`.`total_harga`, \
            `sales`.`total_bayar`, \
            `sales`.`customer_id`, \
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
        INNER JOIN `sales` ON `customer`.`id` = `sales`.`customer_id` \
        INNER JOIN `master_tipe_diskon` ON `master_tipe_diskon`.`id` = `customer`.`tipe_diskon_id`",
    );
    
    var outputData = [];
    for (let i = 0; i < salesOrder.length; i++) {
        let itemsResults = await promiseQueryGetSingle("SELECT \
            `sales_item`.`id`, \
            `sales_item`.`item_id`, \
            `sales_item`.`qty`, \
            `sales_item`.`total_harga_item`, \
            `item`.`nama_item`, \
            `item`.`harga_satuan`, \
            `sales_item`.`sales_id` \
        FROM \
            `sales_item` \
            INNER JOIN `item` ON `item`.`id` = `sales_item`.`item_id` \
        WHERE \
            (`sales_item`.`sales_id` = ?)", salesOrder[i]["id"]);

        let fixedRow = {
            ...salesOrder[i],
            items: itemsResults
        };

        outputData.push(fixedRow);
    }
    
    result(null, outputData);
}
  
// Get Single Sales
export const getSaleById = async (id, result) => {
    let salesOrder = await promiseQueryGetSingle(
        "SELECT \
            `sales`.`id`, \
            `sales`.`code_transaksi`, \
            `sales`.`tanggal_transaksi`, \
            `sales`.`total_diskon`, \
            `sales`.`total_harga`, \
            `sales`.`total_bayar`, \
            `sales`.`customer_id`, \
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
        INNER JOIN `sales` ON `customer`.`id` = `sales`.`customer_id` \
        INNER JOIN `master_tipe_diskon` ON `master_tipe_diskon`.`id` = `customer`.`tipe_diskon_id` \
        WHERE \
            (`sales`.`id` = ?)",
        id
    );
    
    var outputData = [];
    let itemsResults = await promiseQueryGetSingle("SELECT \
        `sales_item`.`id`, \
        `sales_item`.`item_id`, \
        `sales_item`.`qty`, \
        `sales_item`.`total_harga_item`, \
        `item`.`nama_item`, \
        `item`.`harga_satuan`, \
        `sales_item`.`sales_id` \
    FROM \
        `sales_item` \
        INNER JOIN `item` ON `item`.`id` = `sales_item`.`item_id` \
    WHERE \
        (`sales_item`.`sales_id` = ?)", salesOrder[0]["id"]);

    let fixedRow = {
        ...salesOrder[0],
        items: itemsResults
    };

    outputData.push(fixedRow);
    
    
    result(null, outputData);
}
  
// Insert Sales to Database
export const insertSale = (data, result) => {
    console.log(data);
    db.query(
    "INSERT INTO `sales` \
    (`code_transaksi`, `tanggal_transaksi`, `customer_id`, `total_diskon`, `total_harga`, `total_bayar`) \
    VALUES (?,?,?,?,?,?);", 
    [data.code_transaksi, data.tanggal_transaksi, data.customer_id, data.total_diskon, data.total_harga, data.total_bayar], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            var salesId = results.insertId;
            data.items.map(function(field) {
                db.query(
                "INSERT INTO sales_item (item_id, qty, total_harga_item, sales_id) \
                 VALUES (?,?,?,?)", 
                [field.id, field.qty, field.total_harga_item, salesId],
                (err, results) => {             
                    if(err) {
                        console.log(err);
                        result(err, null);
                    }
                });  

                db.query(
                "SELECT item.stok FROM item WHERE (item.id = ?)", 
                [field.id], (err, results) => {             
                    if(err) {
                        console.log(err);
                        result(err, null);
                    } else {
                        var fixQty = results[0]['stok'] - field.qty;
                        db.query(
                        "UPDATE item \
                            SET stok = ? \
                            WHERE (item.id = ?)", 
                        [fixQty, field.id], 
                        (err, results) => {             
                            if(err) {
                                console.log(err);
                                result(err, null);
                            }
                        });  
                    }
                });    
            }); //map

            result(null, {
                message: "success"
            })
        }
    });
}