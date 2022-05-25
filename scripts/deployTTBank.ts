// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers, upgrades } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { TTBank } from "../typechain";
import * as rinkebyAddress from "../addresses/4.json";
import * as localAddress from "../addresses/31337.json";

import fs from "fs";

async function main() {
  let tokenAddress = "";
  const chainId = await (await ethers.provider.getNetwork()).chainId;

  const signers: SignerWithAddress[] = await ethers.getSigners();

  switch (chainId) {
    case 31337:
      tokenAddress = localAddress.token;
      break;

    case 4:
      tokenAddress = rinkebyAddress.token;
      break;
  }

  const TTBank = await ethers.getContractFactory("TTBank", signers[0]);

  const ttBank = (await upgrades.deployProxy(TTBank, [tokenAddress])) as TTBank;

  await ttBank.deployed();

  // Logs the Token.sol contract address
  console.log(`TTBank proxy deployed to: ${ttBank.address}`);

  console.log(localAddress);
  // Defines the JSON object as a string
  //   const jsonData = '"ttBank": "" ';

  //   // Parsed the JSON string into an object
  //   const jsonObj = JSON.parse(jsonData);

  //   // Assigns the value of token property to the token address
  //   jsonObj["ttBank"] = ttBank.address;

  //   // Stringify the object
  //   const jsonContent = JSON.stringify(jsonObj);

  //   fs.writeFile(`./addresses/${chainId}.json`, jsonContent, "utf8", (err) => {
  //     if (err) {
  //       console.log("An error occured while writing JSON Object to File.");
  //       return console.log(err);
  //     }
  //   });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
