import { getBalanceTool } from './getBalance';
import { getFarmerRewardsTool } from './getFarmerRewards';
import { getProtocolMetricsTool } from './getProtocolMetrics';
import { getStakeInfoTool } from './getStakeInfo';
import { getSustainablePoolTool } from './getSustainablePool';
import { getTotalStakedTool } from './getTotalStake';
import { getWalletAddressTool } from './getWalletAddress';
import { sendTransactionTool } from './sendTransaction';

export interface ToolConfig<T = any> {
    definition: {
        type: 'function';
        function: {
            name: string;
            description: string;
            parameters: {
                type: 'object';
                properties: Record<string, unknown>;
                required: string[];
            };
        };
    };
    handler: (args: T) => Promise<any>;
}

export const tools: Record<string, ToolConfig> = {
    get_balance: getBalanceTool,
    get_wallet_address: getWalletAddressTool,
    send_transaction: sendTransactionTool, 
    get_stake_info: getStakeInfoTool,
    get_protocol_metrics: getProtocolMetricsTool,
    get_total_staked: getTotalStakedTool,
    get_sustainable_pool: getSustainablePoolTool,
    get_farmer_rewards:getFarmerRewardsTool
};
