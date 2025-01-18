const express = require('express');
const router = express.Router();

router.get('/blockNumber', (req, res) => {
    res.json({ message: "Cette route fonctionne correctement !" });
});

module.exports = router;
