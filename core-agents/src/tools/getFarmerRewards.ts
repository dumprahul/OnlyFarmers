import { Address, formatUnits } from 'viem';
import { createViemPublicClient } from '../viem/createViemPublicClient.js';
import { ToolConfig } from './allTools.js';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../utils/config.js';

interface GetFarmerRewardsArgs {
    contract: Address;
    abi: any[];
}

export const getFarmerRewardsTool: ToolConfig<GetFarmerRewardsArgs> = {
    definition: {
        type: 'function',
        function: {
            name: 'get_farmer_rewards',
            description: 'Fetch the farmer rewards amount in the protocol',
            parameters: {
                type: 'object',
                properties: {
                    contract: {
                        type: 'string',
                        pattern: '^0x[a-fA-F0-9]{40}$',
                        description: 'The smart contract address',
                    },
                    abi: {
                        type: 'array',
                        description: 'The ABI of the contract',
                        items: {
                            type: 'object'
                        }
                    }
                },
                required: ['contract', 'abi']
            }
        }
    },
    handler: async ({ contract, abi }) => {
        return await getFarmerRewards(contract, abi);
    }
};

export async function getFarmerRewards(
    contract: Address,
    abi: any[]
) {
    try {
        const publicClient = createViemPublicClient();
        const result = await publicClient.readContract({
            address: CONTRACT_ADDRESS,
            abi: CONTRACT_ABI,
            functionName: 'farmerRewards',
            args: []
        }) as bigint;

        console.log("Raw Farmer Rewards:", result);

        // Format value properly
        const farmerRewards = Number(result) / 1e18;

        return `I have fetched the farmer rewards amount. The details are as follows:
        - **Farmer Rewards:** ${farmerRewards} tCORE2`;
    } catch (error) {
        console.error('Error fetching farmer rewards amount:', error);
        return "Failed to retrieve farmer rewards amount. Please try again later.";
    }
}
