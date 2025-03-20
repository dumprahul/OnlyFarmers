import { Address, formatUnits } from 'viem';
import { createViemPublicClient } from '../viem/createViemPublicClient.js';
import { ToolConfig } from './allTools.js';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../utils/config.js';

interface GetStakeInfoArgs {
    userAddress: Address;
}

export const getStakeInfoTool: ToolConfig<GetStakeInfoArgs> = {
    definition: {
        type: 'function',
        function: {
            name: 'get_stake_info',
            description: 'Fetch stake information for a given wallet address',
            parameters: {
                type: 'object',
                properties: {
                    userAddress: {
                        type: 'string',
                        pattern: '^0x[a-fA-F0-9]{40}$',
                        description: 'The wallet address of the user',
                    }
                },
                required: ['userAddress']
            }
        }
    },
    handler: async ({ userAddress }) => {
        return await getStakeInfo(userAddress);
    }
};

export async function getStakeInfo(userAddress: Address) {
    try {
        const publicClient = createViemPublicClient();
        const result = await publicClient.readContract({
            address: CONTRACT_ADDRESS,
            abi: CONTRACT_ABI,
            functionName: 'getStakeInfo',
            args: [userAddress]
        }) as [bigint, bigint, bigint, bigint, bigint, Address];

        console.log("Raw Contract Response:", result);

        // Convert BigInt values properly
        const stakedAmount = Number(result[0]) / 1e18;  // Convert to human-readable format
        const potentialReward = Number(result[2]) / 1e18; 
        const timeStaked = Number(result[3]);  // Already in seconds
        const farmAPY = Number(result[4]);
        const farmerAddress = result[5];

        // Check if stake exists
        if (BigInt(result[0]) === 0n) {
            return "You have no active stake.";
        }

        // Return formatted stake information
        return `I have fetched the stake information for your wallet. The details are as follows:
        - **Total Staked:** ${stakedAmount} tCORE2
        - **Potential Reward:** ${potentialReward} tCORE2
        - **Time Staked:** ${timeStaked} seconds
        - **Farm APY:** ${farmAPY}%
        - **Farmer Address:** ${farmerAddress}`;
    } catch (error) {
        console.error('Error fetching stake info:', error);
        return "Failed to retrieve stake information. Please try again later.";
    }
}

