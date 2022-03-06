"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mintNFT = void 0;
const anchor = __importStar(require("@project-serum/anchor"));
const anchor_1 = require("@project-serum/anchor");
const utils_1 = require("./utils");
const spl_token_1 = require("@solana/spl-token");
// Metaplex smart contract used by our smart contract
const TOKEN_METADATA_PROGRAM_ID = new anchor_1.web3.PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");
// Our candy machine public key
const candyMachine = new anchor_1.web3.PublicKey("BbzvGi9pLvNfHdtqbXALah38WpsVyupmT6QGg65mzshW"); // CHANGE, when new smart contract
// establish a new connection to the solana devnet
const rpcHost = 'https://api.devnet.solana.com';
const connection = new anchor.web3.Connection(rpcHost
    ? rpcHost
    : anchor.web3.clusterApiUrl('devnet'));
// Wallet used for signing, set as provider wallet
const MY_WALLET = anchor_1.web3.Keypair.fromSecretKey(new Uint8Array([136, 154, 96, 99, 199, 246, 115, 131, 101, 167, 87, 71, 80, 31, 203, 47, 205, 140, 170, 150, 221, 112, 209, 121, 68, 118, 24, 141, 34, 68, 93, 39, 67, 223, 78, 164, 234, 19, 213, 92, 110, 36, 30, 198, 107, 230, 139, 67, 154, 142, 173, 122, 168, 100, 247, 173, 108, 3, 101, 227, 91, 216, 183, 221]));
const anchorWallet = new anchor.Wallet(MY_WALLET);
anchor.setProvider(new anchor.Provider(connection, anchorWallet, { commitment: "confirmed", preflightCommitment: "confirmed", skipPreflight: false }));
// Get interface description language
const idl = JSON.parse(require("fs").readFileSync("./candy1.json", "utf8"));
// Configure the Anchor Client to use our program(smart contract)
const programAddress = new anchor.web3.PublicKey("AQbX7jg2Z8PSLp9M7eEYTzaUjJK1dfgU5gk4LQkzeMrD"); // CHANGE, when new smart contract
const program = new anchor_1.Program(idl, programAddress);
const { Keypair, SystemProgram, PublicKey, SYSVAR_RENT_PUBKEY } = anchor_1.web3;
const mintNFT = (publickey, mintingType) => __awaiter(void 0, void 0, void 0, function* () {
    var startTime = performance.now();
    const USER_WALLET = new anchor.web3.PublicKey(publickey);
    try {
        // get contract state
        const candyMachineState = yield program.account.candyMachine.fetch(candyMachine);
        const mint = anchor_1.web3.Keypair.generate();
        const token = yield (0, utils_1.getTokenWallet)(USER_WALLET, mint.publicKey);
        const metadata = yield (0, utils_1.getMetadata)(mint.publicKey);
        const rent = yield connection.getMinimumBalanceForRentExemption(spl_token_1.MintLayout.span);
        const result = yield program.rpc.mintNft("NFThrowdown", "https://arweave.net/4SQQmPBpjtIDVyYJpWwt0nMrGKowum-HWZzMJ27mUI0", {
            accounts: {
                candyMachine,
                wallet: candyMachineState.wallet,
                mint: mint.publicKey,
                metadata,
                mintAuthority: MY_WALLET.publicKey,
                tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
                tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
                systemProgram: SystemProgram.programId,
                rent: SYSVAR_RENT_PUBKEY,
                recipient: MY_WALLET.publicKey
            },
            signers: [mint, MY_WALLET],
            instructions: [
                /* create a token/mint account and pay the rent */
                SystemProgram.createAccount({
                    fromPubkey: MY_WALLET.publicKey,
                    newAccountPubkey: mint.publicKey,
                    space: spl_token_1.MintLayout.span,
                    lamports: rent,
                    programId: spl_token_1.TOKEN_PROGRAM_ID, // program that owns the account
                }),
                (0, spl_token_1.createInitializeMintInstruction)(mint.publicKey, 0, // decimals
                MY_WALLET.publicKey, // mint authority
                MY_WALLET.publicKey, // freeze authority
                spl_token_1.TOKEN_PROGRAM_ID),
                /* create an account that will hold your NFT */
                (0, utils_1.createAssociatedTokenAccountInstruction)(token, // associated account
                MY_WALLET.publicKey, // payer
                USER_WALLET, // wallet address (to)
                // MY_WALLET.publicKey, // wallet address (to)
                mint.publicKey // mint/token address
                ),
                /* mint 1 (and only) NFT to the mint account */
                (0, spl_token_1.createMintToInstruction)(mint.publicKey, // from
                token, // account that will receive the metadata
                MY_WALLET.publicKey, // authority
                1, [], spl_token_1.TOKEN_PROGRAM_ID),
            ],
        });
        console.log("Mint Transaction:", result);
        var endTime = performance.now();
        console.log(`Minting took: ${(endTime - startTime) / 1000} seconds`);
    }
    catch (e) {
        throw e;
    }
});
exports.mintNFT = mintNFT;
module.exports = { mintNFT: exports.mintNFT };
