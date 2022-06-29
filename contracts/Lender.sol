// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

/// Imports the ILender interface
import {ILender} from "./interfaces/ILender.sol";

/// Imports the OwnableUpgradeable contract
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract Lender is OwnableUpgradeable {}
