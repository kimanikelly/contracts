//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract TTBank is Initializable, OwnableUpgradeable {
    struct BankDetails {
        uint256 accountNumber;
        string accountName;
        string accountType;
        uint256 balance;
    }

    function intitialize() public {
        /// Initializes OwnableUpgradeable.sol and assigns the msg.sender as the owner
        __Ownable_init();
    }
}
