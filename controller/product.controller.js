const model = require('../model/products.model')

const listProduct = async (req, res, next) => {
    try {
        let list = await model.productModel.find();//lấy danh sách sản phẩm
        res.json({
            data: [...list]
        })
    } catch (error) {
        console.log(error);
        res.send({
            msg: "Thất bại",
            success: false,
        })
    }
}

const idProduct = async (req, res, next) => {
    try {
        let data = await model.productModel.findById({ _id: req.query.id });//lấy sản phẩm theo id
        res.json({
            data: data
        })
    } catch (error) {
        console.log(error);
        res.send({
            msg: "Thất bại",
            success: false,
        })
    }
}

const addProduct = async (req, res, next) => {
    try {
        let product = new model.productModel({
            name: req.body.name,
            price: req.body.price,
            desc: req.body.desc,
            id_cat: req.body.id_cat,
        })
        await product.save();
        res.send({
            msg: "Thành công",
            success: true,
        })
    } catch (error) {
        console.log(error);
        res.send({
            msg: "Thất bại",
            success: false,
        })
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        await model.productModel.deleteOne({ _id: req.params.id });//lấy sản phẩm theo id
        res.send({
            msg: "Thành công",
            success: true,
        })
    } catch (error) {
        console.log(error);
        res.send({
            msg: "Thất bại",
            success: false,
        })
    }
}

const updateProduct = async (req, res, next) => {
    try {
        let product = new model.productModel({ _id: req.params.id });
        await product.updateOne({
            name: req.body.name,
            price: req.body.price,
            desc: req.body.desc,
            id_cat: req.body.id_cat,
        });
        res.send({
            msg: "Thành công",
            success: true,
        })
    } catch (error) {
        console.log(error);
        res.send({
            msg: "Thất bại",
            success: false,
        })
    }
}



const listCats = async (req, res, next) => {
    try {
        let list = await model.catModel.find();
        res.json({
            data: [...list]
        })
    } catch (error) {
        console.log(error);
        res.send({
            msg: "Thất bại",
            success: false,
        })
    }

}

const addCats = async (req, res, next) => {
    try {
        let cats = new model.catModel({
            name: req.body.name,
        })
        await cats.save();
        res.send({
            msg: "Thành công",
            success: true,
        })
    } catch (error) {
        console.log(error);
        res.send({
            msg: "Thất bại",
            success: false,
        })
    }

}

const idCats = async (req, res, next) => {
    try {
        let cats = await model.catModel.findById({ _id: req.query.id });
        res.json({
            data: cats
        })
    } catch (error) {
        console.log(error);
        res.send({
            msg: "Thất bại",
            success: false,
        })
    }

}

const deleteCats = async (req, res, next) => {
    try {
        await model.catModel.deleteOne({ _id: req.params.id })
        res.send({
            msg: "Thành công",
            success: true,
        })
    } catch (error) {
        console.log(error);
        res.send({
            msg: "Thất bại",
            success: false,
        })
    }

}

const updateCats = async (req, res, next) => {
    try {
        let cats = new model.catModel({
            _id: req.params.id
        })
        await cats.updateOne({ name: req.body.name });
        res.send({
            msg: "Thành công",
            success: true,
        })
    } catch (error) {
        console.log(error);
        res.send({
            msg: "Thất bại",
            success: false,
        })
    }

}

module.exports = {
    listProduct, idProduct,
    addProduct, deleteProduct,
    updateProduct, addCats,
    listCats, idCats,
    deleteCats, updateCats
}