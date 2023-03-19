//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

interface IDoctor {
    function signUp(bytes32 detailsCid) external returns (bool);
}
