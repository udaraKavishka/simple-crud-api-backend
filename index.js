const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Product = require('./models/product.model');
const productRoute= require('./routes/product.route');
const auth= require('./routes/auth.routes.js');


app.use(express.json());    
app.use(express.urlencoded({extended: false}));

app.use("/api/auth",auth);
//routes
app.use('/api/products', productRoute);


app.get('/' , (req , res) => {
    res.send("HEllO From node API updated");
});


mongoose.connect("mongodb+srv://admin:Ev46DgBqHCkceOZh@backenddb.t1cvqhg.mongodb.net/NodeAPI?retryWrites=true&w=majority")
.then(() => {
    console.log('DB Connected');
    app.listen(3000 , () => {
        console.log('Server is running on port 3000');
    })
})
.catch((err) => {

    console.log('DB Connection Failed',err.name);
});

