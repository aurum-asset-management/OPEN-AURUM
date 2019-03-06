pragma solidity ^0.4.2;

import "build/Assert.sol";
import "build/DeployedAddresses.sol";
import "../contracts/GOLD.sol";

contract TestGOLD {

  function testInitialBalanceUsingDeployedContract() {
    GOLD mgold = GOLD(DeployedAddresses.GOLD());

    uint expected = 1000;

    Assert.equal(mgold.getBalance(tx.origin), expected, "Owner should have 1000 GOLD initially");
  }

  function testInitialBalanceWithNewGOLD() {
    GOLD mgold = new GOLD();

    uint expected = 1000;

    Assert.equal(mgold.getBalance(tx.origin), expected, "Owner should have 1000 GOLD initially");
  }

}
