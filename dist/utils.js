"use strict";
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
exports.parsePrice = exports.getTokenWallet = exports.getMetadata = exports.createAssociatedTokenAccountInstruction = exports.TOKEN_METADATA_PROGRAM_ID = exports.SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = void 0;
const anchor_1 = require("@project-serum/anchor");
const spl_token_1 = require("@solana/spl-token");
const web3_js_1 = require("@solana/web3.js");
exports.SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new anchor_1.web3.PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL");
/* metaplex program */
exports.TOKEN_METADATA_PROGRAM_ID = new anchor_1.web3.PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");
const createAssociatedTokenAccountInstruction = (associatedTokenAddress, payer, walletAddress, splTokenMintAddress) => {
    const keys = [
        { pubkey: payer, isSigner: true, isWritable: true },
        { pubkey: associatedTokenAddress, isSigner: false, isWritable: true },
        { pubkey: walletAddress, isSigner: false, isWritable: false },
        { pubkey: splTokenMintAddress, isSigner: false, isWritable: false },
        {
            pubkey: anchor_1.web3.SystemProgram.programId,
            isSigner: false,
            isWritable: false,
        },
        { pubkey: spl_token_1.TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
        {
            pubkey: anchor_1.web3.SYSVAR_RENT_PUBKEY,
            isSigner: false,
            isWritable: false,
        },
    ];
    return new anchor_1.web3.TransactionInstruction({
        keys,
        programId: exports.SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
        data: Buffer.from([]),
    });
};
exports.createAssociatedTokenAccountInstruction = createAssociatedTokenAccountInstruction;
const getMetadata = (mint) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield anchor_1.web3.PublicKey.findProgramAddress([
        Buffer.from('metadata'),
        exports.TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
    ], exports.TOKEN_METADATA_PROGRAM_ID))[0];
});
exports.getMetadata = getMetadata;
const getTokenWallet = (wallet, mint) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield anchor_1.web3.PublicKey.findProgramAddress([wallet.toBuffer(), spl_token_1.TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()], exports.SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID))[0];
});
exports.getTokenWallet = getTokenWallet;
function parsePrice(price, mantissa = web3_js_1.LAMPORTS_PER_SOL) {
    return Math.ceil(price * mantissa);
}
exports.parsePrice = parsePrice;
/* your personal wallet. the program will mint NFTs to this address */
