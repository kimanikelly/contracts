//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import {IHealthRecord} from "./interfaces/IHealthRecord.sol";

contract HealthRecord is IHealthRecord, Initializable, OwnableUpgradeable {
    mapping(address doctorAddress => bool doctorStatus) public isDoctorVerified;

    function initialize() public initializer {
        /// Initializes OwnableUpgradeable.sol and assigns the msg.sender as the owner
        __Ownable_init();
    }

    function addDoctor(bytes32 cid) external {}
}
