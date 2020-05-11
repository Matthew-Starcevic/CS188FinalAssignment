const {
    getAllCustomers,
    getCustomerByCustomerId,
    addCustomer,
    modifyCustomer,
    removeCustomerByCustomerId
} = require('../services/customer-service');
const {getCartsByCustomerId} = require('../services/cart-service');

const getCustomersCartsRoute = (app) => {
    app.get('/customers/:customerId/carts', (req, res) => {
        const customerId = req.params.customerId;
        const customer = getCustomerByCustomerId(customerId);

        if (!customer) {
            res.sendStatus(404);
        }

        res.send(getCartsByCustomerId(customerId));
    });
};

const getCustomersRoute = (app) => {
    app.get('/customers', (req, res) => {
        res.send(getAllCustomers());
    });
};

const addCustomersRoute = (app) => {
    app.post('/customers', (req, res) => {
        const customer = req.body;

        addCustomer(customer);

        res.status(201).send(customer);
    });
};

const modifyCustomerRoute = (app) => {
    app.put('/customers/:customerId', (req, res) => {
        modifyCustomer(req.body);
        res.send('');
    });
};

const deleteCustomerRoute = (app) => {
    app.delete('/customers/:customerId', (req, res) => {
        removeCustomerByCustomerId(req.params.customerId);
        res.send('');
    });
};

const getCustomerByCustomerIdRoute = (app) => {
    app.get('/customers/:customerId', (req, res) => {
        const customer = getCustomerByCustomerId(req.params.customerId);

        if (!customer) {
            res.sendStatus(404);
        }

        res.send(customer);
    });
};

const initCustomerControllers = (app) => {
    getCustomersRoute(app);
    getCustomerByCustomerIdRoute(app);
    getCustomersCartsRoute(app);
    addCustomersRoute(app);
    modifyCustomerRoute(app);
    deleteCustomerRoute(app);
};

module.exports = {
    initCustomerControllers
};
