# Web3 Dashboard — Next.js + RainbowKit + Ethers

A minimal Web3 dashboard demo using Next.js (App Router), TypeScript, Tailwind CSS, Ethers.js and RainbowKit / wagmi.

## What it includes

- Connect wallet (MetaMask / WalletConnect via RainbowKit).
- Show wallet address, network, ETH balance.
- Read & write to a simple `MessageBoard` smart contract:
  ```solidity
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;

  contract MessageBoard {
      string public message = "Hello Blockchain";

      function setMessage(string memory _msg) public {
          message = _msg;
      }
  }
# -Kakushin
