const {
    getAllItems,
    getItemByItemId,
    addItem,
    modifyItem,
    removeItemByItemId
} = require('../services/item-service');

const getItemsRoute = (app) => {
    app.get('/items', (req, res) => {
        res.send(getAllItems());
    });
};

const addItemsRoute = (app) => {
    app.post('/items', (req, res) => {
        const item = req.body;

        addItem(item);

        res.status(201).send(item);
    });
};

const modifyItemRoute = (app) => {
    app.put('/items/:itemId', (req, res) => {
        modifyItem(req.body);
        res.send('');
    });
};

const deleteItemRoute = (app) => {
    app.delete('/items/:itemId', (req, res) => {
        removeItemByItemId(req.params.itemId);
        res.send('');
    });
};

const getItemByItemIdRoute = (app) => {
    app.get('/items/:itemId', (req, res) => {
        const item = getItemByItemId(req.params.itemId);

        if (!item) {
            res.sendStatus(404);
        }

        res.send(item);
    });
};

const initItemControllers = (app) => {
    getItemsRoute(app);
    getItemByItemIdRoute(app);
    addItemsRoute(app);
    modifyItemRoute(app);
    deleteItemRoute(app);
};

module.exports = {
    initItemControllers
};
