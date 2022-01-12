import express from 'express';
const router = express.Router();

router.get('/test', express.json(), (req, res, next) => {
    res.send('test!');
});

router.get('/error', (req, res, next) => {
    throw 'error page.';
});

export default router;
