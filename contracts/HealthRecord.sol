//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {IHealthRecord} from "./interfaces/IHealthRecord.sol";

import "hardhat/console.sol";

contract HealthRecord is IHealthRecord, Initializable, OwnableUpgradeable {
    address public doctorContract;

    bool public doctorContractConfigured;

    mapping(address doctorAddress => bool doctorStatus) public isDoctorVerified;

    function initialize() public initializer {
        /// Initializes OwnableUpgradeable.sol and assigns the msg.sender as the owner
        __Ownable_init();
    }

    function setDoctorContract(address _doctorContract) public onlyOwner {
        doctorContractConfigured = true;
        doctorContract = _doctorContract;
    }

    function addDoctor(address doctor, bytes32 cid) external {
        require(
            msg.sender == doctorContract,
            "HealthRecord: Only the Doctor contract can call"
        );

        isDoctorVerified[doctor] = true;
    }
}
