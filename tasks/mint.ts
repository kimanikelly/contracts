import { task } from "hardhat/config";

import { Token__factory } from "../typechain";

task(
  "mint",
  "Mints a number of Test Tokens to the Token contract. Can only be called by the owner."
)
  .addParam("address", "The address of Token contract")
  .addParam(
    "amount",
    "The amount of Test Tokens the Token contract should mint"
  )
  .setAction(async (taskArgs, { ethers }) => {
    const signer = await ethers.getSigners();

    const token = Token__factory.connect(taskArgs.address, signer[0]);

    const tx = await token.mint(taskArgs.amount);

    let obj = {
      transactionHash: `https://rinkeby.etherscan.io/tx/${tx.hash}`,
      mintAmount: taskArgs.amount,
    };

    if (ethers.provider.network.chainId == 4) {
      console.log(obj);
    } else if (ethers.provider.network.chainId == 31337) {
      obj["transactionHash"] = `Localhost Hash: ${tx.hash}`;
      console.log(obj);
    }
  });
