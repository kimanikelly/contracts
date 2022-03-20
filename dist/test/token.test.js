"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const ethereum_waffle_1 = require("ethereum-waffle");
const hardhat_1 = require("hardhat");
(0, chai_1.use)(ethereum_waffle_1.solidity);
describe("Token", function () {
    let token;
    let signers;
    let mintAmt = 100;
    beforeEach(async () => {
        // Returns the Hardhat test accounts
        signers = await hardhat_1.ethers.getSigners();
        // Returns the Token.sol contract factory
        const Token = await hardhat_1.ethers.getContractFactory("Token", signers[0]);
        // Deploys and initializes the Token.sol proxy as an upgradeable contract
        token = (await hardhat_1.upgrades.deployProxy(Token, ["Test Token", "TT"]));
    });
    describe("#initializer", () => {
        it("Should revert if the contract is already initialized", async () => {
            await (0, chai_1.expect)(token.initialize("Test Token", "TT")).to.be.revertedWith("Initializable: contract is already initialized");
        });
        it("Should emit the OwnershipTransferred emit on deployment", async () => {
            const filter = token.filters.OwnershipTransferred(null, null);
            const queryFilter = (await token.queryFilter(filter))[0];
            (0, chai_1.expect)(queryFilter.event).to.equal("OwnershipTransferred");
            (0, chai_1.expect)(queryFilter.args.previousOwner).to.equal(hardhat_1.ethers.constants.AddressZero);
            (0, chai_1.expect)(queryFilter.args.newOwner).to.equal(signers[0].address);
        });
        it("Should get the owner", async () => {
            const owner = await token.owner();
            (0, chai_1.expect)(owner).to.equal(signers[0].address);
        });
        it("Should get the name", async () => {
            const name = await token.name();
            (0, chai_1.expect)(name).to.equal("Test Token");
        });
        it("Should get the symbol", async () => {
            const symbol = await token.symbol();
            (0, chai_1.expect)(symbol).to.equal("TT");
        });
        it("Should get the decimals", async () => {
            const decimals = await token.decimals();
            (0, chai_1.expect)(decimals).to.equal(18);
        });
    });
    describe("#mint", async () => {
        beforeEach(async () => {
            await token.mint(mintAmt);
        });
        it("Should revert if not called by the owner", async () => {
            await (0, chai_1.expect)(token.connect(signers[1]).mint(mintAmt)).to.be.revertedWith("Ownable: caller is not the owner");
        });
        it("Should revert if the mint amount is 0", async () => {
            await (0, chai_1.expect)(token.mint(0)).to.be.revertedWith("'Token: Amount cannot be set to 0'");
        });
        it("Should emit the Transfer event", async () => {
            const filter = token.filters.Transfer(null, null, null);
            const queryFilter = (await token.queryFilter(filter))[0];
            (0, chai_1.expect)(queryFilter.args.from).to.equal(hardhat_1.ethers.constants.AddressZero);
            (0, chai_1.expect)(queryFilter.args.to).to.equal(token.address);
            (0, chai_1.expect)(queryFilter.args.value.toNumber()).to.equal(mintAmt);
        });
        describe("#totalSupply", () => {
            it("Should increase the totalSupply by the mint amount", async () => {
                const totalSupply = await token.totalSupply();
                (0, chai_1.expect)(totalSupply.toNumber()).to.equal(mintAmt);
            });
        });
        describe("#balanceOf", () => {
            it("Should increase the Token contract balance by the mint amount", async () => {
                const balance = await token.balanceOf(token.address);
                (0, chai_1.expect)(balance.toNumber()).to.equal(mintAmt);
            });
        });
    });
    describe("#setFundAmount", () => {
        const offChainFundAmt = hardhat_1.ethers.BigNumber.from(10000);
        it("Should revert if the caller is not the owner", async () => {
            await (0, chai_1.expect)(token.connect(signers[1]).setFundAmount(offChainFundAmt)).to.be.revertedWith("Ownable: caller is not the owner");
        });
        it("Should revert if the fund amount is 0 ", async () => {
            await (0, chai_1.expect)(token.setFundAmount(0)).to.be.revertedWith("Token: Amount cannot be set to 0");
        });
        it("Should return the fund amount as 0 before the initial set", async () => {
            const initialFundAmount = await token.fundAmount();
            (0, chai_1.expect)(initialFundAmount.toNumber()).to.equal(0);
        });
        it("Should set the fund amount", async () => {
            var _a, _b;
            await token.setFundAmount(offChainFundAmt);
            const filter = token.filters.FundAmountSet(null, null);
            const queryFilter = (await token.queryFilter(filter))[0];
            (0, chai_1.expect)(queryFilter.event).to.equal("FundAmountSet");
            (0, chai_1.expect)((_a = queryFilter.args) === null || _a === void 0 ? void 0 : _a.previousAmount.toNumber()).to.equal(0);
            (0, chai_1.expect)((_b = queryFilter.args) === null || _b === void 0 ? void 0 : _b.newAmount.toNumber()).to.equal(offChainFundAmt.toNumber());
            const onChainFundAmt = await token.fundAmount();
            (0, chai_1.expect)(onChainFundAmt.toNumber()).to.equal(offChainFundAmt.toNumber());
        });
    });
    describe("#fundAccount", async () => {
        let mintAmt = 400;
        let offChainFundAmt = 200;
        beforeEach(async () => {
            await token.mint(mintAmt);
            await token.setFundAmount(offChainFundAmt);
        });
        it("Should revert if the amount exceeds the Token balance ", async () => {
            await token.connect(signers[1]).fundAccount();
            await token.connect(signers[2]).fundAccount();
            await (0, chai_1.expect)(token.connect(signers[3]).fundAccount()).to.be.revertedWith("ERC20: transfer amount exceeds balance");
        });
        it("Should fund an account", async () => {
            const tokenPreFund = await token.balanceOf(token.address);
            (0, chai_1.expect)(tokenPreFund.toNumber()).to.equal(mintAmt);
            const accountPreFund = await token.balanceOf(signers[1].address);
            (0, chai_1.expect)(accountPreFund.toNumber()).to.equal(0);
            await token.connect(signers[1]).fundAccount();
            const filter = token.filters.Transfer(null, null, null);
            const queryFilter = await token.queryFilter(filter);
            const transferEvent = queryFilter.slice(-1);
            (0, chai_1.expect)(transferEvent[0].event).to.equal("Transfer");
            (0, chai_1.expect)(transferEvent[0].args.from).to.equal(token.address);
            (0, chai_1.expect)(transferEvent[0].args.to).to.equal(signers[1].address);
            (0, chai_1.expect)(transferEvent[0].args.value.toNumber()).to.equal(offChainFundAmt);
        });
    });
    describe("#Ownership", () => {
        it("Should revert if transferOwnership is not called by the owner", async () => {
            const prevOwner = await token.owner();
            await (0, chai_1.expect)(token.connect(signers[1]).transferOwnership(signers[1].address)).to.be.revertedWith("Ownable: caller is not the owner");
            const newOwner = await token.owner();
            (0, chai_1.expect)(prevOwner).to.equal(newOwner);
        });
        it("Should get the owner", async () => {
            const owner = await token.owner();
            (0, chai_1.expect)(owner).to.equal(signers[0].address);
        });
        it("Should transfer ownership", async () => {
            var _a, _b;
            const tx = await token.transferOwnership(signers[1].address);
            const filter = token.filters.OwnershipTransferred(null, null);
            const queryFilter = (await token.queryFilter(filter))[1];
            const owner = await token.owner();
            (0, chai_1.expect)(owner).to.equal(signers[1].address);
            (0, chai_1.expect)(queryFilter.event).to.equal("OwnershipTransferred");
            (0, chai_1.expect)((_a = queryFilter.args) === null || _a === void 0 ? void 0 : _a.previousOwner).to.equal(signers[0].address);
            (0, chai_1.expect)((_b = queryFilter.args) === null || _b === void 0 ? void 0 : _b.newOwner).to.equal(signers[1].address);
        });
    });
});
