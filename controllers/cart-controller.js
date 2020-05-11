const {
    getAllCarts,
    getCartByCartId,
    addCart,
    modifyCart,
    removeCartByCartId
} = require('../services/cart-service');

const getCartsRoute = (app) => {
    app.get('/carts', (req, res) => {
        res.send(getAllCarts());
    });
};

const getCartByCartIdRoute = (app) => {
    app.get('/carts/:cartId', (req, res) => {
        const cart = getCartByCartId(req.params.cartId);

        if (!cart) {
            res.sendStatus(404);
        }

        res.send(cart);
    });
};

const updateCartRoute = (app) => {
    app.put('/carts/:cartId', (req, res) => {
        const cart = getCartByCartId(req.params.cartId);

        if (!cart) {
            res.sendStatus(404);
        }

        modifyCart(req.body);
        res.send('');
    });
};

const addCartRoute = (app) => {
    app.post('/carts', (req, res) => {
        const cart = req.body;

        addCart(cart);

        res.status(201).send(cart);
    });
};

const deleteCartRoute = (app) => {
    app.delete('/carts/:cartId', (req, res) => {
        const cartId = req.params.cartId;
        const cart = getCartByCartId(cartId);

        if (!cart) {
            res.sendStatus(404);
        }

        removeCartByCartId(cartId);
        res.send('');
    });
};

const initCartControllers = (app) => {
    getCartsRoute(app);
    getCartByCartIdRoute(app);
    addCartRoute(app);
    updateCartRoute(app);
    deleteCartRoute(app);
};

module.exports = {
    initCartControllers
};
