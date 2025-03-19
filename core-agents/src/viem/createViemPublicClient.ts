import { createPublicClient, http } from 'viem'
import { coreTestnet } from '../chain-definitions/coretestnet';
export function createViemPublicClient() {
    return createPublicClient({
        chain: coreTestnet,
        transport: http(),
    });
}