import { Address, formatUnits } from 'viem';
import { createViemPublicClient } from '../viem/createViemPublicClient.js';
import { ToolConfig } from './allTools.js';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../utils/config.js';

interface GetTotalStakedArgs {
    contract: Address;
    abi: any[];
}

export const getTotalStakedTool: ToolConfig<GetTotalStakedArgs> = {
    definition: {
        type: 'function',
        function: {
            name: 'get_total_staked',
            description: 'Fetch the total staked amount in the protocol',
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
        return await getTotalStaked(contract, abi);
    }
};

export async function getTotalStaked(
    contract: Address,
    abi: any[]
) {
    try {
        const publicClient = createViemPublicClient();
        const result = await publicClient.readContract({
            address: CONTRACT_ADDRESS,
            abi: CONTRACT_ABI,
            functionName: 'totalStaked',
            args: []
        }) as bigint;

        console.log("Raw Total Staked:", result);

        // Format value properly
        const totalStaked = Number(result) / 1e18;

        return `I have fetched the total staked amount. The details are as follows:
        - **Total Staked:** ${totalStaked} tCORE2`;
    } catch (error) {
        console.error('Error fetching total staked amount:', error);
        return "Failed to retrieve total staked amount. Please try again later.";
    }
}