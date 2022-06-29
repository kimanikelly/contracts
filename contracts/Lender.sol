// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

/// Imports the ILender interface
import {ILender} from "./interfaces/ILender.sol";

/// Imports the OwnableUpgradeable contract
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

/// Imports the ERC721HolderUpgradeable contract and allows Lender to receive ERC-721's
import {ERC721HolderUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/utils/ERC721HolderUpgradeable.sol";

contract Lender is OwnableUpgradeable, ERC721HolderUpgradeable {}
