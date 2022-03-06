import * as anchor from '@project-serum/anchor';
import { Candy1 } from './types';
import { Program, web3, workspace, BN } from '@project-serum/anchor'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import {
  createAssociatedTokenAccountInstruction,
  getMetadata,
  getTokenWallet,
} from "./utils";
import { MintLayout, TOKEN_PROGRAM_ID, mintTo, createInitializeMintInstruction, createMintToInstruction} from "@solana/spl-token";

// Metaplex smart contract used by our smart contract
const TOKEN_METADATA_PROGRAM_ID = new web3.PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

// Our candy machine public key
const candyMachine = new web3.PublicKey("BbzvGi9pLvNfHdtqbXALah38WpsVyupmT6QGg65mzshW") // CHANGE, when new smart contract

// establish a new connection to the solana devnet
const rpcHost = 'https://api.devnet.solana.com'
const connection = new anchor.web3.Connection(rpcHost
  ? rpcHost
  : anchor.web3.clusterApiUrl('devnet')); 

// Wallet used for signing, set as provider wallet
const MY_WALLET = web3.Keypair.fromSecretKey(
  new Uint8Array([136,154,96,99,199,246,115,131,101,167,87,71,80,31,203,47,205,140,170,150,221,112,209,121,68,118,24,141,34,68,93,39,67,223,78,164,234,19,213,92,110,36,30,198,107,230,139,67,154,142,173,122,168,100,247,173,108,3,101,227,91,216,183,221])
)
const anchorWallet = new anchor.Wallet(MY_WALLET)
anchor.setProvider(new anchor.Provider(connection, anchorWallet, { commitment: "confirmed", preflightCommitment: "confirmed", skipPreflight: false }));

// Get interface description language
const idl = JSON.parse(
  require("fs").readFileSync("./candy1.json", "utf8")
);

// Configure the Anchor Client to use our program(smart contract)
const programAddress = new anchor.web3.PublicKey("AQbX7jg2Z8PSLp9M7eEYTzaUjJK1dfgU5gk4LQkzeMrD"); // CHANGE, when new smart contract
const program = new Program<Candy1>(idl, programAddress);
const { Keypair, SystemProgram, PublicKey, SYSVAR_RENT_PUBKEY } = web3;

export const mintNFT = async (publickey: string, mintingType: string) => {
  
  var startTime = performance.now()

  const USER_WALLET = new anchor.web3.PublicKey(publickey);

    try {
      // get contract state
      const candyMachineState = await program.account.candyMachine.fetch(
        candyMachine
      );

      const mint = web3.Keypair.generate();
      const token = await getTokenWallet(USER_WALLET, mint.publicKey);
      const metadata = await getMetadata(mint.publicKey);

      const rent =
        await connection.getMinimumBalanceForRentExemption(
          MintLayout.span
        );

      const result = await program.rpc.mintNft(
        "NFThrowdown",
        "https://arweave.net/4SQQmPBpjtIDVyYJpWwt0nMrGKowum-HWZzMJ27mUI0",
        {
          accounts: {
            candyMachine,
            wallet: candyMachineState.wallet,
            mint: mint.publicKey,
            metadata,
            mintAuthority: MY_WALLET.publicKey,
            tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
            rent: SYSVAR_RENT_PUBKEY,
            recipient: MY_WALLET.publicKey
          },
          signers: [mint, MY_WALLET],
          instructions: [
            /* create a token/mint account and pay the rent */
            SystemProgram.createAccount({
              fromPubkey: MY_WALLET.publicKey, // payer of the rent
              newAccountPubkey: mint.publicKey, // new account pubkey
              space: MintLayout.span, // amount fo space needed
              lamports: rent, // amount of lamports to transfer from payer
              programId: TOKEN_PROGRAM_ID, // program that owns the account
            }),
            createInitializeMintInstruction (
              mint.publicKey,
              0, // decimals
              MY_WALLET.publicKey, // mint authority
              MY_WALLET.publicKey, // freeze authority
              TOKEN_PROGRAM_ID
            ),
            /* create an account that will hold your NFT */
            createAssociatedTokenAccountInstruction(
              token, // associated account
              MY_WALLET.publicKey, // payer
              USER_WALLET, // wallet address (to)
              // MY_WALLET.publicKey, // wallet address (to)
              mint.publicKey // mint/token address
            ),
            /* mint 1 (and only) NFT to the mint account */
            createMintToInstruction(
              mint.publicKey, // from
              token, // account that will receive the metadata
              MY_WALLET.publicKey, // authority
              1,
              [],
              TOKEN_PROGRAM_ID
            ),
          ],
        }
      );
      console.log("Mint Transaction:", result)
      var endTime = performance.now()
      console.log(`Minting took: ${(endTime - startTime)/1000} seconds`)
    } catch (e) {
      throw e;
    }
  
   

};

module.exports = { mintNFT };
