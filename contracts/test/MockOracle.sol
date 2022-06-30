// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

import {AggregatorV3Interface} from "../interfaces/AggregatorV3Interface.sol";

contract MockOracle {
    AggregatorV3Interface internal priceFeed;
    int256 private price;

    constructor() {
        /// Set the test price to 1 ether
        price = 1 ether;

        /// Set the test contract to the zero address for ETH
        priceFeed = AggregatorV3Interface(
            0x0000000000000000000000000000000000000000
        );
    }

    function getLatestPrice() public view returns (int256) {
        return price;
    }

    function setPrice(int256 _price) external {
        price = _price;
    }
}
