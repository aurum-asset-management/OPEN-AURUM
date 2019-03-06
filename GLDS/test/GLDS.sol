pragma solidity ^0.4.2;

import "build/Assert.sol";
import "build/DeployedAddresses.sol";
import "../contracts/GLDS.sol";

contract TestGLDS {

  function testInitialBalanceUsingDeployedContract() {
    GLDS mglds = GLDS(DeployedAddresses.GLDS());

    uint expected = 1000;

    Assert.equal(mglds.getBalance(tx.origin), expected, "Owner should have 1000 GLDS initially");
  }

  function testInitialBalanceWithNewGLDS() {
    GLDS mglds = new GLDS();

    uint expected = 1000;

    Assert.equal(mglds.getBalance(tx.origin), expected, "Owner should have 1000 GLDS initially");
  }

}
