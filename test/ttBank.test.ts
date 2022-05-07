import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";
import { ethers, upgrades } from "hardhat";
import { BigNumber, ContractTransaction, Event } from "ethers";
import { TTBank, Token } from "../typechain";

describe("TT Bank", () => {
  let ttBank: TTBank;
  let token: Token;
  let signers: SignerWithAddress[];

  beforeEach(async () => {
    signers = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Token", signers[0]);

    token = (await upgrades.deployProxy(Token, ["TEST TOKEN", "TT"])) as Token;

    await token.deployed();

    const TTBank = await ethers.getContractFactory("TTBank", signers[0]);

    ttBank = (await upgrades.deployProxy(TTBank, [token.address])) as TTBank;

    await ttBank.deployed();

    await token.mint(1000000);

    await token.setFundAmount(100);

    await token.fundAccount();
  });

  it.only("Should revert if the account type is invalid", async () => {
    await expect(
      ttBank.openAccount(ethers.utils.formatBytes32String("Investing"), 100)
    ).to.be.revertedWith("TTBank: Invalid account type");
  });

  // it.only("Should be able to open a checking account", async () => {
  //   await ttBank.openAccount(ethers.utils.formatBytes32String("Checking"), 100);

  //   const onChainCheckingAcct = await ttBank.viewAccount(0);

  // expect(onChainCheckingAcct.accountNumber).to.equal(1);
  // });
});
