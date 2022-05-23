# !/bin/bash

# Text Color Variables
GREEN='\033[32m'  # Green
YELLOW='\033[33m' # YELLOW
CLEAR='\033[0m'   # Clear color and formatting


echo -e "${GREEN}Start Install Label Management System...${CLEAR}"

sudo apt-get -y update
sudo apt-get install -y curl

# install node.js
echo -e "${YELLOW}Install Node.js${CLEAR}"
curl -sL https://deb.nodesource.com/setup_17.x | sudo -E bash -
sudo apt install -y nodejs
node -v

# install npm
echo -e "${YELLOW}Install Npm${CLEAR}"
sudo apt-get install -y npm
npm -v

# install pm2
echo -e "${YELLOW}Install Pm2${CLEAR}"
sudo npm install --global pm2
pm2 update
pm2 -v

# install mysql
echo -e "${YELLOW}Install Mysql${CLEAR}"
export DEBIAN_FRONTEND="noninteractive"
sudo debconf-set-selections <<< "mysql-server mysql-server/root_password password root"
sudo debconf-set-selections <<< "mysql-server mysql-server/root_password_again password root"
sudo apt-get install -y mysql-server

mysql -uroot -proot -e 'CREATE DATABASE IF NOT EXISTS db DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;'
mysql -uroot -proot -e 'GRANT ALL PRIVILEGES ON root.* TO 'root'@'localhost' IDENTIFIED BY 'root';'
mysql -uroot -proot -e 'FLUSH PRIVILEGES;'

# install project
echo -e "${YELLOW}Install Project End${CLEAR}"
npm --prefix ./refrigerator_label_back/ install

echo -e "${YELLOW}Install Project Front${CLEAR}"
npm --prefix ./refrigerator_label_front/ install

#.env
echo -e "${YELLOW}End .env Create${CLEAR}"
cd refrigerator_label_back
cp .env.example .env
# sequelize
echo -e "${YELLOW}Sequelize set${CLEAR}"
npx sequelize db:migrate
npx sequelize db:seed:all
cd ..

echo -e "${YELLOW}Front .env Create${CLEAR}"
cd refrigerator_label_front
cp .env.example .env
cd ..

# start project
echo -e "${YELLOW}Start Project${CLEAR}"
pm2 start npm --name 'Back' -- start --watch --ignore-watch='node_modules' --prefix ./refrigerator_label_back/ 
pm2 start npm --name 'Front' -- start --watch --ignore-watch='node_modules' --prefix ./refrigerator_label_front/



