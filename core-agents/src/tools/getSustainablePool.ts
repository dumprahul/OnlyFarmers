import { Address, formatUnits } from 'viem';
import { createViemPublicClient } from '../viem/createViemPublicClient.js';
import { ToolConfig } from './allTools.js';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../utils/config.js';

interface GetSustainablePoolArgs {
    contract: Address;
    abi: any[];
}

export const getSustainablePoolTool: ToolConfig<GetSustainablePoolArgs> = {
    definition: {
        type: 'function',
        function: {
            name: 'get_sustainable_pool',
            description: 'Fetch the sustainable pool amount in the protocol',
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
        return await getSustainablePool(contract, abi);
    }
};

export async function getSustainablePool(
    contract: Address,
    abi: any[]
) {
    try {
        const publicClient = createViemPublicClient();
        const result = await publicClient.readContract({
            address: CONTRACT_ADDRESS,
            abi: CONTRACT_ABI,
            functionName: 'sustainablePool',
            args: []
        }) as bigint;

        console.log("Raw Sustainable Pool:", result);

        // Format value properly
        const sustainablePool = Number(result) / 1e18;

        return `I have fetched the sustainable pool amount. The details are as follows:
        - **Sustainable Pool:** ${sustainablePool} tCORE2`;
    } catch (error) {
        console.error('Error fetching sustainable pool amount:', error);
        return "Failed to retrieve sustainable pool amount. Please try again later.";
    }
}