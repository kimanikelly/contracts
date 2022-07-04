import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";
import { ethers, upgrades } from "hardhat";
import { BigNumber, ContractTransaction, Event } from "ethers";
import { MockOracle } from "../typechain";

describe("MockOracle", () => {
  let mockOracle: MockOracle;
  let signers: SignerWithAddress[];

  beforeEach(async () => {
    signers = await ethers.getSigners();

    let MockOracle = await ethers.getContractFactory("MockOracle");

    mockOracle = (await MockOracle.deploy()) as MockOracle;

    await mockOracle.deployed();
  });

  it("testing", async () => {
    let latestPrice = await mockOracle.getLatestPrice();
  });
});
