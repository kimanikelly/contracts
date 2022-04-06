import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";
import { ethers, upgrades } from "hardhat";
import { BigNumber, ContractTransaction, Event } from "ethers";
import { Token, Token__factory } from "../typechain";

use(solidity);

describe("Token", function () {
  let token: Token;
  let signers: SignerWithAddress[];
  let mintAmt = 100;
  let mintParseAmt = ethers.utils.parseEther(mintAmt.toString());

  beforeEach(async () => {
    // Returns the Hardhat test accounts
    signers = await ethers.getSigners();

    // Returns the Token.sol contract factory
    const Token: Token__factory = await ethers.getContractFactory(
      "Token",
      signers[0]
    );

    // Deploys and initializes the Token.sol proxy as an upgradeable contract
    token = (await upgrades.deployProxy(Token, ["Test Token", "TT"])) as Token;
  });

  describe("#initializer", () => {
    it("Should revert if the contract is already initialized", async () => {
      await expect(token.initialize("Test Token", "TT")).to.be.revertedWith(
        "Initializable: contract is already initialized"
      );
    });

    it("Should emit the OwnershipTransferred emit on deployment", async () => {
      const filter = token.filters.OwnershipTransferred(null, null);

      const queryFilter = (await token.queryFilter(filter))[0];

      expect(queryFilter.event).to.equal("OwnershipTransferred");

      expect(queryFilter.args.previousOwner).to.equal(
        ethers.constants.AddressZero
      );

      expect(queryFilter.args.newOwner).to.equal(signers[0].address);
    });

    it("Should get the owner", async () => {
      const owner: string = await token.owner();
      expect(owner).to.equal(signers[0].address);
    });

    it("Should get the name", async () => {
      const name: string = await token.name();
      expect(name).to.equal("Test Token");
    });

    it("Should get the symbol", async () => {
      const symbol: string = await token.symbol();
      expect(symbol).to.equal("TT");
    });

    it("Should get the decimals", async () => {
      const decimals: number = await token.decimals();
      expect(decimals).to.equal(18);
    });
  });

  describe("#mint", async () => {
    beforeEach(async () => {
      await token.mint(mintAmt);
    });

    it("Should revert if not called by the owner", async () => {
      await expect(token.connect(signers[1]).mint(mintAmt)).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
    });

    it("Should revert if the mint amount is 0", async () => {
      await expect(token.mint(0)).to.be.revertedWith(
        "'Token: Amount cannot be set to 0'"
      );
    });

    it("Should emit the Transfer event", async () => {
      const filter = token.filters.Transfer(null, null, null);

      const queryFilter = (await token.queryFilter(filter))[0];

      expect(queryFilter.args.from).to.equal(ethers.constants.AddressZero);

      expect(queryFilter.args.to).to.equal(token.address);

      expect(queryFilter.args.value).to.equal(mintParseAmt);
    });

    describe("#totalSupply", () => {
      it("Should increase the totalSupply by the mint amount", async () => {
        const totalSupply: BigNumber = await token.totalSupply();
        expect(totalSupply).to.equal(mintParseAmt);
      });
    });

    describe("#balanceOf", () => {
      it("Should increase the Token contract balance by the mint amount", async () => {
        const balance: BigNumber = await token.balanceOf(token.address);
        expect(balance).to.equal(mintParseAmt);
      });
    });
  });

  describe("#setFundAmount", () => {
    const offChainFundAmt: BigNumber = ethers.BigNumber.from(10000);
    const offChainParseAmt = ethers.utils.parseEther(
      offChainFundAmt.toString()
    );

    it("Should revert if the caller is not the owner", async () => {
      await expect(
        token.connect(signers[1]).setFundAmount(offChainFundAmt)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should revert if the fund amount is 0 ", async () => {
      await expect(token.setFundAmount(0)).to.be.revertedWith(
        "Token: Amount cannot be set to 0"
      );
    });

    it("Should return the fund amount as 0 before the initial set", async () => {
      const initialFundAmount: BigNumber = await token.fundAmount();
      expect(initialFundAmount.toNumber()).to.equal(0);
    });

    it("Should set the fund amount", async () => {
      await token.setFundAmount(offChainFundAmt);

      const filter = token.filters.FundAmountSet(null, null);

      const queryFilter = (await token.queryFilter(filter))[0];

      expect(queryFilter.event).to.equal("FundAmountSet");

      expect(queryFilter.args?.previousAmount).to.equal(0);

      expect(queryFilter.args?.newAmount).to.equal(offChainParseAmt);

      const onChainFundAmt: BigNumber = await token.fundAmount();

      expect(onChainFundAmt).to.equal(offChainParseAmt);
    });
  });

  describe("#fundAccount", async () => {
    let mintAmt = 400;
    let offChainFundAmt = 200;

    beforeEach(async () => {
      await token.mint(mintAmt);

      await token.setFundAmount(offChainFundAmt);
    });

    it("Should revert if the amount exceeds the Token balance ", async () => {
      await token.connect(signers[1]).fundAccount();

      await token.connect(signers[2]).fundAccount();

      await expect(token.connect(signers[3]).fundAccount()).to.be.revertedWith(
        "ERC20: transfer amount exceeds balance"
      );
    });

    it("Should fund an account", async () => {
      const tokenPreFund: BigNumber = await token.balanceOf(token.address);
      expect(tokenPreFund.toNumber()).to.equal(mintAmt);

      const accountPreFund: BigNumber = await token.balanceOf(
        signers[1].address
      );
      expect(accountPreFund.toNumber()).to.equal(0);

      await token.connect(signers[1]).fundAccount();

      const filter = token.filters.Transfer(null, null, null);

      const queryFilter = await token.queryFilter(filter);

      const transferEvent = queryFilter.slice(-1);

      expect(transferEvent[0].event).to.equal("Transfer");

      expect(transferEvent[0].args.from).to.equal(token.address);

      expect(transferEvent[0].args.to).to.equal(signers[1].address);

      expect(transferEvent[0].args.value.toNumber()).to.equal(offChainFundAmt);
    });
  });

  describe("#Ownership", () => {
    it("Should revert if transferOwnership is not called by the owner", async () => {
      const prevOwner = await token.owner();
      await expect(
        token.connect(signers[1]).transferOwnership(signers[1].address)
      ).to.be.revertedWith("Ownable: caller is not the owner");

      const newOwner = await token.owner();
      expect(prevOwner).to.equal(newOwner);
    });

    it("Should get the owner", async () => {
      const owner: string = await token.owner();

      expect(owner).to.equal(signers[0].address);
    });

    it("Should transfer ownership", async () => {
      const tx = await token.transferOwnership(signers[1].address);

      const filter = token.filters.OwnershipTransferred(null, null);

      const queryFilter = (await token.queryFilter(filter))[1];

      const owner: string = await token.owner();

      expect(owner).to.equal(signers[1].address);

      expect(queryFilter.event).to.equal("OwnershipTransferred");

      expect(queryFilter.args?.previousOwner).to.equal(signers[0].address);

      expect(queryFilter.args?.newOwner).to.equal(signers[1].address);
    });
  });
});
