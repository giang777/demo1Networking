const model = require('../model/products.model')

const listProduct = async (req, res, next) => {
    try {
        //lọc theo giá
        if (req.query.price) {
            let list = await model.productModel.find({ price: Number(req.query.price) })//lấy danh sách sản phẩm
            return res.status(200).json({
                data: [...list],
                msg: "Thành công",
                query_price: req.query.price,
                success: true,
            })
        }
        //lọc theo tên
        if (req.query.name) {
            let list = await model.productModel.find({ name: req.query.name });
            return res.status(200).json({
                data: [...list],
                msg: "Thành công",
                query_name: req.query.name,
                success: true,
            })
        }
        //lọc theo loại
        if (req.query.id_cat) {
            let list = await model.productModel.find({ id_cat: req.query.id_cat }).populate("id_cat", "name");
            return res.status(200).json({
                data: [...list],
                msg: "Thành công",
                query_idCat: req.query.id_cat,
                success: true,
            })
        }

        //api phân trang
        if (req.query.limit && req.query.page) {
            //api phân trang http://localhost:3000/products/list?limit=&page=
            console.log(req.query.page);
            console.log("Limit");
            let skip = (req.query.page - 1) * req.query.limit;//số trang bỏ qua

            let total = await model.productModel.countDocuments();//tổng số bản ghi
            let data = await model.productModel.find().skip(skip).limit(req.query.limit);//data lấy được

            let totalPage = Math.ceil(total / req.query.limit);//tổng số trang
            if (req.query.page > totalPage) {
                return res.status(203).json({
                    msg: "Thất bại",
                    page: req.query.page,
                    limit: req.query.limit,
                    totalPage: totalPage,
                    totalDoc: total,
                    success: false,
                })
            }

            return res.status(200).json({
                data: [...data],
                msg: "Thành công",
                page: req.query.page,
                limit: req.query.limit,
                totalPage: totalPage,
                totalDoc: total,
                success: true,
            })
        }

        let list = await model.productModel.find();
        return res.status(200).json({
            data: [...list],
            msg: "Thành công",
            query: null,
            success: true,
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Thất bại",
            success: false,
        })
    }
}


const idProduct = async (req, res, next) => {
    try {
        let data = await model.productModel.findById({ _id: req.query.id });//lấy sản phẩm theo id
        return res.status(200).json({
            data: data,
            msg: "Thành công",
            success: true,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
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
            image: req.body.image,
            description: req.body.description,
            id_cat: req.body.id_cat,
        })
        await product.save();
        return res.status(201).json({
            msg: "Thành công",
            success: true,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Thất bại",
            success: false,
        })
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        let result = await model.productModel.deleteOne({ _id: req.params.id });//lấy sản phẩm theo id
        if (result.deletedCount) {
            return res.status(200).json({
                msg: "Thành công",
                success: true,
            })
        }

        return res.status(203).json({
            msg: "Thất bại",
            success: false,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Thất bại",
            success: false,
        })
    }
}

const updateProduct = async (req, res, next) => {
    try {
        let product = new model.productModel({ _id: req.params.id });
        let result = await product.updateOne({
            name: req.body.name,
            price: req.body.price,
            desc: req.body.desc,
            id_cat: req.body.id_cat,
        });
        console.log(result);
        if (result.matchedCount) {
            let data = await model.productModel.findById({ _id: req.params.id });
            return res.status(200).json({
                data: data,
                msg: "Thành công",
                success: true,
            })
        }

        return res.status(203).json({
            msg: "Thất bại",
            success: false,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Thất bại",
            success: false,
        })
    }
}



const listCats = async (req, res, next) => {
    try {

        if (req.query.limit && req.query.page) {
            //api phân trang http://localhost:3000/products/listCats?limit=&page=
            console.log(req.query.page);
            console.log("Limit");
            let skip = (req.query.page - 1) * req.query.limit;//số trang bỏ qua

            let total = await model.catModel.countDocuments();//tổng số bản ghi
            let data = await model.catModel.find().skip(skip).limit(req.query.limit);//data lấy được

            let totalPage = Math.ceil(total / req.query.limit);//tổng số trang
            if (req.query.page > totalPage) {
                return res.status(203).json({
                    msg: "Thất bại",
                    page: req.query.page,
                    limit: req.query.limit,
                    totalPage: totalPage,
                    totalDoc: total,
                    success: false,
                })
            }

            return res.status(200).json({
                data: [...data],
                msg: "Thành công",
                page: req.query.page,
                limit: req.query.limit,
                totalPage: totalPage,
                totalDoc: total,
                success: true,
            })
        }
        let list = await model.catModel.find();
        return res.status(200).json({
            data: [...list],
            msg: "Thành công",
            success: true,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
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
        return res.status(201).json({
            msg: "Thành công",
            success: true,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Thất bại",
            success: false,
        })
    }

}

const idCats = async (req, res, next) => {
    try {
        let cats = await model.catModel.findById({ _id: req.query.id });
        if (cats) {
            return res.status(200).json({
                data: cats,
                msg: "Thành công",
                success: true,
            })
        }
        return res.status(203).json({
            msg: "Thất bại",
            success: false,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Thất bại",
            success: false,
        })
    }

}

const deleteCats = async (req, res, next) => {
    try {
        let result = await model.catModel.deleteOne({ _id: req.params.id })
        if (result.deletedCount) {
            return res.status(200).json({
                msg: "Thành công",
                success: true,
            })
        }

        return res.status(203).json({
            msg: "Thất bại",
            success: false,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
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
        let result = await cats.updateOne({ name: req.body.name });
        if (result.matchedCount) {
            let data = await model.catModel.findById({ _id: req.params.id });
            return res.status(200).json({
                data: data,
                msg: "Thành công",
                success: true,
            })
        }

        return res.status(203).json({
            msg: "Thất bại",
            success: false,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
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