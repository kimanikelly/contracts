import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";
import { ethers } from "hardhat";
import { BigNumber, Event } from "ethers";
import { Token } from "../typechain";

use(solidity);

describe("Token", function () {
  let token: Token;
  let signers: SignerWithAddress[];

  beforeEach(async () => {
    // Returns the Hardhat test accounts
    signers = await ethers.getSigners();

    // Returns the Token.sol contract factory
    const Token = await ethers.getContractFactory("Token", signers[0]);

    // Deploys Token.sol
    token = await Token.deploy("TEST TOKEN", "TT");

    await token.deployed();
  });

  describe("#Constructor", () => {
    it("Should get the name", async () => {
      const name: string = await token.name();

      expect(name).to.equal("TEST TOKEN");
    });

    it("Should get the symbol", async () => {
      const symbol: string = await token.symbol();

      expect(symbol).to.equal("TT");
    });

    it("Should get the decimals", async () => {
      const decimals: number = await token.decimals();

      expect(decimals).to.equal(18);
    });

    it("Should have a totalSupply of zero before the initial mint", async () => {
      const totalSupply: BigNumber = await token.totalSupply();

      expect(totalSupply).to.equal(0);
    });
  });

  describe("#Ownership", () => {
    it("Should get the owner", async () => {
      const owner: string = await token.owner();

      expect(owner).to.equal(signers[0].address);
    });

    it("Should transfer ownership", async () => {
      const tx = await token.transferOwnership(signers[1].address);

      const receipt = await tx.wait();

      const logs = receipt.events?.slice(-1) as Event[];

      const event = logs[0];

      const owner: string = await token.owner();
      expect(owner).to.equal(signers[1].address);

      expect(event.event).to.equal("OwnershipTransferred");

      expect(event.args?.previousOwner).to.equal(signers[0].address);

      expect(event.args?.newOwner).to.equal(signers[1].address);
    });

    it("Should revert if transferOwnership is not called by the owner", async () => {
      const prevOwner = await token.owner();
      await expect(
        token.connect(signers[1]).transferOwnership(signers[1].address)
      ).to.be.revertedWith("Ownable: caller is not the owner");

      const newOwner = await token.owner();
      expect(prevOwner).to.equal(newOwner);
    });
  });

  describe("#Fund", () => {
    let fundAmt = 100000;
    let fundAcctAmt = 100;
    let tx: any;

    beforeEach(async () => {
      tx = await token.fund(fundAmt);
    });

    it("Should have a balance of 100,000", async () => {
      const balance = await token.balanceOf(token.address);

      expect(balance).to.equal(fundAmt);
    });

    it("Should emit a Transfer event after funding", async () => {
      const receipt = await tx.wait();

      expect(receipt.events[0].event).to.equal("Transfer");

      expect(receipt.events[0].args.from).to.equal(
        ethers.constants.AddressZero
      );

      expect(receipt.events[0].args.to).to.equal(token.address);

      expect(receipt.events[0].args.value).to.equal(fundAmt);
    });

    it("Should revert if fundFaucet is not called by the owner", async () => {
      const owner = await token.owner();

      const preFundBal = await token.balanceOf(token.address);

      expect(owner).to.not.equal(signers[19].address);

      await expect(token.connect(signers[19]).fund(300000)).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );

      const postFundBal = await token.balanceOf(token.address);

      expect(postFundBal).to.equal(preFundBal);
    });

    it("Should revert if the fund amount is zero", async () => {
      const preFundBal = await token.balanceOf(token.address);

      await expect(token.fund(0)).to.be.revertedWith(
        "Token: Insufficient fund amount"
      );

      const postFundBal = await token.balanceOf(token.address);

      expect(postFundBal).to.equal(preFundBal);
    });

    it("Should mint to caller", async () => {
      // token balance before a user calls the fundAccount function
      // token was fund with 100,000
      const faucetPreBal = await token.balanceOf(token.address);

      // Expect the token balance to equal 100,000
      // expect(faucetPreBal).to.equal(fund);

      // The balance of signers[0] is zero
      const preBal = await token.balanceOf(signers[1].address);

      // Expect the balance of signers[0] to equal 0
      expect(preBal).to.equal(0);

      // The totalSupply of token before the fundAccount function is called
      const preSupply = await token.totalSupply();

      // Expect the totalSupply to equal the original fundFaucet amount
      expect(preSupply).to.equal(fundAmt);

      // The fundAccount transaction will transfer x amount of tokens from
      // token to the caller up to 100 tokens
      const tx = await token.connect(signers[1]).fundAccount(fundAcctAmt);

      // The balance of token after the fundAccount function is called
      const faucetPostBal = await token.balanceOf(token.address);

      // Expect the balance of token to equal 100,000 - 100 = 99,900
      expect(faucetPostBal).to.equal(fundAmt - fundAcctAmt);

      const postBal = await token.balanceOf(signers[1].address);
      expect(postBal).to.equal(fundAcctAmt);

      const postSupply = await token.totalSupply();
      expect(postSupply).to.equal(fundAmt);

      const receipt = await tx.wait();

      const logs = receipt.events?.slice(-1) as Event[];

      expect(logs[0].event).to.equal("Transfer");
    });
  });
});
