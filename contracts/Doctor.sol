//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

import {IHealthRecord} from "./interfaces/IHealthRecord.sol";
import {IDoctor} from "./interfaces/IDoctor.sol";

contract Doctor is IDoctor, Initializable {
    address public _healthRecord;

    function initialize(address healthRecordAddress) public initializer {
        healthRecordAddress = _healthRecord;
    }

    function addDoctor(bytes32 cid) public returns (bool) {}
}
