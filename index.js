const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const handleError = require('./src/middlewares/handleError');
const handle404Error = require('./src/middlewares/handle404Error');
const authRoutes = require('./src/routes/auth.routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/auth', authRoutes);

app.use(handle404Error);
app.use(handleError);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});
