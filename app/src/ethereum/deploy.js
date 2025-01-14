const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CharityFactory.json');

const provider = new HDWalletProvider(
  'later axis panel hockey age snap yellow space chimney obscure slender source',
  'http://206.189.231.104:8545'
)

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
  .deploy({ data: compiledFactory.bytecode })
  .send({ gas: "3000000", from: accounts[0] })

  console.log(compiledFactory.interface);
console.log('Contract deployed to', result.options.address);
};
deploy();
