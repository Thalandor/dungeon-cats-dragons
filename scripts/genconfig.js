const fs = require('fs');

// Read the CharacterNFT.json file
const json = fs.readFileSync('../blockchain/build/contracts/CharacterNFT.json', 'utf8');
const data = JSON.parse(json);

// Extract the abi and address values
const abi = data.abi;
const address = data.networks['5777'].address;

// Create the contract.ts file
const content = `export const ContractABI = ${JSON.stringify(abi)} as const;
export const ContractAddress = "${address}";`;

// Write the content to the contract.ts file
fs.writeFileSync('../frontend/src/config/contract.ts', content, 'utf8');

console.log('Contract file generated successfully.');
