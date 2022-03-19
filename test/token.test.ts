import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";
import { ethers, upgrades } from "hardhat";
import { BigNumber, Event } from "ethers";
import { Token, Token__factory } from "../typechain";

use(solidity);

describe("Token", function () {
  let token: Token;
  let signers: SignerWithAddress[];
  let mintAmt = 100;

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
        "Token: Amount cannot be 0"
      );
    });

    it("Should emit the Transfer event", async () => {
      const filter = token.filters.Transfer(null, null, null);

      const queryFilter = (await token.queryFilter(filter))[0];

      expect(queryFilter.args.from).to.equal(ethers.constants.AddressZero);

      expect(queryFilter.args.to).to.equal(token.address);

      expect(queryFilter.args.value.toNumber()).to.equal(mintAmt);
    });

    describe("#totalSupply", () => {
      it("Should increase the totalSupply by the mint amount", async () => {
        const totalSupply: BigNumber = await token.totalSupply();
        expect(totalSupply.toNumber()).to.equal(mintAmt);
      });
    });

    describe("#balanceOf", () => {
      it("Should increase the Token contract balance by the mint amount", async () => {
        const balance: BigNumber = await token.balanceOf(token.address);
        expect(balance.toNumber()).to.equal(mintAmt);
      });
    });
  });

  describe.only("#setFundAmount", () => {
    it("Should revert setFundAmount if the caller is not the owner", async () => {
      await expect(
        token.connect(signers[1]).setFundAmount(10000)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("#fundAccount", async () => {
    let mintAmt = 200;
    beforeEach(async () => {
      await token.mint(mintAmt);

      await token.setFundAmount(200);
    });

    it("Should revert if the amount exceeds the limit", async () => {
      token.connect(signers[1]).fundAccount();
    });

    it.skip("Should revert if the amount exceeds the Token balance ", async () => {
      // await token.connect(signers[1]).fundAccount(100);
      // await token.connect(signers[2]).fundAccount(100);
      // await expect(token.connect(signers[3]).fundAccount(1)).to.be.revertedWith(
      //   "ERC20: transfer amount exceeds balance"
      // );
    });

    it("Testing", async () => {});
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
