// import express
import express from "express";

// multer
import multer from "multer";
import path from "path";
  
// import function from controller
import { showItems, showItemById, createItem, updateItem, deleteItem } from "../controllers/item.js";
import { showCustomers, showCustomerById, createCustomer, updateCustomer, deleteCustomer } from "../controllers/customer.js";
import { showSales, showSaleById, createSale } from "../controllers/sales.js";
import { showUnits } from "../controllers/unit.js";
import { showTipeDiskon } from "../controllers/tipeDiskon.js";
  

// Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
 
var upload = multer({
    storage: storage
});

// init express router
const router = express.Router();

// Items
router.get('/items', showItems);
router.get('/items/:id', showItemById);
router.post('/items', upload.single('barang'), createItem);
router.put('/items/:id', upload.single('barang'), updateItem);
router.delete('/items/:id', deleteItem);

// Units
router.get('/units', showUnits);

// Customers
router.get('/customers', showCustomers);
router.get('/customers/:id', showCustomerById);
router.post('/customers', upload.single('ktp'), createCustomer);
router.put('/customers/:id', upload.single('ktp'), updateCustomer);
router.delete('/customers/:id', deleteCustomer);

//TipeDiskon
router.get('/tipediskon', showTipeDiskon);

// Sales
router.get('/sales', showSales);
router.get('/sales/:id', showSaleById);
router.post('/sales', createSale);
  
// export default router
export default router;