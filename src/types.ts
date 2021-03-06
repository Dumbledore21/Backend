export type Candy1 = {
  "version": "0.0.1",
  "name": "candy1",
  "instructions": [
    {
      "name": "mintNft",
      "accounts": [
        {
          "name": "candyMachine",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "recipient",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "nftName",
          "type": "string"
        },
        {
          "name": "nftUri",
          "type": "string"
        }
      ]
    },
    {
      "name": "initializeCandyMachine",
      "accounts": [
        {
          "name": "candyMachine",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wallet",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        },
        {
          "name": "data",
          "type": {
            "defined": "CandyMachineData"
          }
        }
      ]
    },
    {
      "name": "updateCandyMachine",
      "accounts": [
        {
          "name": "candyMachine",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "price",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "goLiveDate",
          "type": {
            "option": "i64"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "candyMachine",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "wallet",
            "type": "publicKey"
          },
          {
            "name": "data",
            "type": {
              "defined": "CandyMachineData"
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Creator",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "address",
            "type": "publicKey"
          },
          {
            "name": "verified",
            "type": "bool"
          },
          {
            "name": "share",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "CandyMachineData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "nftsMinted",
            "type": "u64"
          },
          {
            "name": "goLiveDate",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "creators",
            "type": {
              "vec": {
                "defined": "Creator"
              }
            }
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "sellerFeeBasisPoints",
            "type": "u16"
          },
          {
            "name": "maxSupply",
            "type": {
              "option": "u64"
            }
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "NotEnoughSOL",
      "msg": "You don't have enough SOL to mint this NFT"
    },
    {
      "code": 6001,
      "name": "CandyMachineNotLiveYet",
      "msg": "The launch date has not come yet"
    },
    {
      "code": 6002,
      "name": "CandyMachineEmpty",
      "msg": "There are no more NFTs to mint in this collection"
    },
    {
      "code": 6003,
      "name": "NotAuthorisedToMint",
      "msg": "Only game wallets have the authority to min"
    }
  ]
};

export const IDL: Candy1 = {
  "version": "0.0.1",
  "name": "candy1",
  "instructions": [
    {
      "name": "mintNft",
      "accounts": [
        {
          "name": "candyMachine",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "recipient",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "nftName",
          "type": "string"
        },
        {
          "name": "nftUri",
          "type": "string"
        }
      ]
    },
    {
      "name": "initializeCandyMachine",
      "accounts": [
        {
          "name": "candyMachine",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wallet",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        },
        {
          "name": "data",
          "type": {
            "defined": "CandyMachineData"
          }
        }
      ]
    },
    {
      "name": "updateCandyMachine",
      "accounts": [
        {
          "name": "candyMachine",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "price",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "goLiveDate",
          "type": {
            "option": "i64"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "candyMachine",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "wallet",
            "type": "publicKey"
          },
          {
            "name": "data",
            "type": {
              "defined": "CandyMachineData"
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Creator",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "address",
            "type": "publicKey"
          },
          {
            "name": "verified",
            "type": "bool"
          },
          {
            "name": "share",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "CandyMachineData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "nftsMinted",
            "type": "u64"
          },
          {
            "name": "goLiveDate",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "creators",
            "type": {
              "vec": {
                "defined": "Creator"
              }
            }
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "sellerFeeBasisPoints",
            "type": "u16"
          },
          {
            "name": "maxSupply",
            "type": {
              "option": "u64"
            }
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "NotEnoughSOL",
      "msg": "You don't have enough SOL to mint this NFT"
    },
    {
      "code": 6001,
      "name": "CandyMachineNotLiveYet",
      "msg": "The launch date has not come yet"
    },
    {
      "code": 6002,
      "name": "CandyMachineEmpty",
      "msg": "There are no more NFTs to mint in this collection"
    },
    {
      "code": 6003,
      "name": "NotAuthorisedToMint",
      "msg": "Only game wallets have the authority to min"
    }
  ]
};
