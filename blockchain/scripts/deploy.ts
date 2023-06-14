import { ethers } from "hardhat";
import fs from "fs";
async function main() {
  const contract = await ethers.deployContract("CharacterNFT");

  await contract.waitForDeployment();

  const abi = artifacts.readArtifactSync("CharacterNFT").abi;

  // Generate the TypeScript file content
  const content = `
    export const ContractABI = ${JSON.stringify(abi)} as const;
    export const ContractAddress = "${await contract.target}";
  `;
  // Write the content to the contract.ts file
  fs.writeFileSync("../frontend/src/config/contract.ts", content, "utf8");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
