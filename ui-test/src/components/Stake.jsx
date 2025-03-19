
import { useState } from "react";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x188B3753455D723D49e7B260125bE30B65B94B01"; // Your contract address
const CONTRACT_ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "penaltyAmount",
				"type": "uint256"
			}
		],
		"name": "PenaltyApplied",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "yieldPercentage",
				"type": "uint256"
			}
		],
		"name": "stake",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "yieldPercentage",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			}
		],
		"name": "Staked",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "reward",
				"type": "uint256"
			}
		],
		"name": "Withdrawn",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "yieldPercentage",
				"type": "uint256"
			}
		],
		"name": "calculateAPY",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "EARLY_WITHDRAWAL_PENALTY",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "EPOCH_DURATION",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "FARMER_ADDRESS",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "farmerRewards",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "fineBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "stakes",
		"outputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "yieldPercentage",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "startTime",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "active",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "SUSTAINABLE_POOL_ADDRESS",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "sustainablePool",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalStaked",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "viewStake",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "user",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "yieldPercentage",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "startTime",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "active",
						"type": "bool"
					}
				],
				"internalType": "struct FarmStaking.StakeInfo",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const coreDaoTestnet2 = {
  chainId: "0x45A", // 1114 in hex
  chainName: "Core Blockchain Testnet2",
  nativeCurrency: { name: "TCORE2", symbol: "tCore2", decimals: 18 },
  rpcUrls: ["https://rpc.test2.btcs.network/"],
  blockExplorerUrls: ["https://scan.test2.btcs.network/"],
};

const { ethereum } = window;

export default function Stake() {
  const [amount, setAmount] = useState("");
  const [yieldPercentage, setYieldPercentage] = useState("");
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask");
      return;
    }

    try {
      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      const network = await web3Provider.getNetwork();

      if (network.chainId !== 1114) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [coreDaoTestnet2],
        });
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });
      const web3Signer = await web3Provider.getSigner();
      const web3Contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, web3Signer);

      setProvider(web3Provider);
      setSigner(web3Signer);
      setContract(web3Contract);
      alert("Connected to Core Blockchain Testnet2!");
    } catch (error) {
      console.error("Wallet connection failed", error);
    }
  };

  const stakeTokens = async () => {
    if (!contract) {
      alert("Please connect wallet first");
      return;
    }

    try {
      const tx = await contract.Stake(ethers.parseEther(amount), yieldPercentage, {
        value: ethers.parseEther(amount)
      });
      await tx.wait();
      alert("Staking Successful!");
    } catch (error) {
      console.error("Staking failed", error);
    }
  };

  const withdrawTokens = async () => {
    if (!contract) {
      alert("Please connect wallet first");
      return;
    }

    try {
      const tx = await contract.Withdraw();
      await tx.wait();
      alert("Withdrawal Successful!");
    } catch (error) {
      console.error("Withdrawal failed", error);
    }
  };

  return (
    <div className="p-5 w-full max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Stake Your Tokens</h2>
      <button
        onClick={connectWallet}
        className="bg-black text-white px-4 py-2 rounded mb-4"
      >
        Connect Wallet
      </button>
      <div>
        <input
          type="text"
          placeholder="Amount to Stake"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          placeholder="Yield Percentage"
          value={yieldPercentage}
          onChange={(e) => setYieldPercentage(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          onClick={stakeTokens}
          className="bg-green-600 text-white px-4 py-2 rounded w-full mb-2"
        >
          Stake
        </button>
        <button
          onClick={withdrawTokens}
          className="bg-red-600 text-white px-4 py-2 rounded w-full"
        >
          Withdraw
        </button>
      </div>
    </div>
  );
}
