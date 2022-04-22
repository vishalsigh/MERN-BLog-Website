const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.ATLAS_URI);
}


app.use(cors({origin:['http://localhost:3000'], credentials: true}));
app.use(express.json());
app.use(cookieParser());

app.use(require('./routes/auth'));
app.use(require('./routes/posts'));


app.listen((5000), () => {
    console.log('Server is running on port 5000');
})