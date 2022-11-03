const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000;

// Middleware 
app.use(cors());
app.use(express.json());

// Environment Variable 
require('dotenv').config();


app.get('/', (req, res) =>{
    res.send("Hello")
})

app.listen(port, () => {
    console.log(`Server is Running On ${port}`)
})