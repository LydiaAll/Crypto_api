const winston = require('winston');

const logger = winston.createLogger({
  level: 'info', // Niveau minimum de logs à enregistrer
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(), // Logs affichés dans la console
    new winston.transports.File({ filename: 'logs/app.log' }) // Logs enregistrés dans un fichier
  ],
});

module.exports = logger;
