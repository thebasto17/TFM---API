// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "forge-std/Script.sol";
import "../src/ERC20Token.sol";

contract DeployMyTokenScript is Script {

    function run() external {
        vm.startBroadcast();

        ERC20Token token = new ERC20Token();

        vm.stopBroadcast();
        console.log("ERC20Token deployed on:", address(token));
    }
}

