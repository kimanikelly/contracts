//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {Token} from "./Token.sol";
import {SafeERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {IHealthRecord} from "./interfaces/IHealthRecord.sol";

import "hardhat/console.sol";

contract HealthRecord is IHealthRecord, Initializable, OwnableUpgradeable {
    using SafeERC20Upgradeable for Token;

    // Token.sol instance
    Token public token;

    // Amount of tokens the Doctor has to pay to be added and verified
    uint256 public doctorFee;

    // Doctor.Sol contract address
    address public doctorContract;

    // HealthRecord.sol to Doctor.sol configuration status
    bool public doctorContractConfigured;

    // Added Doctors verification status
    mapping(address doctorAddress => bool doctorStatus) public doctorVerified;

    modifier onlyDoctor() {
        // Only Doctor.sol may invoke this function
        require(msg.sender == doctorContract, "HealthRecord: only Doctor.sol");

        _;
    }

    function initialize(address tokenAddress) public initializer {
        // Sets the fee on initialization
        doctorFee = 10 ether;

        // Instantiates the Token.sol instance
        token = Token(tokenAddress);

        /// Initializes OwnableUpgradeable.sol and assigns the msg.sender as the owner
        __Ownable_init();
    }

    function setDoctorContract(address _doctorContract) public onlyOwner {
        // Prevents Doctor.sol from being configured more than once
        require(!doctorContractConfigured, "HealthRecord: Doctor.sol is set");

        // Sets the Doctor.sol configuration status
        doctorContractConfigured = true;

        // Assigns the Doctor.sol contract address
        doctorContract = _doctorContract;

        // Emits when the owner of HealthRecord.sol sets Doctor.sol
        emit DoctorContractSet(owner(), doctorContract, true, block.timestamp);
    }

    function addDoctor(address doctor, bytes32 cid) external onlyDoctor {
        // Prevents an existing Doctor from invoking this function more than once
        require(!doctorVerified[doctor], "HealthRecord: doctor exists");

        // Sets the Doctors verification status
        doctorVerified[doctor] = true;

        // Transfers the doctorFee from the new Doctor to HealthRecord.sol
        token.safeTransferFrom(doctor, address(this), doctorFee);

        // Emits when the new Doctor is added
        emit DoctorAdded(doctor, block.timestamp);
    }
}
