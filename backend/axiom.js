const axios = require('axios');
const { ETHERSCAN_API_KEY } = process.env;

app.get('/api/v1/transactions', async (req, res) => {
  const { address } = req.query;
  
  try {
    const response = await axios.get(`https://api.etherscan.io/api`, {
      params: {
        module: 'account',
        action: 'txlist',
        address: address,
        startblock: 0,
        endblock: 99999999,
        page: 1,
        offset: 10,
        sort: 'desc',
        apikey: ETHERSCAN_API_KEY
      }
    });
    res.json(response.data);
  } catch (error) {
    logger.error(`Erreur Etherscan : ${error.message}`);
    res.status(500).json({ message: 'Erreur de récupération des transactions' });
  }
});
