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
    inputs: [
      {
        internalType: "address",
        name: "_tokenAddress",
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
        internalType: "bytes32",
        name: "_accountType",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "_balance",
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
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "savingsAccounts",
    outputs: [
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
        internalType: "bytes32",
        name: "accountType",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    stateMutability: "view",
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
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
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
            internalType: "bytes32",
            name: "accountType",
            type: "bytes32",
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
  "0x608060405234801561001057600080fd5b50611419806100206000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c8063dcc15b621161005b578063dcc15b62146100ed578063f2fde38b14610120578063f8e88c911461013c578063fc0c546a1461016c57610088565b8063715018a61461008d5780638da5cb5b146100975780639e38eab4146100b5578063c4d66de8146100d1575b600080fd5b61009561018a565b005b61009f610212565b6040516100ac9190610c5d565b60405180910390f35b6100cf60048036038101906100ca9190610ce9565b61023c565b005b6100eb60048036038101906100e69190610d55565b610696565b005b61010760048036038101906101029190610d55565b6107c4565b6040516101179493929190610da0565b60405180910390f35b61013a60048036038101906101359190610d55565b610814565b005b61015660048036038101906101519190610de5565b61090c565b6040516101639190610e94565b60405180910390f35b6101746109f9565b6040516101819190610f0e565b60405180910390f35b610192610a1f565b73ffffffffffffffffffffffffffffffffffffffff166101b0610212565b73ffffffffffffffffffffffffffffffffffffffff1614610206576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101fd90610f86565b60405180910390fd5b6102106000610a27565b565b6000603360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b7f436865636b696e6700000000000000000000000000000000000000000000000082148061028957507f536176696e67730000000000000000000000000000000000000000000000000082145b6102c8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102bf90610ff2565b60405180910390fd5b6000811161030b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103029061105e565b60405180910390fd5b670de0b6b3a76400008161031f91906110ad565b9050606560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231336040518263ffffffff1660e01b815260040161037c9190610c5d565b60206040518083038186803b15801561039457600080fd5b505afa1580156103a8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103cc919061111c565b81111561040e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161040590611195565b60405180910390fd5b60666000016000815480929190610424906111b5565b919050555033606660010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081606660020181905550806066600301819055507f436865636b696e6700000000000000000000000000000000000000000000000082141561059f57606a60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060669080600181540180825580915050600190039060005260206000209060040201600090919091909150600082015481600001556001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060028201548160020155600382015481600301555050610692565b7f536176696e677300000000000000000000000000000000000000000000000000821415610691576066606b60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082015481600001556001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060028201548160020155600382015481600301559050505b5b5050565b600060019054906101000a900460ff166106be5760008054906101000a900460ff16156106c7565b6106c6610aed565b5b610706576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106fd90611270565b60405180910390fd5b60008060019054906101000a900460ff161590508015610756576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b81606560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061079f610afe565b80156107c05760008060016101000a81548160ff0219169083151502179055505b5050565b606b6020528060005260406000206000915090508060000154908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020154908060030154905084565b61081c610a1f565b73ffffffffffffffffffffffffffffffffffffffff1661083a610212565b73ffffffffffffffffffffffffffffffffffffffff1614610890576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161088790610f86565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610900576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108f790611302565b60405180910390fd5b61090981610a27565b50565b610914610bdb565b606a60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020828154811061096557610964611322565b5b9060005260206000209060040201604051806080016040529081600082015481526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600282015481526020016003820154815250509050919050565b606560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600033905090565b6000603360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081603360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6000610af830610b57565b15905090565b600060019054906101000a900460ff16610b4d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b44906113c3565b60405180910390fd5b610b55610b7a565b565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b600060019054906101000a900460ff16610bc9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bc0906113c3565b60405180910390fd5b610bd9610bd4610a1f565b610a27565b565b604051806080016040528060008152602001600073ffffffffffffffffffffffffffffffffffffffff16815260200160008019168152602001600081525090565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610c4782610c1c565b9050919050565b610c5781610c3c565b82525050565b6000602082019050610c726000830184610c4e565b92915050565b600080fd5b6000819050919050565b610c9081610c7d565b8114610c9b57600080fd5b50565b600081359050610cad81610c87565b92915050565b6000819050919050565b610cc681610cb3565b8114610cd157600080fd5b50565b600081359050610ce381610cbd565b92915050565b60008060408385031215610d0057610cff610c78565b5b6000610d0e85828601610c9e565b9250506020610d1f85828601610cd4565b9150509250929050565b610d3281610c3c565b8114610d3d57600080fd5b50565b600081359050610d4f81610d29565b92915050565b600060208284031215610d6b57610d6a610c78565b5b6000610d7984828501610d40565b91505092915050565b610d8b81610cb3565b82525050565b610d9a81610c7d565b82525050565b6000608082019050610db56000830187610d82565b610dc26020830186610c4e565b610dcf6040830185610d91565b610ddc6060830184610d82565b95945050505050565b600060208284031215610dfb57610dfa610c78565b5b6000610e0984828501610cd4565b91505092915050565b610e1b81610cb3565b82525050565b610e2a81610c3c565b82525050565b610e3981610c7d565b82525050565b608082016000820151610e556000850182610e12565b506020820151610e686020850182610e21565b506040820151610e7b6040850182610e30565b506060820151610e8e6060850182610e12565b50505050565b6000608082019050610ea96000830184610e3f565b92915050565b6000819050919050565b6000610ed4610ecf610eca84610c1c565b610eaf565b610c1c565b9050919050565b6000610ee682610eb9565b9050919050565b6000610ef882610edb565b9050919050565b610f0881610eed565b82525050565b6000602082019050610f236000830184610eff565b92915050565b600082825260208201905092915050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000610f70602083610f29565b9150610f7b82610f3a565b602082019050919050565b60006020820190508181036000830152610f9f81610f63565b9050919050565b7f545442616e6b3a20496e76616c6964206163636f756e74207479706500000000600082015250565b6000610fdc601c83610f29565b9150610fe782610fa6565b602082019050919050565b6000602082019050818103600083015261100b81610fcf565b9050919050565b7f545442616e6b3a204465706f73697420616d6f756e7420697320300000000000600082015250565b6000611048601b83610f29565b915061105382611012565b602082019050919050565b600060208201905081810360008301526110778161103b565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006110b882610cb3565b91506110c383610cb3565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04831182151516156110fc576110fb61107e565b5b828202905092915050565b60008151905061111681610cbd565b92915050565b60006020828403121561113257611131610c78565b5b600061114084828501611107565b91505092915050565b7f42616c616e6365206e6f74207269676874000000000000000000000000000000600082015250565b600061117f601183610f29565b915061118a82611149565b602082019050919050565b600060208201905081810360008301526111ae81611172565b9050919050565b60006111c082610cb3565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156111f3576111f261107e565b5b600182019050919050565b7f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160008201527f647920696e697469616c697a6564000000000000000000000000000000000000602082015250565b600061125a602e83610f29565b9150611265826111fe565b604082019050919050565b600060208201905081810360008301526112898161124d565b9050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b60006112ec602683610f29565b91506112f782611290565b604082019050919050565b6000602082019050818103600083015261131b816112df565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960008201527f6e697469616c697a696e67000000000000000000000000000000000000000000602082015250565b60006113ad602b83610f29565b91506113b882611351565b604082019050919050565b600060208201905081810360008301526113dc816113a0565b905091905056fea2646970667358221220128f8dffd20fdd37773f9a3e7d081167454ead164cae20249c8107f05c17dcd464736f6c63430008090033";

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
