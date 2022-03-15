import { expect } from "chai";
import { ethers } from "hardhat";

describe("Token", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy("TEST", "TT");
    await token.deployed();

    console.log(await token.owner());
  });
});
