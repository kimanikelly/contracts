//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

interface IDoctor {
    function addDoctor(bytes32 cid) external returns (bool);

    function deleteDoctor() external returns (bool);
}
