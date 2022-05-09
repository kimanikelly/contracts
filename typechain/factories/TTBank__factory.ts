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
        name: "balance",
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
        name: "amount",
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
    outputs: [],
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
        name: "balance",
        type: "uint256",
      },
    ],
    name: "openAccount",
    outputs: [],
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
        internalType: "struct TTBank.BankDetails",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506119a9806100206000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c80638da5cb5b116100665780638da5cb5b146100fa578063b6b55f2514610118578063c4d66de814610134578063f2fde38b14610150578063fc0c546a1461016c57610093565b80631000420d1461009857806328657aa5146100b4578063715018a6146100d25780637f96939d146100dc575b600080fd5b6100b260048036038101906100ad9190610fa7565b61018a565b005b6100bc6103e6565b6040516100c99190610fe3565b60405180910390f35b6100da610498565b005b6100e4610520565b6040516100f19190611090565b60405180910390f35b6101026105e1565b60405161010f91906110ba565b60405180910390f35b610132600480360381019061012d9190610fa7565b61060b565b005b61014e60048036038101906101499190611101565b61084a565b005b61016a60048036038101906101659190611101565b610978565b005b610174610a70565b604051610181919061118d565b60405180910390f35b80600081116101ce576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101c590611205565b60405180910390fd5b606660000160008154809291906101e490611254565b919050555033606660010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550816066600201819055506066606960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082015481600001556001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600282015481600201559050506001606a60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555061039d333084606560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16610a96909392919063ffffffff16565b7f3dcb1c086601de03a591a96777a894297cadcf7af2b0416cceedff1ec49bc7c7606660000154336066600201546040516103da9392919061129d565b60405180910390a15050565b6000606560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b815260040161044391906110ba565b60206040518083038186803b15801561045b57600080fd5b505afa15801561046f573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061049391906112e9565b905090565b6104a0610b1f565b73ffffffffffffffffffffffffffffffffffffffff166104be6105e1565b73ffffffffffffffffffffffffffffffffffffffff1614610514576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161050b90611362565b60405180910390fd5b61051e6000610b27565b565b610528610f35565b606960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020604051806060016040529081600082015481526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600282015481525050905090565b6000603360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b806000811161064f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161064690611205565b60405180910390fd5b33606a60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff166106dc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106d3906113ce565b60405180910390fd5b82606960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201600082825461072e91906113ee565b92505081905550610784333085606560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16610a96909392919063ffffffff16565b7fd36a2f67d06d285786f61a32b052b9ace6b0b7abef5177b54358abdc83a0b69b606960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001543385606960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206002015460405161083d9493929190611444565b60405180910390a1505050565b600060019054906101000a900460ff166108725760008054906101000a900460ff161561087b565b61087a610bed565b5b6108ba576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108b1906114fb565b60405180910390fd5b60008060019054906101000a900460ff16159050801561090a576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b81606560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610953610bfe565b80156109745760008060016101000a81548160ff0219169083151502179055505b5050565b610980610b1f565b73ffffffffffffffffffffffffffffffffffffffff1661099e6105e1565b73ffffffffffffffffffffffffffffffffffffffff16146109f4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109eb90611362565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610a64576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a5b9061158d565b60405180910390fd5b610a6d81610b27565b50565b606560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b610b19846323b872dd60e01b858585604051602401610ab7939291906115ad565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050610c57565b50505050565b600033905090565b6000603360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081603360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6000610bf830610d1e565b15905090565b600060019054906101000a900460ff16610c4d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c4490611656565b60405180910390fd5b610c55610d41565b565b6000610cb9826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff16610da29092919063ffffffff16565b9050600081511115610d195780806020019051810190610cd991906116ae565b610d18576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d0f9061174d565b60405180910390fd5b5b505050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b600060019054906101000a900460ff16610d90576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d8790611656565b60405180910390fd5b610da0610d9b610b1f565b610b27565b565b6060610db18484600085610dba565b90509392505050565b606082471015610dff576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610df6906117df565b60405180910390fd5b610e0885610d1e565b610e47576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e3e9061184b565b60405180910390fd5b6000808673ffffffffffffffffffffffffffffffffffffffff168587604051610e7091906118e5565b60006040518083038185875af1925050503d8060008114610ead576040519150601f19603f3d011682016040523d82523d6000602084013e610eb2565b606091505b5091509150610ec2828286610ece565b92505050949350505050565b60608315610ede57829050610f2e565b600083511115610ef15782518084602001fd5b816040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f259190611951565b60405180910390fd5b9392505050565b604051806060016040528060008152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600081525090565b600080fd5b6000819050919050565b610f8481610f71565b8114610f8f57600080fd5b50565b600081359050610fa181610f7b565b92915050565b600060208284031215610fbd57610fbc610f6c565b5b6000610fcb84828501610f92565b91505092915050565b610fdd81610f71565b82525050565b6000602082019050610ff86000830184610fd4565b92915050565b61100781610f71565b82525050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006110388261100d565b9050919050565b6110488161102d565b82525050565b6060820160008201516110646000850182610ffe565b506020820151611077602085018261103f565b50604082015161108a6040850182610ffe565b50505050565b60006060820190506110a5600083018461104e565b92915050565b6110b48161102d565b82525050565b60006020820190506110cf60008301846110ab565b92915050565b6110de8161102d565b81146110e957600080fd5b50565b6000813590506110fb816110d5565b92915050565b60006020828403121561111757611116610f6c565b5b6000611125848285016110ec565b91505092915050565b6000819050919050565b600061115361114e6111498461100d565b61112e565b61100d565b9050919050565b600061116582611138565b9050919050565b60006111778261115a565b9050919050565b6111878161116c565b82525050565b60006020820190506111a2600083018461117e565b92915050565b600082825260208201905092915050565b7f545442616e6b3a204465706f73697420616d6f756e7420697320300000000000600082015250565b60006111ef601b836111a8565b91506111fa826111b9565b602082019050919050565b6000602082019050818103600083015261121e816111e2565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061125f82610f71565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82141561129257611291611225565b5b600182019050919050565b60006060820190506112b26000830186610fd4565b6112bf60208301856110ab565b6112cc6040830184610fd4565b949350505050565b6000815190506112e381610f7b565b92915050565b6000602082840312156112ff576112fe610f6c565b5b600061130d848285016112d4565b91505092915050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b600061134c6020836111a8565b915061135782611316565b602082019050919050565b6000602082019050818103600083015261137b8161133f565b9050919050565b7f545442616e6b3a204163636f756e7420646f6573206e6f742065786973740000600082015250565b60006113b8601e836111a8565b91506113c382611382565b602082019050919050565b600060208201905081810360008301526113e7816113ab565b9050919050565b60006113f982610f71565b915061140483610f71565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561143957611438611225565b5b828201905092915050565b60006080820190506114596000830187610fd4565b61146660208301866110ab565b6114736040830185610fd4565b6114806060830184610fd4565b95945050505050565b7f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160008201527f647920696e697469616c697a6564000000000000000000000000000000000000602082015250565b60006114e5602e836111a8565b91506114f082611489565b604082019050919050565b60006020820190508181036000830152611514816114d8565b9050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b60006115776026836111a8565b91506115828261151b565b604082019050919050565b600060208201905081810360008301526115a68161156a565b9050919050565b60006060820190506115c260008301866110ab565b6115cf60208301856110ab565b6115dc6040830184610fd4565b949350505050565b7f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960008201527f6e697469616c697a696e67000000000000000000000000000000000000000000602082015250565b6000611640602b836111a8565b915061164b826115e4565b604082019050919050565b6000602082019050818103600083015261166f81611633565b9050919050565b60008115159050919050565b61168b81611676565b811461169657600080fd5b50565b6000815190506116a881611682565b92915050565b6000602082840312156116c4576116c3610f6c565b5b60006116d284828501611699565b91505092915050565b7f5361666545524332303a204552433230206f7065726174696f6e20646964206e60008201527f6f74207375636365656400000000000000000000000000000000000000000000602082015250565b6000611737602a836111a8565b9150611742826116db565b604082019050919050565b600060208201905081810360008301526117668161172a565b9050919050565b7f416464726573733a20696e73756666696369656e742062616c616e636520666f60008201527f722063616c6c0000000000000000000000000000000000000000000000000000602082015250565b60006117c96026836111a8565b91506117d48261176d565b604082019050919050565b600060208201905081810360008301526117f8816117bc565b9050919050565b7f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000600082015250565b6000611835601d836111a8565b9150611840826117ff565b602082019050919050565b6000602082019050818103600083015261186481611828565b9050919050565b600081519050919050565b600081905092915050565b60005b8381101561189f578082015181840152602081019050611884565b838111156118ae576000848401525b50505050565b60006118bf8261186b565b6118c98185611876565b93506118d9818560208601611881565b80840191505092915050565b60006118f182846118b4565b915081905092915050565b600081519050919050565b6000601f19601f8301169050919050565b6000611923826118fc565b61192d81856111a8565b935061193d818560208601611881565b61194681611907565b840191505092915050565b6000602082019050818103600083015261196b8184611918565b90509291505056fea2646970667358221220f0cbfb26e9dd75e2987281ec6585eb8a60dc724b9185a753f35253f42c25ea9564736f6c63430008090033";

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
