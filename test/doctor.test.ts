import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import "@nomicfoundation/hardhat-chai-matchers";
import { expect, use } from "chai";
import { ethers, upgrades } from "hardhat";
import { Token, Doctor, HealthRecord } from "../typechain";

describe("Doctor", function () {
  let token: Token;
  let healthRecord: HealthRecord;
  let doctor: Doctor;
  let signers: SignerWithAddress[];
  const mintAmt = 1000;
  const fundAmt = 100;
  const approveAmt = BigInt(100e18);
  const testStr =
    "0x74657374696e6700000000000000000000000000000000000000000000000000";

  beforeEach(async () => {
    // Returns the Hardhat test accounts
    signers = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Token", signers[0]);

    // Deploys and initializes the Token.sol proxy as an upgradeable contract
    token = (await upgrades.deployProxy(Token, ["Test Token", "TT"])) as Token;

    const HealthRecord = await ethers.getContractFactory(
      "HealthRecord",
      signers[0]
    );

    // Deploys and initializes the HealthRecord.sol proxy as an upgradeable contract
    healthRecord = (await upgrades.deployProxy(HealthRecord, [
      token.address,
    ])) as HealthRecord;
    await healthRecord.deployed();

    const Doctor = await ethers.getContractFactory("Doctor", signers[0]);

    // Deploys and initializes the Doctor.sol proxy as an upgradeable contract
    doctor = (await upgrades.deployProxy(Doctor, [
      healthRecord.address,
    ])) as Doctor;
    await doctor.deployed();

    await healthRecord.setDoctorContract(doctor.address);

    await token.mint(mintAmt);
    await token.setFundAmount(fundAmt);
  });

  describe("#initializer", () => {
    it("Should revert if the contract is already initialized", async () => {
      await expect(doctor.initialize(healthRecord.address)).to.be.revertedWith(
        "Initializable: contract is already initialized"
      );
    });

    it("Should revert if setDoctorContract is not called by the owner", async () => {
      await expect(
        healthRecord.connect(signers[1]).setDoctorContract(doctor.address)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should revert if the Doctor contract is already set", async () => {
      await expect(
        healthRecord.setDoctorContract(doctor.address)
      ).to.be.revertedWith("HealthRecord: Doctor.sol is set");
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

    it("Should emit the Initialized event on deployment", async () => {
      const filter = doctor.filters.Initialized(null);

      const queryFilter = (await doctor.queryFilter(filter))[0];

      expect(queryFilter.event).to.equal("Initialized");
      expect(queryFilter.args.version).to.equal(1);
    });

    it("Should emit the DoctorContractSet event", async () => {
      const filter = healthRecord.filters.DoctorContractSet(
        null,
        null,
        null,
        null
      );

      const queryFilter = (await healthRecord.queryFilter(filter))[0];

      expect(queryFilter.event).to.equal("DoctorContractSet");
      expect(queryFilter.args.owner).to.equal(await healthRecord.owner());
      expect(queryFilter.args.doctorContract).to.equal(doctor.address);
      expect(queryFilter.args.doctorContract).to.equal(
        await healthRecord.doctorContract()
      );
      expect(queryFilter.args.isSet).to.be.true;
    });

    it("Should get the owner", async () => {
      const owner = await doctor.owner();

      expect(owner).to.equal(signers[0].address);
    });

    it("Should get the HealthRecord contract address", async () => {
      const healthRecordAddress = await doctor.healthRecordContract();

      expect(healthRecordAddress).to.equal(healthRecord.address);
    });
  });

  describe("#addDoctor", () => {
    it("Should revert if directly called through HealthRecord.sol", async () => {
      await expect(
        healthRecord.addDoctor(signers[0].address, testStr)
      ).to.be.revertedWith("HealthRecord: only Doctor.sol");
    });

    it("Should revert if the transfer amount exceeds the allowance", async () => {
      await token.fundAccount();

      await expect(doctor.addDoctor(testStr)).to.be.revertedWith(
        "ERC20: insufficient allowance"
      );
    });

    it("Should revert if the transfer amount exceeds the balance", async () => {
      await token.approve(healthRecord.address, approveAmt);

      await expect(doctor.addDoctor(testStr)).to.be.revertedWith(
        "ERC20: transfer amount exceeds balance"
      );
    });

    it("Should revert if theres an attempt to add an existing Doctor", async () => {
      await token.fundAccount();

      await token.approve(healthRecord.address, approveAmt);

      await doctor.addDoctor(testStr);

      await expect(doctor.addDoctor(testStr)).to.be.revertedWith(
        "HealthRecord: doctor exists"
      );
    });

    it("Should add a doctor and return the verification status", async () => {
      await token.fundAccount();

      await token.approve(healthRecord.address, approveAmt);

      await doctor.addDoctor(testStr);

      const verificationStatus = await healthRecord.doctorVerified(
        signers[0].address
      );

      expect(verificationStatus).to.be.true;
    });
  });
});
