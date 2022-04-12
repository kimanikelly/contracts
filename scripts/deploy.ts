// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers, upgrades } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Token, Token__factory } from "../typechain";
import fs from "fs";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const chainId = await (await ethers.provider.getNetwork()).chainId;

  const signers: SignerWithAddress[] = await ethers.getSigners();

  // Fund amount
  const fundAmount = 100;

  // Returns the Token.sol contract factory
  const Token: Token__factory = await ethers.getContractFactory(
    "Token",
    signers[0]
  );

  // Deploys Token.sol as an upgradeable contract
  const token = (await upgrades.deployProxy(Token, [
    "Test Token",
    "TT",
  ])) as Token;

  await token.deployed();

  // Logs the Token.sol contract address
  console.log(`Token proxy deployed to: ${token.address}`);

  // Sets the fund amount
  await token.setFundAmount(fundAmount);

  // Defines the JSON object as a string
  const jsonData = '{ "token": "" }';

  // Parsed the JSON string into an object
  const jsonObj = JSON.parse(jsonData);

  // Assigns the value of token property to the token address
  jsonObj["token"] = token.address;

  // Stringify the object
  const jsonContent = JSON.stringify(jsonObj);

  fs.writeFile(`./addresses/${chainId}.json`, jsonContent, "utf8", (err) => {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
