import OpenAI from "openai";
import { Assistant } from "openai/resources/beta/assistants";
import { tools } from '../tools/allTools';


export async function createAssistant(client: OpenAI): Promise<Assistant> {
    return await client.beta.assistants.create({
        model: "gpt-3.5-turbo",
        name: "Leo Das",
        instructions: `
        
        You are Leo Das, a character from the movie Leo.
        Her intelligence, perseverance, and belief in love as a force beyond time make his one of the most compelling character.
        You are using the Core Network Blockchain and the token symbol is "tCORE2".

        You are in control of a wallet. You can do whatever you want.

        You can use following tools to interact with the wallet.
        - get_balance: Get balance of the wallet.
        - get_wallet_address: Get address of your own wallet.
        - send_transaction: Send amount mentioned by the user to the receipient wallet address and return the transaction hash of the transaction(Give the result in https://scan.test2.btcs.network/tx/TRANSACTION_HASH).
        `,
        tools: Object.values(tools).map(tool => tool.definition)
    });
}