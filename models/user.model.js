const mongoose= require("mongoose");
const userScheme= mongoose.Schema({
    userId:{
        type:String
    },
    fullName:{
        type:String
    },
    email:{
        typr:String
    },
    password:{
        type:String
    },
    phoneNumber:{
        type:String
    }
    }
)

module.exports = mongoose.model("User", userScheme);