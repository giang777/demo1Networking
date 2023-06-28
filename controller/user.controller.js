const model = require('../model/user.model')
const bcrypt = require('bcrypt');

const listUser = async (req, res, next) => {
    try {
        //lọc theo username
        if (req.query.username) {
            let data = await model.UserModel.findOne({ username: req.query.username })//lấy danh sách sản phẩm
            return res.status(200).json({
                data: data,
                msg: "Thành công",
                query_username: req.query.username,
                success: true,
            })
        }
        //lọc theo email
        if (req.query.email) {
            let list = await model.UserModel.find({ email: req.query.email });
            return res.status(200).json({
                data: [...list],
                msg: "Thành công",
                query_email: req.query.email,
                success: true,
            })
        }
        //lọc theo vai trò
        if (req.query.id_role) {
            let list = await model.UserModel.find({ id_role: req.query.id_role }).populate("id_role", "");
            return res.status(200).json({
                data: [...list],
                msg: "Thành công",
                query_idRole: req.query.id_role,
                success: true,
            })
        }

        //api phân trang
        if (req.query.limit && req.query.page) {
            //api phân trang http://localhost:3000/users/list?limit=1&page=2
            console.log(req.query.page);
            console.log("Limit");
            let skip = (req.query.page - 1) * req.query.limit;//số trang bỏ qua

            let total = await model.UserModel.countDocuments();//tổng số bản ghi
            let data = await model.UserModel.find().skip(skip).limit(req.query.limit);//data lấy được

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

        let list = await model.UserModel.find();
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




const addUser = async (req, res, next) => {
    try {
        let userCheck = await model.UserModel.findOne({ username: req.body.username })

        if (userCheck) {
            return res.status(203).json({
                msg: "Tài khoản đã tồn tại",
                success: false,
            })
        }

        let hash = await bcrypt.hash(req.body.passwrd, 10);//mã hóa passwrd
        console.log(hash);

        let user = new model.UserModel({
            username: req.body.username,
            email: req.body.email,
            passwrd: hash,
            id_role: req.body.id_role,
        })
        await user.save();
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

const deleteUser = async (req, res, next) => {
    try {
        let result = await model.UserModel.deleteOne({ _id: req.params.id });//lấy sản phẩm theo id
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

const updateUser = async (req, res, next) => {
    try {
        let userCheck = await model.UserModel.findOne({ username: req.body.username })

        if (userCheck) {
            return res.status(203).json({
                msg: "Tài khoản đã tồn tại",
                success: false,
            })
        }

        let hash = await bcrypt.hash(req.body.passwrd, 10);//mã hóa passwrd
        let product = new model.UserModel({ _id: req.params.id });
        let result = await product.updateOne({
            username: req.body.username,
            email: req.body.email,
            passwrd: hash,
            id_role: req.body.id_role,
        });
        console.log(result);
        if (result.matchedCount) {
            let data = await model.UserModel.findById({ _id: req.params.id });
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



const listRole = async (req, res, next) => {
    try {

        if (req.query.limit && req.query.page) {
            //api phân trang http://localhost:3000/products/listCats?limit=&page=
            console.log(req.query.page);
            console.log("Limit");
            let skip = (req.query.page - 1) * req.query.limit;//số trang bỏ qua

            let total = await model.RoleModel.countDocuments();//tổng số bản ghi
            let data = await model.RoleModel.find().skip(skip).limit(req.query.limit);//data lấy được

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
        let list = await model.RoleModel.find();
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

const addRole = async (req, res, next) => {
    try {
        let role = new model.RoleModel({
            name: req.body.name,
            status: req.body.status
        })
        await role.save();
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
        let role = await model.RoleModel.findById({ _id: req.query.id });
        if (role) {
            return res.status(200).json({
                data: role,
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

const deleteRole = async (req, res, next) => {
    try {
        let result = await model.RoleModel.deleteOne({ _id: req.params.id })
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

const updateRole = async (req, res, next) => {
    try {
        let role = new model.RoleModel({
            _id: req.params.id
        })
        let result = await role.updateOne({ name: req.body.name, status: req.body.status });
        if (result.matchedCount) {
            let data = await model.RoleModel.findById({ _id: req.params.id });
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
    listUser,
    addUser, deleteUser,
    updateUser, addRole,
    listRole,
    deleteRole, updateRole
}