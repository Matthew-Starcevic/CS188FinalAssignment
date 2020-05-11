const {
    getAllCartItems,
    getCartItemByCartItemId,
    addCartItem,
    modifyCartItem,
    removeCartItemByCartItemId,
    getCartItemsByCartId
} = require('../services/cart-item-service');
const {getCartByCartId} = require('../services/cart-service');

const getCartItemsRoute = (app) => {
    app.get('/cart-items', (req, res) => {
        res.send(getAllCartItems());
    });
};

const addCartItemsRoute = (app) => {
    app.post('/cart-items', (req, res) => {
        const item = req.body;

        addCartItem(item);

        res.status(201).send(item);
    });
};

const modifyCartItemRoute = (app) => {
    app.put('/cart-items/:cartItemId', (req, res) => {
        modifyCartItem(req.body);
        res.send('');
    });
};

const deleteCartItemRoute = (app) => {
    app.delete('/cart-items/:cartItemId', (req, res) => {
        removeCartItemByCartItemId(req.params.cartItemId);
        res.send('');
    });
};

const getCartItemByCartItemIdRoute = (app) => {
    app.get('/cart-items/:cartItemId', (req, res) => {
        const item = getCartItemByCartItemId(req.params.cartItemId);

        if (!item) {
            res.sendStatus(404);
        }

        res.send(item);
    });
};

const getCartItemsByCartIdRoute = (app) => {
    app.get('/carts/:cartId/cart-items', (req, res) => {
        const cart = getCartByCartId(req.params.cartId);

        if (!cart) {
            res.sendStatus(404);
        }

        res.send(getCartItemsByCartId(req.params.cartId));
    });
};

const initCartItemControllers = (app) => {
    getCartItemsRoute(app);
    getCartItemByCartItemIdRoute(app);
    addCartItemsRoute(app);
    modifyCartItemRoute(app);
    deleteCartItemRoute(app);
    getCartItemsByCartIdRoute(app);
};

module.exports = {
    initCartItemControllers
};
