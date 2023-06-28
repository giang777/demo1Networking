const db = require('./data.model');

const Users = new db.mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        passwrd: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        id_role: {
            type: db.mongoose.Schema.Types.ObjectId,
            ref: 'roleModel'
        }
    },
    {
        collection: "users"
    }
)

const Roles = new db.mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            required: true,
            default: false,
        }

    },
    {
        collection: "roles"
    }
)

const UserModel = db.mongoose.model("userModel", Users);
const RoleModel = db.mongoose.model("roleModel", Roles);

module.exports = { UserModel, RoleModel }