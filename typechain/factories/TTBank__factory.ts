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
        internalType: "bytes32",
        name: "_accountType",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
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
        internalType: "bytes32",
        name: "_accountType",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "viewAccountByIndex",
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
  "0x608060405234801561001057600080fd5b506119bf806100206000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80639e38eab41161005b5780639e38eab414610101578063c4d66de81461011d578063f2fde38b14610139578063fc0c546a1461015557610088565b8063278f2ab81461008d5780635e4c5ceb146100a9578063715018a6146100d95780638da5cb5b146100e3575b600080fd5b6100a760048036038101906100a2919061125c565b610173565b005b6100c360048036038101906100be91906112af565b61053a565b6040516100d091906113a3565b60405180910390f35b6100e16107f9565b005b6100eb610881565b6040516100f891906113cd565b60405180910390f35b61011b600480360381019061011691906112af565b6108ab565b005b61013760048036038101906101329190611414565b610ce0565b005b610153600480360381019061014e9190611414565b610e0e565b005b61015d610f06565b60405161016a91906114a0565b60405180910390f35b827f436865636b696e670000000000000000000000000000000000000000000000008114806101c157507f536176696e67730000000000000000000000000000000000000000000000000081145b610200576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101f790611518565b60405180910390fd5b8160008111610244576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161023b90611584565b60405180910390fd5b61024c6111aa565b7f436865636b696e6700000000000000000000000000000000000000000000000086141561035d5783606a60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002086815481106102c6576102c56115a4565b5b906000526020600020906004020160030160008282546102e69190611602565b92505081905550610358606a60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208681548110610341576103406115a4565b5b906000526020600020906004020160030154610f2c565b610480565b7f536176696e67730000000000000000000000000000000000000000000000000086141561047f57606b60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002085815481106103d6576103d56115a4565b5b9060005260206000209060040201604051806080016040529081600082015481526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160028201548152602001600382015481525050905083816060018181516104779190611602565b915081815250505b5b606560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330876040518463ffffffff1660e01b81526004016104df93929190611667565b602060405180830381600087803b1580156104f957600080fd5b505af115801561050d573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061053191906116d6565b50505050505050565b6105426111aa565b827f436865636b696e6700000000000000000000000000000000000000000000000081148061059057507f536176696e67730000000000000000000000000000000000000000000000000081145b6105cf576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105c690611518565b60405180910390fd5b6105d76111aa565b7f436865636b696e670000000000000000000000000000000000000000000000008514156106e457606a60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002084815481106106505761064f6115a4565b5b9060005260206000209060040201604051806080016040529081600082015481526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016002820154815260200160038201548152505090506107ee565b7f536176696e6773000000000000000000000000000000000000000000000000008514156107ed57606b60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020848154811061075d5761075c6115a4565b5b9060005260206000209060040201604051806080016040529081600082015481526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016002820154815260200160038201548152505090505b5b809250505092915050565b610801610fc5565b73ffffffffffffffffffffffffffffffffffffffff1661081f610881565b73ffffffffffffffffffffffffffffffffffffffff1614610875576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161086c9061174f565b60405180910390fd5b61087f6000610fcd565b565b6000603360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b817f436865636b696e670000000000000000000000000000000000000000000000008114806108f957507f536176696e67730000000000000000000000000000000000000000000000000081145b610938576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161092f90611518565b60405180910390fd5b816000811161097c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161097390611584565b60405180910390fd5b606660000160008154809291906109929061176f565b919050555033606660010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555083606660020181905550826066600301819055507f436865636b696e67000000000000000000000000000000000000000000000000841415610b0d57606a60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060669080600181540180825580915050600190039060005260206000209060040201600090919091909150600082015481600001556001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060028201548160020155600382015481600301555050610c28565b7f536176696e677300000000000000000000000000000000000000000000000000841415610c2757606b60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060669080600181540180825580915050600190039060005260206000209060040201600090919091909150600082015481600001556001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600282015481600201556003820154816003015550505b5b606560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330866040518463ffffffff1660e01b8152600401610c8793929190611667565b602060405180830381600087803b158015610ca157600080fd5b505af1158015610cb5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cd991906116d6565b5050505050565b600060019054906101000a900460ff16610d085760008054906101000a900460ff1615610d11565b610d10611093565b5b610d50576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d479061182a565b60405180910390fd5b60008060019054906101000a900460ff161590508015610da0576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b81606560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610de96110a4565b8015610e0a5760008060016101000a81548160ff0219169083151502179055505b5050565b610e16610fc5565b73ffffffffffffffffffffffffffffffffffffffff16610e34610881565b73ffffffffffffffffffffffffffffffffffffffff1614610e8a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e819061174f565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610efa576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ef1906118bc565b60405180910390fd5b610f0381610fcd565b50565b606560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b610fc281604051602401610f4091906118dc565b6040516020818303038152906040527ff5b1bba9000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506110fd565b50565b600033905090565b6000603360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081603360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600061109e30611126565b15905090565b600060019054906101000a900460ff166110f3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110ea90611969565b60405180910390fd5b6110fb611149565b565b60008151905060006a636f6e736f6c652e6c6f679050602083016000808483855afa5050505050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b600060019054906101000a900460ff16611198576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161118f90611969565b60405180910390fd5b6111a86111a3610fc5565b610fcd565b565b604051806080016040528060008152602001600073ffffffffffffffffffffffffffffffffffffffff16815260200160008019168152602001600081525090565b600080fd5b6000819050919050565b611203816111f0565b811461120e57600080fd5b50565b600081359050611220816111fa565b92915050565b6000819050919050565b61123981611226565b811461124457600080fd5b50565b60008135905061125681611230565b92915050565b600080600060608486031215611275576112746111eb565b5b600061128386828701611211565b935050602061129486828701611247565b92505060406112a586828701611247565b9150509250925092565b600080604083850312156112c6576112c56111eb565b5b60006112d485828601611211565b92505060206112e585828601611247565b9150509250929050565b6112f881611226565b82525050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611329826112fe565b9050919050565b6113398161131e565b82525050565b611348816111f0565b82525050565b60808201600082015161136460008501826112ef565b5060208201516113776020850182611330565b50604082015161138a604085018261133f565b50606082015161139d60608501826112ef565b50505050565b60006080820190506113b8600083018461134e565b92915050565b6113c78161131e565b82525050565b60006020820190506113e260008301846113be565b92915050565b6113f18161131e565b81146113fc57600080fd5b50565b60008135905061140e816113e8565b92915050565b60006020828403121561142a576114296111eb565b5b6000611438848285016113ff565b91505092915050565b6000819050919050565b600061146661146161145c846112fe565b611441565b6112fe565b9050919050565b60006114788261144b565b9050919050565b600061148a8261146d565b9050919050565b61149a8161147f565b82525050565b60006020820190506114b56000830184611491565b92915050565b600082825260208201905092915050565b7f545442616e6b3a20496e76616c6964206163636f756e74207479706500000000600082015250565b6000611502601c836114bb565b915061150d826114cc565b602082019050919050565b60006020820190508181036000830152611531816114f5565b9050919050565b7f545442616e6b3a204465706f73697420616d6f756e7420697320300000000000600082015250565b600061156e601b836114bb565b915061157982611538565b602082019050919050565b6000602082019050818103600083015261159d81611561565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061160d82611226565b915061161883611226565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561164d5761164c6115d3565b5b828201905092915050565b61166181611226565b82525050565b600060608201905061167c60008301866113be565b61168960208301856113be565b6116966040830184611658565b949350505050565b60008115159050919050565b6116b38161169e565b81146116be57600080fd5b50565b6000815190506116d0816116aa565b92915050565b6000602082840312156116ec576116eb6111eb565b5b60006116fa848285016116c1565b91505092915050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b60006117396020836114bb565b915061174482611703565b602082019050919050565b600060208201905081810360008301526117688161172c565b9050919050565b600061177a82611226565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156117ad576117ac6115d3565b5b600182019050919050565b7f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160008201527f647920696e697469616c697a6564000000000000000000000000000000000000602082015250565b6000611814602e836114bb565b915061181f826117b8565b604082019050919050565b6000602082019050818103600083015261184381611807565b9050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b60006118a66026836114bb565b91506118b18261184a565b604082019050919050565b600060208201905081810360008301526118d581611899565b9050919050565b60006020820190506118f16000830184611658565b92915050565b7f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960008201527f6e697469616c697a696e67000000000000000000000000000000000000000000602082015250565b6000611953602b836114bb565b915061195e826118f7565b604082019050919050565b6000602082019050818103600083015261198281611946565b905091905056fea264697066735822122005aced688f83c4bf5f7dfa9380e22a9cf90d93538289e615c058b3c538ec167964736f6c63430008090033";

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
