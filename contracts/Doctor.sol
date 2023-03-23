//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {IDoctor} from "./interfaces/IDoctor.sol";
import {IHealthRecord} from "./interfaces/IHealthRecord.sol";
import "hardhat/console.sol";

contract Doctor is IDoctor, Initializable, OwnableUpgradeable {
    address public healthRecordAddress;

    function initialize(address _healthRecordAddress) public initializer {
        healthRecordAddress = _healthRecordAddress;

        /// Initializes OwnableUpgradeable.sol and assigns the msg.sender as the owner
        __Ownable_init();
    }

    function addDoctor(bytes32 cid) public {
        IHealthRecord(healthRecordAddress).addDoctor(cid);
    }
}
