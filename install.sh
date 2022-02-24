# packages
sudo add-apt-repository -y ppa:git-core/ppa
sudo apt update -y
sudo apt upgrade -y
sudo apt install -y psmisc lsof tree build-essential gcc g++ make jq curl git unzip dnsutils lcov tilde
sudo apt autoremove -y

# deno
curl -fsSL https://deno.land/x/install/install.sh | sh -s v1.14.0

# mysql
sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password password p455w0rd'
sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password p455w0rd'
sudo apt -y install mysql-server mysql-client
FILENAME="/etc/mysql/mysql.conf.d/mysqld.cnf"
SEARCH="127.0.0.1"
REPLACE="0.0.0.0"
sudo sed -i "s/$SEARCH/$REPLACE/gi" $FILENAME

# path
echo "PS1='$ '" >> ~/.profile
echo "PATH='$PATH:$HOME/.deno/bin'" >> ~/.profile