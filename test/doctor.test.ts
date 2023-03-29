import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect, use } from "chai";
import { ethers, upgrades } from "hardhat";
import { doc } from "prettier";
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
    await healthRecord.deployed();

    const Doctor = await ethers.getContractFactory("Doctor", signers[0]);

    // Deploys and initializes the Doctor.sol proxy as an upgradeable contract
    doctor = (await upgrades.deployProxy(Doctor, [
      healthRecord.address,
    ])) as Doctor;
    await doctor.deployed();

    await healthRecord.setDoctorContract(doctor.address);
  });

  describe("#initializer", () => {
    it("Should revert if the contract is already initialized", async () => {
      await expect(doctor.initialize(healthRecord.address)).to.be.revertedWith(
        "Initializable: contract is already initialized"
      );
    });

    it("Should emit the OwnershipTransferred on deployment", async () => {
      const filter = doctor.filters.OwnershipTransferred(null, null);

      const queryFilter = (await doctor.queryFilter(filter))[0];

      expect(queryFilter.event).to.equal("OwnershipTransferred");

      expect(queryFilter.args.previousOwner).to.equal(
        ethers.constants.AddressZero
      );

      expect(queryFilter.args.newOwner).to.equal(signers[0].address);
    });

    it("Should get the owner", async () => {
      const owner = await doctor.owner();

      expect(owner).to.equal(signers[0].address);
    });

    it("Should get the HealthRecord address", async () => {
      const healthRecordAddress = await doctor.healthRecordAddress();

      expect(healthRecordAddress).to.equal(healthRecord.address);
    });
  });
});
