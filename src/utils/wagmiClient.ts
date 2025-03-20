// utils/wagmiClient.ts
import { createConfig, http } from 'wagmi'
import { createPublicClient } from 'viem'
import { defineChain } from "viem";
import { injected } from 'wagmi/connectors'


export const coreTestnet = /*#__PURE__*/ defineChain({
    id: 1114,
    name: 'Core Blockchain Testnet2',
    nativeCurrency: {
      decimals: 18,
      name: 'Core',
      symbol: 'tCORE2',
    },
    rpcUrls: {
      default: { http: ['https://rpc.test2.btcs.network'] },
    },
    blockExplorers: {
      default: {
        name: 'Core Blockchain Testnet2',
        url: 'https://scan.test2.btcs.network',
      },
    }
});


export const config = createConfig({
  chains: [coreTestnet],
  connectors: [
    injected()
  ],
  transports: {
    [coreTestnet.id]: http(coreTestnet.rpcUrls.default.http[0]),
  },
})

export const publicClient = createPublicClient({
  chain: coreTestnet,
  transport: http()
})