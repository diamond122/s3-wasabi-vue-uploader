const { TransactionBuilder, Keypair, Network, Operation, TimeoutInfinite, Server } = require('stellar-sdk');
const server = new Server('https://horizon-testnet.stellar.org');

Network.useTestNetwork();
const secretKey = process.env.VUE_APP_STELLAR_SECRET_KEY; // secretKey for stellar
const pair = Keypair.fromSecret(secretKey);

const upload = async (name, value) => {
  const account = await server.loadAccount(pair.publicKey());
  const transaction = new TransactionBuilder(account)
    .addOperation(Operation.manageData({
      name,
      value
    }))
    .setTimeout(TimeoutInfinite)
    .build();
  transaction.sign(pair);
  return server.submitTransaction(transaction);
};
const checkNetworkStatus = async () => {
  const now = new Date();
  const ledgerResult = await server
    .ledgers()
    .order('desc')
    .limit(1)
    .call();
  const record = ledgerResult.records[0];
  const closedAt = new Date(record.closed_at);
  const delay = (now.getTime() - closedAt.getTime()) / 1000;
  return delay < 30;
  // return delay;
};
const getKeys = () => {
  return [pair.publicKey()];
};

export default {
  checkNetworkStatus,
  upload,
  getKeys,
};