//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

interface IHealthRecord {
    struct DoctorInformation {
        bytes32 cid;
        bytes32 filename;
        address doctorId;
        uint256 timeAdded;
    }

    function setDoctorContract(address _doctorContract) external;

    function addDoctor(address doctor, bytes32 cid) external;
}
