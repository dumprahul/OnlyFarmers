import { Address } from 'viem';
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
    const publicClient = createViemPublicClient();
    const result = await publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'getProtocolMetrics',
        args: []
    }) as [bigint, bigint, bigint, bigint];

    return {
        totalStaked: result[0].toString(),
        farmerRewards: result[1].toString(),
        sustainablePool: result[2].toString(),
        farmCount: Number(result[3])
    };
}