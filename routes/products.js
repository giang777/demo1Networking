const express = require("express");
const router = express.Router();

const productCTL = require("../controller/product.controller");

router.get('/list',productCTL.listProduct);
router.get('/id',productCTL.idProduct);
router.post('/add',productCTL.addProduct);
router.delete('/delete/:id',productCTL.deleteProduct)
router.patch('/update/:id',productCTL.updateProduct)

router.get('/listCats',productCTL.listCats);
router.get('/idCats',productCTL.idCats);
router.post('/addCats',productCTL.addCats);
router.delete('/deleteCats/:id',productCTL.deleteCats)
router.patch('/updateCats/:id',productCTL.updateCats)

module.exports = router;
