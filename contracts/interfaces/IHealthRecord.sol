//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

interface IHealthRecord {
    function verifyDoctor(address newDoctor) external returns (bool);
}
