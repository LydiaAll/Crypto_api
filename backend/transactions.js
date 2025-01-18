require('dotenv').config();
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/transactions', async (req, res) => {
    const { address } = req.query;
    if (!address) {
        return res.status(400).json({ message: 'L\'adresse est requise.' });
    }

    try {
        const response = await axios.get('https://api.etherscan.io/api', {
            params: {
                module: 'account',
                action: 'txlist',
                address: address,
                startblock: 0,
                endblock: 99999999,
                sort: 'desc',
                apikey: process.env.ETHERSCAN_API_KEY, // La clé API est chargée ici
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: `Erreur de récupération des transactions : ${error.message}` });
    }
});

module.exports = router;
