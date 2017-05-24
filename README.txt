Nødvendige steg for å installere applikasjonen på linux miljø:

For produksjon:

curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y build-essential

cd  /prosjek_mappe
npm install
npm build

Utivkling: 
For å få prosjektet til å kjøre i utviklingsmiljø brukes kommandoen
npm run dev-start.

Produksjon:
For å få prosjektet til å kjøre for produksjon må linjen ved start i package.json endres slik som illustrert under:
Man må sørge for å at port 433 og 80 er åpne.

"scripts": {
    "dev-start": "nodemon ./server/server.js --exec babel-node --presets es2015",
    "start": "NODE_ENV=production HTTPS_PORT=443 HTTP_PORT=80 babel-node ./server/server.js --presets es2015",
    "build": "webpack --config ./webpack.config.js --progress --colors"
  },     

Oppkobling mot database gjøres i config.js filen. 




En guide for hvordan sette opp cronjob og wget for å importere data:
crontab -e
legg til linjen under i filen.
* * * * * wget https://www.try.no/api/persons -o /path/til/prosjektet

for mer informasjon om cron: https://www.drupal.org/docs/7/setting-up-cron-for-drupal/configuring-cron-jobs-using-the-cron-command


















