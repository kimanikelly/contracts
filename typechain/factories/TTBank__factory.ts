/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TTBank, TTBankInterface } from "../TTBank";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "accountNumber",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "accountName",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "startingBalance",
        type: "uint256",
      },
    ],
    name: "AccountOpened",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "accountNumber",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "accountName",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "depositAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newBalance",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "accountNumber",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "accountName",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "withdrawAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newBalance",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [],
    name: "bankBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "startingBalance",
        type: "uint256",
      },
    ],
    name: "openAccount",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "contract Token",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "viewAccount",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "accountNumber",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "accountName",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "balance",
            type: "uint256",
          },
        ],
        internalType: "struct ITTBank.BankDetails",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "viewBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50611f86806100206000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c80637f96939d116100715780637f96939d146101545780638da5cb5b14610172578063b6b55f2514610190578063c4d66de8146101c0578063f2fde38b146101dc578063fc0c546a146101f8576100a9565b80631000420d146100ae57806328657aa5146100de5780632e1a7d4d146100fc5780633ff1e05b1461012c578063715018a61461014a575b600080fd5b6100c860048036038101906100c39190611425565b610216565b6040516100d5919061146d565b60405180910390f35b6100e6610507565b6040516100f39190611497565b60405180910390f35b61011660048036038101906101119190611425565b6105b9565b604051610123919061146d565b60405180910390f35b61013461083e565b6040516101419190611497565b60405180910390f35b610152610888565b005b61015c610910565b6040516101699190611544565b60405180910390f35b61017a6109d1565b604051610187919061156e565b60405180910390f35b6101aa60048036038101906101a59190611425565b6109fb565b6040516101b7919061146d565b60405180910390f35b6101da60048036038101906101d591906115b5565b610c42565b005b6101f660048036038101906101f191906115b5565b610d70565b005b610200610e68565b60405161020d9190611641565b60405180910390f35b6000816000811161025c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610253906116b9565b60405180910390fd5b606a60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16156102e9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102e090611725565b60405180910390fd5b606660000160008154809291906102ff90611774565b919050555033606660010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550826066600201819055506066606960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082015481600001556001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600282015481600201559050506001606a60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506104b8333085606560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16610e8e909392919063ffffffff16565b7f3dcb1c086601de03a591a96777a894297cadcf7af2b0416cceedff1ec49bc7c7606660000154336066600201546040516104f5939291906117bd565b60405180910390a16001915050919050565b6000606560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401610564919061156e565b60206040518083038186803b15801561057c57600080fd5b505afa158015610590573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105b49190611809565b905090565b600033606a60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16610648576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161063f90611882565b60405180910390fd5b606960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201548311156106cd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106c4906118ee565b60405180910390fd5b82606960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201600082825461071f919061190e565b925050819055506107733384606560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16610f179092919063ffffffff16565b7fb0ecf14e184effded5473bba77dcfab32b094b77ac1fbb36beec2aef55587970606960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001543385606960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206002015460405161082c9493929190611942565b60405180910390a16001915050919050565b6000606960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020154905090565b610890610f9d565b73ffffffffffffffffffffffffffffffffffffffff166108ae6109d1565b73ffffffffffffffffffffffffffffffffffffffff1614610904576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108fb906119d3565b60405180910390fd5b61090e6000610fa5565b565b6109186113b3565b606960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020604051806060016040529081600082015481526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600282015481525050905090565b6000603360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60008160008111610a41576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a38906116b9565b60405180910390fd5b33606a60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16610ace576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ac590611882565b60405180910390fd5b83606960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206002016000828254610b2091906119f3565b92505081905550610b76333086606560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16610e8e909392919063ffffffff16565b7fd36a2f67d06d285786f61a32b052b9ace6b0b7abef5177b54358abdc83a0b69b606960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001543386606960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020154604051610c2f9493929190611942565b60405180910390a1600192505050919050565b600060019054906101000a900460ff16610c6a5760008054906101000a900460ff1615610c73565b610c7261106b565b5b610cb2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ca990611abb565b60405180910390fd5b60008060019054906101000a900460ff161590508015610d02576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b81606560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610d4b61107c565b8015610d6c5760008060016101000a81548160ff0219169083151502179055505b5050565b610d78610f9d565b73ffffffffffffffffffffffffffffffffffffffff16610d966109d1565b73ffffffffffffffffffffffffffffffffffffffff1614610dec576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610de3906119d3565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610e5c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e5390611b4d565b60405180910390fd5b610e6581610fa5565b50565b606560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b610f11846323b872dd60e01b858585604051602401610eaf93929190611b6d565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506110d5565b50505050565b610f988363a9059cbb60e01b8484604051602401610f36929190611ba4565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506110d5565b505050565b600033905090565b6000603360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081603360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b60006110763061119c565b15905090565b600060019054906101000a900460ff166110cb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110c290611c3f565b60405180910390fd5b6110d36111bf565b565b6000611137826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff166112209092919063ffffffff16565b905060008151111561119757808060200190518101906111579190611c8b565b611196576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161118d90611d2a565b60405180910390fd5b5b505050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b600060019054906101000a900460ff1661120e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161120590611c3f565b60405180910390fd5b61121e611219610f9d565b610fa5565b565b606061122f8484600085611238565b90509392505050565b60608247101561127d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161127490611dbc565b60405180910390fd5b6112868561119c565b6112c5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112bc90611e28565b60405180910390fd5b6000808673ffffffffffffffffffffffffffffffffffffffff1685876040516112ee9190611ec2565b60006040518083038185875af1925050503d806000811461132b576040519150601f19603f3d011682016040523d82523d6000602084013e611330565b606091505b509150915061134082828661134c565b92505050949350505050565b6060831561135c578290506113ac565b60008351111561136f5782518084602001fd5b816040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113a39190611f2e565b60405180910390fd5b9392505050565b604051806060016040528060008152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600081525090565b600080fd5b6000819050919050565b611402816113ef565b811461140d57600080fd5b50565b60008135905061141f816113f9565b92915050565b60006020828403121561143b5761143a6113ea565b5b600061144984828501611410565b91505092915050565b60008115159050919050565b61146781611452565b82525050565b6000602082019050611482600083018461145e565b92915050565b611491816113ef565b82525050565b60006020820190506114ac6000830184611488565b92915050565b6114bb816113ef565b82525050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006114ec826114c1565b9050919050565b6114fc816114e1565b82525050565b60608201600082015161151860008501826114b2565b50602082015161152b60208501826114f3565b50604082015161153e60408501826114b2565b50505050565b60006060820190506115596000830184611502565b92915050565b611568816114e1565b82525050565b6000602082019050611583600083018461155f565b92915050565b611592816114e1565b811461159d57600080fd5b50565b6000813590506115af81611589565b92915050565b6000602082840312156115cb576115ca6113ea565b5b60006115d9848285016115a0565b91505092915050565b6000819050919050565b60006116076116026115fd846114c1565b6115e2565b6114c1565b9050919050565b6000611619826115ec565b9050919050565b600061162b8261160e565b9050919050565b61163b81611620565b82525050565b60006020820190506116566000830184611632565b92915050565b600082825260208201905092915050565b7f545442616e6b3a204465706f73697420616d6f756e7420697320300000000000600082015250565b60006116a3601b8361165c565b91506116ae8261166d565b602082019050919050565b600060208201905081810360008301526116d281611696565b9050919050565b7f545442616e6b3a204163636f756e7420616c7265616479206578697374730000600082015250565b600061170f601e8361165c565b915061171a826116d9565b602082019050919050565b6000602082019050818103600083015261173e81611702565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061177f826113ef565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156117b2576117b1611745565b5b600182019050919050565b60006060820190506117d26000830186611488565b6117df602083018561155f565b6117ec6040830184611488565b949350505050565b600081519050611803816113f9565b92915050565b60006020828403121561181f5761181e6113ea565b5b600061182d848285016117f4565b91505092915050565b7f545442616e6b3a204163636f756e7420646f6573206e6f742065786973740000600082015250565b600061186c601e8361165c565b915061187782611836565b602082019050919050565b6000602082019050818103600083015261189b8161185f565b9050919050565b7f545442616e6b3a20416d6f756e7420657863656564732062616c616e63650000600082015250565b60006118d8601e8361165c565b91506118e3826118a2565b602082019050919050565b60006020820190508181036000830152611907816118cb565b9050919050565b6000611919826113ef565b9150611924836113ef565b92508282101561193757611936611745565b5b828203905092915050565b60006080820190506119576000830187611488565b611964602083018661155f565b6119716040830185611488565b61197e6060830184611488565b95945050505050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b60006119bd60208361165c565b91506119c882611987565b602082019050919050565b600060208201905081810360008301526119ec816119b0565b9050919050565b60006119fe826113ef565b9150611a09836113ef565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115611a3e57611a3d611745565b5b828201905092915050565b7f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160008201527f647920696e697469616c697a6564000000000000000000000000000000000000602082015250565b6000611aa5602e8361165c565b9150611ab082611a49565b604082019050919050565b60006020820190508181036000830152611ad481611a98565b9050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b6000611b3760268361165c565b9150611b4282611adb565b604082019050919050565b60006020820190508181036000830152611b6681611b2a565b9050919050565b6000606082019050611b82600083018661155f565b611b8f602083018561155f565b611b9c6040830184611488565b949350505050565b6000604082019050611bb9600083018561155f565b611bc66020830184611488565b9392505050565b7f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960008201527f6e697469616c697a696e67000000000000000000000000000000000000000000602082015250565b6000611c29602b8361165c565b9150611c3482611bcd565b604082019050919050565b60006020820190508181036000830152611c5881611c1c565b9050919050565b611c6881611452565b8114611c7357600080fd5b50565b600081519050611c8581611c5f565b92915050565b600060208284031215611ca157611ca06113ea565b5b6000611caf84828501611c76565b91505092915050565b7f5361666545524332303a204552433230206f7065726174696f6e20646964206e60008201527f6f74207375636365656400000000000000000000000000000000000000000000602082015250565b6000611d14602a8361165c565b9150611d1f82611cb8565b604082019050919050565b60006020820190508181036000830152611d4381611d07565b9050919050565b7f416464726573733a20696e73756666696369656e742062616c616e636520666f60008201527f722063616c6c0000000000000000000000000000000000000000000000000000602082015250565b6000611da660268361165c565b9150611db182611d4a565b604082019050919050565b60006020820190508181036000830152611dd581611d99565b9050919050565b7f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000600082015250565b6000611e12601d8361165c565b9150611e1d82611ddc565b602082019050919050565b60006020820190508181036000830152611e4181611e05565b9050919050565b600081519050919050565b600081905092915050565b60005b83811015611e7c578082015181840152602081019050611e61565b83811115611e8b576000848401525b50505050565b6000611e9c82611e48565b611ea68185611e53565b9350611eb6818560208601611e5e565b80840191505092915050565b6000611ece8284611e91565b915081905092915050565b600081519050919050565b6000601f19601f8301169050919050565b6000611f0082611ed9565b611f0a818561165c565b9350611f1a818560208601611e5e565b611f2381611ee4565b840191505092915050565b60006020820190508181036000830152611f488184611ef5565b90509291505056fea2646970667358221220488afa4b0972c9c7d41da9aa7efc8c3292b88681fdf8b16ce6856629de0457b464736f6c63430008090033";

export class TTBank__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TTBank> {
    return super.deploy(overrides || {}) as Promise<TTBank>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): TTBank {
    return super.attach(address) as TTBank;
  }
  connect(signer: Signer): TTBank__factory {
    return super.connect(signer) as TTBank__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TTBankInterface {
    return new utils.Interface(_abi) as TTBankInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): TTBank {
    return new Contract(address, _abi, signerOrProvider) as TTBank;
  }
}