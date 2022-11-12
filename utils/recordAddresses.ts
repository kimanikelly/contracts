import fs from "fs";

export const recordAddress = (
  chainId: number,
  contract: string,
  address: string
) => {
  let addressJson: string;
  let addressObj: any;
  let newObjData: any;

  // Checks if the network is Localhost
  if (chainId == 31337) {
    addressJson = fs.readFileSync("addresses/31337.json").toString();

    //
    addressObj = JSON.parse(addressJson);

    // Checks if the contract is "ttBank"
    if (contract == "ttBank") {
      // Assigns the ttBank property the value of the TTBank.sol address
      addressObj.ttBank = address;
    }

    // Checks if the contract is "token"
    if (contract == "token") {
      // Assigns the token property the value of the Token.sol address
      addressObj.token = address;
    }

    addressObj = JSON.stringify(addressObj);

    fs.writeFile("addresses/31337.json", addressObj, (err) => {
      if (err) throw err;

      console.log(`New ${contract} address added on Localhost`);
    });
  }

  // Checks if the network is Rinkeby
  if (chainId == 4) {
    // Reads the JSON file of the Rinkeby addresses
    // Returns the file as a Buffer and parses it to a readable string
    addressJson = fs.readFileSync("addresses/4.json").toString();

    addressObj = JSON.parse(addressJson);

    if (contract == "ttBank") {
      // Assign the ttBank property the value of the ttBank address
      addressObj.ttBank = address;
    }

    if (contract == "token") {
      // Assign the token property the value of the token address
      addressObj.token = address;
    }

    newObjData = JSON.stringify(addressObj);

    fs.writeFile("addresses/4.json", newObjData, (err) => {
      if (err) throw err;

      console.log(`New ${contract} address added on Rinkeby`);
    });
  }

  if (chainId == 5) {
    // Reads the JSON file of the Goerli addresses
    // Returns the file as a Buffer and parses it to a readable string
    addressJson = fs.readFileSync("addresses/5.json").toString();

    addressObj = JSON.parse(addressJson);

    if (contract == "ttBank") {
      // Assign the ttBank property the value of the ttBank address
      addressObj.ttBank = address;
    }

    if (contract == "token") {
      // Assign the token property the value of the token address
      addressObj.token = address;
    }

    newObjData = JSON.stringify(addressObj);

    fs.writeFile("addresses/5.json", newObjData, (err) => {
      if (err) throw err;

      console.log(`New ${contract} address added on Goerli`);
    });
  }
};
