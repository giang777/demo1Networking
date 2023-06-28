const db = require('./data.model')

const Products = new db.mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        desc: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        id_cat: {
            type: db.mongoose.Schema.Types.ObjectId, ref: 'catModel'
        }
    },
    {
        collection: "products"
    }
);

const Cats = new db.mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
    },
    {
        collection: "cats"
    }
);

let productModel = db.mongoose.model('productModel', Products);
let catModel = db.mongoose.model('catModel', Cats);

module.exports = { productModel, catModel }