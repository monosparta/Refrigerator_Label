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


# install mysql
echo -e "${YELLOW}Install Mysql${CLEAR}"
export DEBIAN_FRONTEND="noninteractive"
sudo debconf-set-selections <<< "mysql-server mysql-server/root_password password root"
sudo debconf-set-selections <<< "mysql-server mysql-server/root_password_again password root"
sudo apt-get install -y mysql-server
# sudo mysql_secure_installation

# install project
echo -e "${YELLOW}Install Project End${CLEAR}"
npm --prefix ./refrigerator_label_back/ install

echo -e "${YELLOW}Install Project Front${CLEAR}"
npm --prefix ./refrigerator_label_front/ install

#.env
echo -e "${YELLOW}End .env Create${CLEAR}"
cd refrigerator_label_back
cat <<\EOF >.env
PORT=''
APP_HOST=''
WEB_URL=''

CORN_SCHEDULE='0 0 8 * * *'
NODEMAILER_USER=''
NODEMAILER_PASSWORD=''

SUPER_USER_USERNAME=''
SUPER_USER_PASSWORD=''
SUPER_USER_MAIL=''

JWT_SECRET=''

DB_USERNAME=''
DB_PASSWORD=''
DB_DATABASE=''
DB_HOST=''
DB_PORT=''
DB_DIALECT=''
EOF
# sequelize
echo -e "${YELLOW}Sequelize set${CLEAR}"
npx sequelize db:migrate
npx sequelize db:seed:all
cd ..

echo -e "${YELLOW}Front .env Create${CLEAR}"
cd refrigerator_label_front
cat <<\EOF >.env
REACT_APP_BACK_END=''
EOF
cd ..
# start project
echo -e "${YELLOW}Start Project${CLEAR}"
npm --prefix ./refrigerator_label_back/ run start & npm --prefix ./refrigerator_label_front/ run start


