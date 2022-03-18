//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.12;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {ERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract Token is Initializable,OwnableUpgradeable,ERC20Upgradeable{

    function initialize(string memory name, string memory symbol) public initializer  {
        __ERC20_init(name,symbol);

        __Ownable_init();
    }

//    function fund(uint256 amount) public onlyOwner {
//         require(amount > 0, "Token: Insufficient fund amount");
//         _mint(address(this), amount);
//     }

//     function fundAccount(uint256 amount) public {
//         require(amount <= 100, "Token: Mint limit exceeded");
//         ERC20(address(this)).transfer(msg.sender, 100);
//     }
}


