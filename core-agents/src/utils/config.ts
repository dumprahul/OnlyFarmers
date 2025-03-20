export const CONTRACT_ADDRESS = "0xBb18d4C99aB77b6986a19155690E76eECee1f186"; // Replace with your actual address
export const CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_farmHealth",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_yieldScore",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_farmAPY",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_farmerAddress",
				"type": "address"
			}
		],
		"name": "createFarm",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "farmId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "farmerAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "farmAPY",
				"type": "uint256"
			}
		],
		"name": "FarmCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "farmId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "farmHealth",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "yieldScore",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "farmAPY",
				"type": "uint256"
			}
		],
		"name": "FarmUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_farmId",
				"type": "uint256"
			}
		],
		"name": "stake",
		"outputs": [],
		"stateMutability": "payable",
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
				"name": "farmId",
				"type": "uint256"
			}
		],
		"name": "Staked",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_farmId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_farmHealth",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_yieldScore",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_farmAPY",
				"type": "uint256"
			}
		],
		"name": "updateFarm",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
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
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "penalized",
				"type": "bool"
			}
		],
		"name": "Withdrawn",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "farmCount",
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
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "farms",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "farmHealth",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "yieldScore",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "farmAPY",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "farmerAddress",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "active",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "totalStaked",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_farmId",
				"type": "uint256"
			}
		],
		"name": "getFarmInfo",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "farmHealth",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "yieldScore",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "farmAPY",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "farmerAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "farmTotalStaked",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getProtocolMetrics",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_totalStaked",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_farmerRewards",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_sustainablePool",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_farmCount",
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
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getStakeInfo",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "stakedAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "farmId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "potentialReward",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "timeStaked",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "farmAPY",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "farmerAddress",
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
		"name": "stakers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "farmId",
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
	}
];
