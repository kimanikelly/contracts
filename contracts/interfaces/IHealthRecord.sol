//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

interface IHealthRecord {
    event DoctorContractSet(
        address owner,
        address doctorContract,
        bool isSet,
        uint256 dateSet
    );

    struct DoctorInformation {
        bytes32 cid;
        bytes32 filename;
        address doctorId;
        uint256 timeAdded;
    }

    function setDoctorContract(address _doctorContract) external;

    function addDoctor(address doctor, bytes32 cid) external;
}
