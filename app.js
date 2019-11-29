const mongoose = require('mongoose');
// const users = require('./routes/users');
const express = require('express');
const app = express();
const router = require('./routes/users');
const bodyParser = require('body-parser');
const customInterceptor = require('./helpers/responseFormat')

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json());
app.use(customInterceptor.responseFormat)

mongoose.connect('mongodb+srv://testDB:fahad123@cluster0-v1xjs.mongodb.net/test?retryWrites=true&w=majority', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

app.use(router);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));