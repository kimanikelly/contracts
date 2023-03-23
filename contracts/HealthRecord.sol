//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import {IHealthRecord} from "./interfaces/IHealthRecord.sol";

contract HealthRecord is IHealthRecord {
    mapping(address doctorAddress => bool doctorStatus) public isDoctorVerified;

    function addDoctor(bytes32 cid) external {}
}
