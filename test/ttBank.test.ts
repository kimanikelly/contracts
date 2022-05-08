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
    it("Should revert if the deposit amount is zero", async () => {
      await token.approve(ttBank.address, 100);

      await expect(ttBank.openAccount(0)).to.be.revertedWith(
        "TTBank: Deposit amount is 0"
      );
    });

    it("Should revert if the deposit amount exceeds the callers balance", async () => {
      // Signers[0] approves TTBank for 200 TT
      await token.approve(ttBank.address, BigInt(200e18));

      // Reverts the function due to an insufficient balance
      await expect(ttBank.openAccount(BigInt(101e18))).to.be.revertedWith(
        "ERC20: transfer amount exceeds balance"
      );
    });

    it("Should revert if the deposit amount exceeds the allowance", async () => {
      await expect(ttBank.openAccount(100)).to.be.revertedWith(
        "ERC20: insufficient allowance"
      );
    });

    it("Should open an account", async () => {
      await token.approve(ttBank.address, BigInt(100e18));

      await ttBank.openAccount(BigInt(10e18));

      const onChainChecking = await ttBank.viewAccount();

      expect(onChainChecking.accountNumber).to.equal(1);
      expect(onChainChecking.accountName).to.equal(signers[0].address);
      expect(onChainChecking.balance).to.equal(BigInt(10e18));
    });

    it("Should revert if the deposit amount exceeds the callers balance", async () => {
      await token.approve(ttBank.address, BigInt(200e18));

      await ttBank.openAccount(BigInt(10e18));

      await expect(ttBank.deposit(BigInt(101e18))).to.be.revertedWith(
        "ERC20: transfer amount exceeds balance"
      );
    });

    it.only("Should deposit into an account", async () => {
      await token.approve(ttBank.address, BigInt(100e18));

      await ttBank.openAccount(BigInt(10e18));

      const onChainAcct = await ttBank.viewAccount();

      expect(onChainAcct.accountNumber).to.equal(1);
      expect(onChainAcct.accountName).to.equal(signers[0].address);
      expect(onChainAcct.balance).to.equal(BigInt(10e18));

      await ttBank.deposit(BigInt(20e18));

      const x = await ttBank.viewAccount();

      console.log(x);
    });
  });
});
