"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hardhat_1 = require("hardhat");
async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');
    const signers = await hardhat_1.ethers.getSigners();
    // Fund amount
    const fundAmount = 100;
    // Returns the Token.sol contract factory
    const Token = await hardhat_1.ethers.getContractFactory("Token", signers[0]);
    // Deploys Token.sol as an upgradeable contract
    const token = (await hardhat_1.upgrades.deployProxy(Token, [
        "Test Token",
        "TT",
    ]));
    await token.deployed();
    // Logs the Token.sol contract address
    console.log(`Token deployed to: ${token.address}`);
    // Sets the fund amount
    await token.setFundAmount(fundAmount);
    // Logs the fund amount
    console.log(`Fund amount set to: ${(await token.fundAmount()).toNumber()}`);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
