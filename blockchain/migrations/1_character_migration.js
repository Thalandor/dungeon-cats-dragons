var Character = artifacts.require("CharacterNFT");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(Character);
};