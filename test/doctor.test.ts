import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";
import { ethers, upgrades } from "hardhat";
import { Doctor, HealthRecord } from "../typechain";

use(solidity);

describe("Token"),
  function () {
    let healthRecord: HealthRecord;
    let doctor: Doctor;
    let signers: SignerWithAddress[];

    beforeEach(async () => {
      // Returns the Hardhat test accounts
      signers = await ethers.getSigners();

      const HealthRecord = await ethers.getContractFactory(
        "HealthRecord",
        signers[0]
      );

      const Doctor = await ethers.getContractFactory("Doctor", signers[0]);

      // Deploys and initializes the Doctor.sol proxy as an upgradeable contract
      doctor = (await upgrades.deployProxy(Doctor, [
        "Test Token",
        "TT",
      ])) as Doctor;
    });
  };
