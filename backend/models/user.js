const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:(true,"Name is required")
    },
    email:{
        type:String,
        required:(true,"email is required"),
        unique: true,
    },
    password:{
        type:String,
        required:(true,"password is required")
    },
    verified: {
        type: Boolean,
        required: true,
        default: false,
      },
})
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      const newpass = await bcrypt.hash(this.password, 8);
      this.password = newpass;
    }
    next();
  });
  
  userSchema.methods.comparePassword = async function (password) {
    const result = await bcrypt.compareSync(password, this.password);
    return result;
  };

module.exports = mongoose.model("User", userSchema);