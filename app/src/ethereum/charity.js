import web3 from './web3';
import Charity from '../../build/contracts/Charity.json';

export default ( address ) => {
  return new web3.eth.Contract(
    JSON.parse(Charity.interface),
    address
  );
};
