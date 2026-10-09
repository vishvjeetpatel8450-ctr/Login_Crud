const mongoos = require("mongoose");

const userschema = new mongoos.Schema({
    name: {
        type:String,
        required:true,
    },
    email: {
        type:String,
        unique:true,
    },
    aadharnumber: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type:String,
        required:true,
    },
    address: {
        type:String,
        required:true,
    },
    password: {
        type:String,
        required:true,
    },
    graduation: {
        type:String,
    },
     isDeleted: {
        type: Boolean,
        default: false
    }
},{
    timestamps:true
});

module.exports = mongoos.model("user",userschema);