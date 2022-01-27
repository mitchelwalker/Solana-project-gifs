const anchor = require('@project-serum/anchor')

const { SystemProgram } = anchor.web3;

const main = async() => {
  console.log("🚀 Starting Test")

  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Myepicproject;

  const baseAccount = anchor.web3.Keypair.generate();

  let tx = await program.rpc.startStuffOff({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId
    },
    signers: [baseAccount]
  });

  console.log("📝 Your transaction signiture", tx)

  let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log('👀 Gif Count', account.totalGifs.toString())

  await program.rpc.addGif('test_gif_link', {
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
    },
  });

  account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log('👀 Gif Count', account.totalGifs.toString())
  console.log('👀 Gif List', account.gifList)
}

const runMain = async() => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

runMain();