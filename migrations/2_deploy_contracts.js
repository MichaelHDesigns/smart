const CampaignFactory = artifacts.require("CampaignFactory");
const CampaignWallet = artifacts.require("CampaignWallet");
const CharityFactory = artifacts.require("CharityFactory");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(CampaignFactory);
  await deployer.deploy(CharityFactory);

  if (network === 'development') {
    await deployer.deploy(CampaignWallet, [accounts[1], accounts[2]], [50, 50], ['FoodCo', 'BuildCo'], ['Food', 'Construction']);
    const campaignFactory = await CampaignFactory.deployed();
    const charityFactory = await CharityFactory.deployed();
    const now = Math.floor(new Date().getTime() / 1000);
    await campaignFactory.createCampaign(CampaignWallet.address, 1e18.toString(), now, now + 100000, 'Sample title', 'Sample description');
  }
}
