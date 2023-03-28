import web3 from './web3';
import CharityCampaign from './build/contracts/Charity.json';

//pre-configured instance for our contract
const instance = new web3.eth.Contract(
  JSON.parse(CharityCampaign.interface),
  '0x04F81c25874d3051A28693a395b8D790c26336Bc'
);

export default instance;
