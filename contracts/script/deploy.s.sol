// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "forge-std/Script.sol";
import "../src/ERC20Token.sol";

contract DeployMyTokenScript is Script {

    function run() external {
        // Hi ha que definir la PRIVATE_KEY com un env variable, al shell: EXPORT PRIVATE_KEY=$private_key
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        ERC20Token token = new ERC20Token();

        vm.stopBroadcast();
    }
}

