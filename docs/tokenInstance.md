# Token.sol Instance With @kimanikelly/core-contracts

```
require("dotenv").config();

const { Token__factory } = require("@kimanikelly/core-contracts");

const rinkebyAddress = require("@kimanikelly/core-contracts/dist/addresses/4.json");

const ethers = require("ethers");

const rinkebyUrl = `https://rinkeby.infura.io/v3/${process.env.PROJECT_ID}`;

const provider = new ethers.providers.JsonRpcProvider(rinkebyUrl, 4);

const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const token = Token__factory.connect(rinkebyAddress, signer);
```
