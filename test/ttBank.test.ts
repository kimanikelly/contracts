import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";
import { ethers, upgrades } from "hardhat";
import { BigNumber, ContractTransaction, Event } from "ethers";
import { TTBank, Token } from "../typechain";
import { exec } from "child_process";

describe.only("TT Bank", () => {
  let ttBank: TTBank;
  let token: Token;
  let signers: SignerWithAddress[];

  // The amount to open the account
  const initialDeposit = BigInt(10e18);

  beforeEach(async () => {
    // Returns the Hardhat test accounts
    signers = await ethers.getSigners();

    // Returns the Token.sol contract factory
    const Token = await ethers.getContractFactory("Token", signers[0]);

    // Deploys and initializes the Token.sol proxy as an upgradeable contract
    token = (await upgrades.deployProxy(Token, ["TEST TOKEN", "TT"])) as Token;
    await token.deployed();

    // Returns the TTBank.sol contract factory
    const TTBank = await ethers.getContractFactory("TTBank", signers[0]);

    // Deploys and initializes the TTBank.sol proxy as an upgradeable contract
    ttBank = (await upgrades.deployProxy(TTBank, [token.address])) as TTBank;
    await ttBank.deployed();

    // Mints one million TT to Token.sol
    await token.mint(1000000);

    // Sets the fundAmount to 100 TT
    await token.setFundAmount(100);

    // Funds signers[0] 100 TT
    await token.fundAccount();
  });

  describe("#initialize", () => {
    it("Should revert if the contract is already initialized", async () => {
      // Reverts due to an second initialization
      await expect(ttBank.initialize(token.address)).to.be.revertedWith(
        "Initializable: contract is already initialized"
      );
    });

    it("Should emit the OwnershipTransferred emit on deployment", async () => {
      const filter = ttBank.filters.OwnershipTransferred(null, null);

      const queryFilter = (await token.queryFilter(filter))[0];

      expect(queryFilter.event).to.equal("OwnershipTransferred");

      expect(queryFilter.args.previousOwner).to.equal(
        ethers.constants.AddressZero
      );

      expect(queryFilter.args.newOwner).to.equal(signers[0].address);
    });

    it("Should get the owner", async () => {
      const owner: string = await ttBank.owner();
      expect(owner).to.equal(signers[0].address);
    });

    it("Should return the Token address", async () => {
      const tokenAddress = await ttBank.token();
      expect(tokenAddress).to.be.equal(token.address);
    });
  });

  describe("#openAccount", () => {
    it("Should revert if the deposit amount is zero", async () => {
      await token.approve(ttBank.address, BigInt(100e18));

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

    it("Should revert if the account already exists", async () => {
      await token.approve(ttBank.address, BigInt(100e18));

      await ttBank.openAccount(BigInt(10e18));

      await expect(ttBank.openAccount(BigInt(10e18))).to.be.revertedWith(
        "TTBank: Account already exists"
      );
    });

    it("Should open an account", async () => {
      // Approve the bank for 100 TT
      await token.approve(ttBank.address, BigInt(100e18));

      await ttBank.openAccount(BigInt(10e18));

      const filter = ttBank.filters.AccountOpened(null, null, null);
      const queryFilter = (await ttBank.queryFilter(filter))[0];

      const onChainAcct = await ttBank.viewAccount();

      expect(onChainAcct.accountNumber).to.equal(1);
      expect(onChainAcct.accountName).to.equal(signers[0].address);
      expect(onChainAcct.balance).to.equal(BigInt(10e18));

      expect(queryFilter.args.accountNumber).to.equal(
        onChainAcct.accountNumber
      );
      expect(queryFilter.args.accountName).to.equal(onChainAcct.accountName);
      expect(queryFilter.args.startingBalance).to.equal(onChainAcct.balance);
    });
  });

  describe("#viewAccount", () => {
    it("Should return zero values if the account does not exist", async () => {
      const zeroValAcct = await ttBank.viewAccount();

      expect(zeroValAcct.accountNumber).to.equal(0);

      expect(zeroValAcct.accountName).to.equal(ethers.constants.AddressZero);

      expect(zeroValAcct.balance).to.equal(0);
    });
  });

  describe("#viewBalance", () => {
    it("Should return zero values if the account does not exist", async () => {
      const zeroValAcct = await ttBank.viewBalance();

      expect(zeroValAcct).to.equal(0);
    });
  });

  describe("#deposit", () => {
    beforeEach(async () => {
      for (let i = 0; i < 2; i++) {
        await token.connect(signers[1]).fundAccount();
      }
    });

    it("Should revert if the deposit amount exceeds the callers balance", async () => {
      // Approve the bank for 200 TT
      await token.approve(ttBank.address, BigInt(200e18));

      // Opens an account with 10 TT
      await ttBank.openAccount(BigInt(10e18));

      // reverts the function due to an insufficient balance
      await expect(ttBank.deposit(BigInt(101e18))).to.be.revertedWith(
        "ERC20: transfer amount exceeds balance"
      );
    });

    it("Should revert if the deposit amount exceeds the allowance", async () => {
      // Approve the bank for 80 TT
      await token.approve(ttBank.address, BigInt(80e18));

      // Open an account with 10 TT
      await ttBank.openAccount(initialDeposit);

      // Reverts due to insufficient allowance
      await expect(ttBank.deposit(BigInt(71e18))).to.be.revertedWith(
        "ERC20: insufficient allowance"
      );
    });

    it("Should revert if an account does not exist", async () => {
      // Reverts due to the public address not having an open account
      await expect(
        ttBank.connect(signers[1]).deposit(BigInt(initialDeposit))
      ).to.be.revertedWith("TTBank: Account does not exist");
    });

    it("Should deposit into an account", async () => {
      // The amount to deposit after opening an account
      const depositAmt = BigInt(20e18);

      // Return sthr TT balance of the bank
      const bankPreOpen = await ttBank.bankBalance();

      // Approve TTBank for 100 TT
      await token.approve(ttBank.address, BigInt(100e18));

      // Open an account with 10 TT
      await ttBank.openAccount(BigInt(initialDeposit));

      const bankPostOpen = await ttBank.bankBalance();

      // Return the on chain account details
      const onChainAcct = await ttBank.viewAccount();

      // The bank balance should be 0 before opening an initial account
      expect(bankPreOpen).to.equal(0);

      // The bank balance should be the initial deposit after opening the initial account
      expect(bankPostOpen).to.equal(initialDeposit);

      // The first account number should equal 1
      expect(onChainAcct.accountNumber).to.equal(1);

      // The acount name should equal the address
      expect(onChainAcct.accountName).to.equal(signers[0].address);

      // The initial balance should be 10 TT
      expect(onChainAcct.balance).to.equal(initialDeposit);

      const filter = ttBank.filters.Deposit(null, null, null, null);

      // Deposit 20 TT into the account
      await ttBank.deposit(depositAmt);

      const queryFilter = (await ttBank.queryFilter(filter))[0];

      // Returns the bank account details after making a deposit
      const postDeposit = await ttBank.viewAccount();

      // Returns the bank balance after a deposit was made
      const bankPostDeposit = await ttBank.bankBalance();

      // The bank accout balance should now equal the initial deposit and the second deposit
      expect(postDeposit.balance).to.equal(initialDeposit + depositAmt);

      // The bank balance should now equal the initial deposit and second deposit
      expect(bankPostDeposit).to.equal(initialDeposit + depositAmt);

      expect(queryFilter.event).to.equal("Deposit");

      expect(queryFilter.args.accountNumber).to.equal(
        postDeposit.accountNumber
      );

      expect(queryFilter.args.accountName).to.equal(postDeposit.accountName);

      expect(queryFilter.args.depositAmount).to.equal(depositAmt);

      expect(queryFilter.args.newBalance).to.equal(initialDeposit + depositAmt);
    });
  });

  describe("#withdraw", () => {
    beforeEach(async () => {
      // Funds signers[1] with 100 TT
      await token.connect(signers[1]).fundAccount();

      // Signer[0] approves TTBank for 100 TT
      await token.approve(ttBank.address, BigInt(200e18));

      // Signers[1] approves TTBank for 100 TT
      await token.connect(signers[1]).approve(ttBank.address, BigInt(200e18));

      // Signers[0] opens an account with 10 TT
      await ttBank.openAccount(initialDeposit);

      // Signers[1] opens an account with 10 TT
      await ttBank.connect(signers[1]).openAccount(initialDeposit);

      // Signers[0] deposits 90 TT into their account
      await ttBank.deposit(BigInt(90e18));

      // Signers[1] deposits 90 TT into their account
      await ttBank.connect(signers[1]).deposit(BigInt(90e18));
    });

    it("Should revert if the account does not exist", async () => {
      await expect(
        ttBank.connect(signers[2]).withdraw(initialDeposit)
      ).to.be.revertedWith("TTBank: Account does not exist");
    });

    it("Should revert if the amount exceeds the balance", async () => {
      await expect(ttBank.withdraw(BigInt(101e18))).to.be.revertedWith(
        "TTBank: Amount exceeds balance"
      );
    });

    it("Should withdraw from balance", async () => {
      const preBalance = await token.balanceOf(signers[0].address);
      expect(preBalance).to.equal(0);

      const acctPreWithdraw = await ttBank.viewBalance();
      expect(acctPreWithdraw).to.equal(BigInt(100e18));

      const bankPreWithdraw = await ttBank.bankBalance();
      expect(bankPreWithdraw).to.equal(BigInt(200e18));

      const filter = ttBank.filters.Withdraw(null, null, null, null);

      await ttBank.withdraw(BigInt(10e18));

      const queryFilter = (await ttBank.queryFilter(filter))[0];

      const postBalance = await token.balanceOf(signers[0].address);
      expect(postBalance).to.be.equal(BigInt(10e18));

      const acctPostWithdraw = await ttBank.viewBalance();
      expect(acctPostWithdraw).to.equal(BigInt(90e18));

      const bankPostWithdraw = await ttBank.bankBalance();
      expect(bankPostWithdraw).to.equal(BigInt(190e18));

      const acctDetails = await ttBank.viewAccount();

      expect(queryFilter.event).to.equal("Withdraw");
      expect(queryFilter.args.accountNumber).to.equal(
        acctDetails.accountNumber
      );
      expect(queryFilter.args.accountName).to.equal(acctDetails.accountName);
      expect(queryFilter.args.withdrawAmount).to.equal(BigInt(10e18));

      expect(queryFilter.args.newBalance).to.equal(
        BigInt(100e18) - BigInt(10e18)
      );
    });
  });
});
