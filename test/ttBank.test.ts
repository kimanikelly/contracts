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

  describe("#openAccount", () => {
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

      const onChainChecking = await ttBank.viewAccountByIndex(
        ethers.utils.formatBytes32String("Checking"),
        0
      );

      expect(onChainChecking.accountNumber).to.equal(1);
      expect(onChainChecking.accountName).to.equal(signers[0].address);
      expect(
        ethers.utils.parseBytes32String(onChainChecking.accountType)
      ).to.be.equal("Checking");
      expect(onChainChecking.balance).to.equal(BigInt(10e18));
    });

    it("Should open a savings account", async () => {
      await token.approve(ttBank.address, BigInt(100e18));

      await ttBank.openAccount(
        ethers.utils.formatBytes32String("Savings"),
        BigInt(10e18)
      );

      const onChainSavings = await ttBank.viewAccountByIndex(
        ethers.utils.formatBytes32String("Savings"),
        0
      );

      expect(onChainSavings.accountNumber).to.equal(1);
      expect(onChainSavings.accountName).to.equal(signers[0].address);
      expect(
        ethers.utils.parseBytes32String(onChainSavings.accountType)
      ).to.be.equal("Savings");
      expect(onChainSavings.balance).to.equal(BigInt(10e18));
    });
  });

  describe.only("#deposit", () => {
    it("Should revert if the account type is invalid", async () => {
      await token.approve(ttBank.address, BigInt(100e18));

      await ttBank.openAccount(
        ethers.utils.formatBytes32String("Checking"),
        BigInt(10e18)
      );

      await expect(
        ttBank.deposit(ethers.utils.formatBytes32String("Investing"), 0, 10)
      ).to.be.revertedWith("TTBank: Invalid account type");
    });

    it("Should revert if the deposit amount exceeds the callers balance", async () => {
      await token.approve(ttBank.address, BigInt(200e18));

      await ttBank.openAccount(
        ethers.utils.formatBytes32String("Checking"),
        BigInt(10e18)
      );

      await expect(
        ttBank.deposit(
          ethers.utils.formatBytes32String("Checking"),
          0,
          BigInt(101e18)
        )
      ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
    });

    it.only("Should deposit into checking account", async () => {
      await token.approve(ttBank.address, BigInt(100e18));

      await ttBank.openAccount(
        ethers.utils.formatBytes32String("Checking"),
        BigInt(10e18)
      );

      const onChainChecking = await ttBank.viewAccountByIndex(
        ethers.utils.formatBytes32String("Checking"),
        0
      );

      expect(onChainChecking.accountNumber).to.equal(1);
      expect(onChainChecking.accountName).to.equal(signers[0].address);
      expect(
        ethers.utils.parseBytes32String(onChainChecking.accountType)
      ).to.be.equal("Checking");
      expect(onChainChecking.balance).to.equal(BigInt(10e18));

      await ttBank.deposit(
        ethers.utils.formatBytes32String("Checking"),
        0,
        BigInt(20e18)
      );

      const x = await ttBank.viewAccountByIndex(
        ethers.utils.formatBytes32String("Checking"),
        0
      );

      console.log(x);
    });
  });
});
