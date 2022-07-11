import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { BigNumber, ContractTransaction, Event } from "ethers";
import { Lender, Lender__factory, MockOracle, Token } from "../typechain";

describe.only("Lender", () => {
  let signers: SignerWithAddress[];
  let token: Token;
  let mockOracle: MockOracle;
  let Lender: Lender__factory;

  beforeEach(async () => {
    // Returns the Hardhat test accounts
    signers = await ethers.getSigners();

    let MockOracle = await ethers.getContractFactory("MockOracle", signers[0]);

    mockOracle = (await MockOracle.deploy()) as MockOracle;
    await mockOracle.deployed();

    let Token = await ethers.getContractFactory("Token", signers[0]);

    // Deploys and initializes the Token.sol proxy as an upgradeable contract
    token = (await upgrades.deployProxy(Token, ["Test Token", "TT"])) as Token;
    await token.deployed();

    Lender = await ethers.getContractFactory("Lender", signers[0]);
  });

  describe("#initialize", () => {
    it("Should revert if the stableCoinAddress is a zero address", async () => {
      await expect(
        upgrades.deployProxy(Lender, [
          ethers.constants.AddressZero,
          mockOracle.address,
        ])
      ).to.be.revertedWith(
        "Lender: stableCoinAddress cannot be a zero address"
      );
    });

    it("Should revert if the oracleAddress is a zero address", async () => {
      await expect(
        upgrades.deployProxy(Lender, [
          token.address,
          ethers.constants.AddressZero,
        ])
      ).to.be.revertedWith("Lender: oracleAddress cannot be a zero address");
    });

    it("Should revert if initialized twice", async () => {
      let lender = await upgrades.deployProxy(Lender, [
        token.address,
        mockOracle.address,
      ]);

      await expect(
        lender.initialize(token.address, mockOracle.address)
      ).to.be.revertedWith("Initializable: contract is already initialized");
    });

    it("Should emit the Initialized event", async () => {
      let lender = await upgrades.deployProxy(Lender, [
        token.address,
        mockOracle.address,
      ]);

      let filter = lender.filters.Initialized(null);

      let queryFilter = (await lender.queryFilter(filter))[0];

      expect(queryFilter.event).to.equal("Initialized");
    });

    it("Should emit the OwnershipTransferred event", async () => {
      let lender = await upgrades.deployProxy(Lender, [
        token.address,
        mockOracle.address,
      ]);

      let filter = lender.filters.OwnershipTransferred(null, null);

      let queryFilter = (await lender.queryFilter(filter))[0];

      expect(queryFilter.event).to.equal("OwnershipTransferred");
      expect(queryFilter.args.previousOwner).to.equal(
        ethers.constants.AddressZero
      );
      expect(queryFilter.args.newOwner).to.equal(signers[0].address);
    });

    it("Should get the the owner", async () => {
      let lender = await upgrades.deployProxy(Lender, [
        token.address,
        mockOracle.address,
      ]);

      expect(await lender.owner()).to.equal(signers[0].address);
    });
  });

  describe("#borrow", () => {
    let lender: Lender;
    beforeEach(async () => {
      lender = (await upgrades.deployProxy(Lender, [
        token.address,
        mockOracle.address,
      ])) as Lender;
    });

    it("Testing", async () => {
      let testing = "hello";
    });
  });
});
