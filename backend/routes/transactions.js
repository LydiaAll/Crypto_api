const express = require('express');
const { getTransactions } = require('../../client/api');
const { getAvgFromHistory } = require('../db');
const router = express.Router();

router.get('/get_data', async (req, res) => {
  try {
    const transactions = await getTransactions();
    const chartData = [];
    const dailyBalances = {};
    let currentBalance = 0;

    for (let tx of transactions.result) {
      const timestamp = parseInt(tx.timeStamp, 10);
      const date = new Date(timestamp * 1000).toISOString().split('T')[0];
      const ethValue = parseFloat(tx.value) / 1e18;
      let change = 0;

      if (tx.from.toLowerCase() === '0xbb3afde35eb9f5feb5377485a3bd18a3eb0fe248') {
        const gasPrice = parseInt(tx.gasPrice, 10);
        const gasUsed = parseInt(tx.gasUsed, 10);
        const gasCostEthValue = (gasPrice * gasUsed) / 1e18;
        change = -(ethValue + gasCostEthValue);
      } else if (tx.to.toLowerCase() === '0xbb3afde35eb9f5feb5377485a3bd18a3eb0fe248') {
        change = ethValue;
      }

      currentBalance += change;
      dailyBalances[date] = currentBalance;

      const avg = await getAvgFromHistory(date);
      const valueEUR = currentBalance * avg;

      chartData.push({
        date: date,
        value: valueEUR
      });
    }

    res.json(chartData);
  } catch (error) {
    res.status(500).send(`Erreur lors de la récupération des transactions: ${error.message}`);
  }
});

module.exports = router;
