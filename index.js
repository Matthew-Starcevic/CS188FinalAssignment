const express = require('express');

const app = express();
const port = 5555;

app.use(express.json());

const {initCustomerControllers} = require('./controllers/customer-controller');
const {initCartControllers} = require('./controllers/cart-controller');
const {initItemControllers} = require('./controllers/item-controller');
const {initCartItemControllers} = require('./controllers/cart-item-controller');

const init = () => {
    initCustomerControllers(app);
    initCartControllers(app);
    initItemControllers(app);
    initCartItemControllers(app);

    app.listen(port, () => {
        console.log('Server is running on port', port);
    });
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
