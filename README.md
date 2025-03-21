OnlyFarmers - A DePiN based Yield Optimisation/Tokenisation on CORE with AI automation and ZK-proofs.

In this repo, Main branch has the full functional Decentralized App, built on Core.
Master branch has the AI agent files and the contracts(both test contract and main contract).

Main Branch(Steps to run the OnlyFarmers Dapp)-

## 1. Clone the Repository

```bash
https://github.com/dumprahul/core-hack-blr
```

## 2. Install the dependencies

```bash
npm install
```

if the packages gets conflicted, go for npm force installation

```bash
npm install --force
```

## 2. Run up the OnlyFarmers!

```bash
npm run dev
```

Master branch(Steps to run Running AI Agent)-

# Running the Agents

Follow these steps to set up and run the agents:

## 1. Clone the Repository

```bash
https://github.com/dumprahul/core-hack-blr/tree/master
cd core-agents
```

## 2. Create an .env file

```bash
OPENAI_API_KEY=
PRIVATE_KEY=
```

Paste your respective openai api key and your private key. Note that private key must start from 0x. (else start with 0x and paste the private key over)

## 3. Install Dependencies

```bash
npm install
```

## 4. Let's Run!

```bash
npm run start
```

