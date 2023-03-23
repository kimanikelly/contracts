import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect, use } from "chai";
import { ethers, upgrades } from "hardhat";
import { Doctor, HealthRecord } from "../typechain";

describe.only("Doctor", function () {
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

    // Deploys and initializes the HealthRecord.sol proxy as an upgradeable contract
    healthRecord = (await upgrades.deployProxy(
      HealthRecord,
      []
    )) as HealthRecord;

    const Doctor = await ethers.getContractFactory("Doctor", signers[0]);

    // Deploys and initializes the Doctor.sol proxy as an upgradeable contract
    doctor = (await upgrades.deployProxy(Doctor, [
      healthRecord.address,
    ])) as Doctor;
  });

  describe("#initializer", () => {
    it("Should revert if the contract is already initialized", async () => {
      await expect(doctor.initialize(healthRecord.address)).to.be.revertedWith(
        "Initializable: contract is already initialized"
      );
    });
  });
});
