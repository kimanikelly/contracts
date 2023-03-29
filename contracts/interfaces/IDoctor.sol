//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

interface IDoctor {
    function addDoctor(address doctor, bytes32 cid) external;
}
