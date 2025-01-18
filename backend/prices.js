const express = require('express');
const axios = require('axios');
const logger = require('../client/logger'); // Assurez-vous que logger est bien configuré
const router = express.Router();

// Route pour récupérer les prix
router.get('/prices', async (req, res) => {
  const { fsym, tsyms } = req.query; // Récupérer les paramètres depuis la requête
  
  try {
    // Requête vers CryptoCompare API
    const response = await axios.get('https://min-api.cryptocompare.com/data/pricemulti', {
      params: {
        fsyms: fsym, // Crypto-monnaie source
        tsyms: tsyms, // Devises cibles
        apiKey: process.env.CRYPTOCOMPARE_API_KEY, // Clé API depuis les variables d'environnement
      },
    });

    // Envoyer les données obtenues comme réponse
    res.json(response.data);
  } catch (error) {
    // Logger l'erreur et renvoyer une réponse générique
    logger.error(`Erreur CryptoCompare : ${error.message}`);
    res.status(500).json({ message: 'Erreur de récupération des prix' });
  }
});

module.exports = router;
