import { Address, formatUnits } from 'viem';
import { createViemPublicClient } from '../viem/createViemPublicClient.js';
import { ToolConfig } from './allTools.js';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../utils/config.js';

interface GetProtocolMetricsArgs {
    contract: Address;
    abi: any[];
}

export const getProtocolMetricsTool: ToolConfig<GetProtocolMetricsArgs> = {
    definition: {
        type: 'function',
        function: {
            name: 'get_protocol_metrics',
            description: 'Fetch protocol-wide staking metrics',
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
        return await getProtocolMetrics(contract, abi);
    }
};

export async function getProtocolMetrics(
    contract: Address,
    abi: any[]
) {
    try {
        const publicClient = createViemPublicClient();
        const result = await publicClient.readContract({
            address: CONTRACT_ADDRESS,
            abi: CONTRACT_ABI,
            functionName: 'getProtocolMetrics',
            args: []
        }) as [bigint, bigint, bigint, bigint];

        console.log("Raw Protocol Metrics:", result);

        // Format values properly
        const totalStaked = Number(result[0]) / 1e18;
        const farmerRewards = Number(result[1]) / 1e18;
        const sustainablePool = Number(result[2]) / 1e18;
        const farmCount = Number(result[3]);

        return `I have fetched the protocol metrics. The details are as follows:\n
        - **Total Staked:** ${totalStaked} tCORE2\n        - **Total Rewards Distributed:** ${farmerRewards} tCORE2\n        - **Sustainable Pool:** ${sustainablePool} tCORE2\n        - **Total Farms:** ${farmCount}`;
    } catch (error) {
        console.error('Error fetching protocol metrics:', error);
        return "Failed to retrieve protocol metrics. Please try again later.";
    }
}
