//const UserAuth = artifacts.require("./UserAuthentication.sol");
const Pright = artifacts.require("./PrescribeRight.sol");

module.exports = function(deployer) {
    deployer.deploy(Pright);
};
