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

  const oneEth = ethers.utils.formatUnits(
    BigNumber.from("1000000000000000000")
  );

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

  it("Should revert if the account type is invalid", async () => {
    await token.approve(ttBank.address, 100);
    await expect(
      ttBank.openAccount(ethers.utils.formatBytes32String("Investing"), 100)
    ).to.be.revertedWith("TTBank: Invalid account type");
  });

  it("Should revert if the deposit amount is zero", async () => {
    await token.approve(ttBank.address, 100);

    await expect(
      ttBank.openAccount(ethers.utils.formatBytes32String("Checking"), 0)
    ).to.be.revertedWith("TTBank: Deposit amount is 0");
  });

  it("Should revert if the deposit amount exceeds the callers balance", async () => {
    // Signers[0] approves TTBank for 200 TT
    await token.approve(ttBank.address, BigInt(200e18));

    // Reverts the function due to an insufficient balance
    await expect(
      ttBank.openAccount(
        ethers.utils.formatBytes32String("Checking"),
        BigInt(101e18)
      )
    ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
  });

  it("Should revert if the deposit amount exceeds the allowance", async () => {
    await expect(
      ttBank.openAccount(ethers.utils.formatBytes32String("Checking"), 100)
    ).to.be.revertedWith("ERC20: insufficient allowance");
  });

  it("Should open a checking account", async () => {
    await token.approve(ttBank.address, BigInt(100e18));

    await ttBank.openAccount(
      ethers.utils.formatBytes32String("Checking"),
      BigInt(10e18)
    );

    const onChainChecking = await ttBank.viewCheckingByIndex(0);

    expect(onChainChecking.accountNumber).to.equal(1);
    expect(onChainChecking.accountName).to.equal(signers[0].address);
    expect(
      ethers.utils.parseBytes32String(onChainChecking.accountType)
    ).to.be.equal("Checking");
    expect(onChainChecking.balance).to.equal(BigInt(10e18));
  });

  // it("Should be able to open a checking account", async () => {
  //   await ttBank.openAccount(ethers.utils.formatBytes32String("Checking"), 100);

  //   const onChainCheckingAcct = await ttBank.viewAccount(0);

  // expect(onChainCheckingAcct.accountNumber).to.equal(1);
  // });
});
