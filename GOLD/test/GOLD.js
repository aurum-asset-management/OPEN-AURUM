var GOLD = artifacts.require("./GOLD.sol");

contract('GOLD', function(accounts) {
  it("should put 10000 GOLD in the first account", function() {
    return GOLD.deployed().then(function(instance) {
      return instance.getBalance.call(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 1000, "1000 wasn't in the first account");
    });
  });
  it("should call a function that depends on a linked library", function() {
    var mgold;
    var GOLDBalance;
    var GOLDEthBalance;

    return GOLD.deployed().then(function(instance) {
      mgold = instance;
      return mgold.getBalance.call(accounts[0]);
    }).then(function(outCoinBalance) {
      GOLDBalance = outCoinBalance.toNumber();
      return mgold.getBalanceInEth.call(accounts[0]);
    }).then(function(outCoinBalanceEth) {
      GOLDEthBalance = outCoinBalanceEth.toNumber();
    }).then(function() {
      assert.equal(GOLDEthBalance, 2 * GOLDBalance, "Library function returned unexpected function, linkage may be broken");
    });
  });
  it("should send coin correctly", function() {
    var mgold;

    // Get initial balances of first and second account.
    var account_one = accounts[0];
    var account_two = accounts[1];

    var account_one_starting_balance;
    var account_two_starting_balance;
    var account_one_ending_balance;
    var account_two_ending_balance;

    var amount = 10;

    return GOLD.deployed().then(function(instance) {
      mgold = instance;
      return mgold.getBalance.call(account_one);
    }).then(function(balance) {
      account_one_starting_balance = balance.toNumber();
      return mgold.getBalance.call(account_two);
    }).then(function(balance) {
      account_two_starting_balance = balance.toNumber();
      return mgold.sendCoin(account_two, amount, {from: account_one});
    }).then(function() {
      return mgold.getBalance.call(account_one);
    }).then(function(balance) {
      account_one_ending_balance = balance.toNumber();
      return mgold.getBalance.call(account_two);
    }).then(function(balance) {
      account_two_ending_balance = balance.toNumber();

      assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
      assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
    });
  });
});
