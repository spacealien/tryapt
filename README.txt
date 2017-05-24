Nødvendige steg for å installere applikasjonen på linux miljø:

For produksjon:

curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y build-essential
git clone ...
npm run install
npm build
npm run start










For utvikling:

curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y build-essential
git clone ...
npm run install
npm build
npm run dev-start








