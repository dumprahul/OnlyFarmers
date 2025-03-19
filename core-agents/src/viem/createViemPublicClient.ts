import { createPublicClient, http } from 'viem'
import { coreTestnet } from '../chain-definitions/defChain';
export function createViemPublicClient() {
    return createPublicClient({
        chain: coreTestnet,
        transport: http(),
    });
}