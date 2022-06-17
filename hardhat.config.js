require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

// Go to https://infura.io/ and create a new project
// Replace this with your Infura project ID
const INFURA_PROJECT_ID = "95a0db513fbf41b7804dfb178b2d4e78";

// Replace this private key with your Ropsten account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Be aware of NEVER putting real Ether into testing accounts
const ROPSTEN_PRIVATE_KEY = "74bb9fd141f21c862690a77e11d55cf6528d569d33c686fb8c44ec4887de65d3";

module.exports = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: `https://ropsten.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [`0x${ROPSTEN_PRIVATE_KEY}`]
    }
  }
};