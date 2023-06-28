const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/demoProducts').catch((err) => {
   
    console.log("Kết nối thất bại");
});

module.exports = { mongoose };