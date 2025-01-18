const axios = require('axios');

async function fetchCryptoData() {
  const response = await axios.get('https://min-api.cryptocompare.com/data/v2/histoday?fsym=ETH&tsym=EUR&limit=1000&toTs=1736942400');
  return response.data;
}

async function getTransactions() {
  const url = 'https://api.etherscan.io/v2/api?chainid=1&module=account&action=txlist&address=0xbb3afde35eb9f5feb5377485a3bd18a3eb0fe248&startblock=0&endblock=99999999&page=1&offset=10000&sort=asc&apikey=C7JYVESN2C3ZFAFGEP3UDKDH66BVDGFF1K';
  const response = await axios.get(url);
  return response.data;
}

module.exports = { fetchCryptoData, getTransactions };
