// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers, upgrades } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { TTBank } from "../typechain";
import * as rinkebyAddress from "../addresses/4.json";
import * as goerliAddress from "../addresses/5.json";
import * as localAddress from "../addresses/31337.json";
import { recordAddress } from "../utils/recordAddresses";

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

    case 5:
      tokenAddress = goerliAddress.token;
      break;
  }

  const TTBank = await ethers.getContractFactory("TTBank", signers[0]);

  const ttBank = (await upgrades.deployProxy(TTBank, [tokenAddress])) as TTBank;

  await ttBank.deployed();

  // Logs the Token.sol contract address
  console.log(`TTBank proxy deployed to: ${ttBank.address}`);

  recordAddress(chainId, "ttBank", ttBank.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
