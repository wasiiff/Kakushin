# **Web3 Dashboard (Kakushin)**

A minimal and opinionated Web3 dashboard built with **Next.js**, **TypeScript**, **Tailwind CSS**, **RainbowKit**, **wagmi**, and **Ethers.js**.

This project demonstrates wallet connectivity, real-time on-chain data reading, and smart contract interaction through a simple **MessageBoard** contract.

🌐 **Live Demo:** [https://kakushin-pied.vercel.app/](https://kakushin-pied.vercel.app/)

---

## 🧭 **Overview**

**Purpose:**
A compact Web3 dashboard that showcases wallet connections, token listings, and contract interactions — perfect as a base for larger decentralized applications.

**Tech Stack:**

* **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS
* **Web3:** RainbowKit, wagmi, Ethers.js, viem
* **State & Data:** React Query
* **Other:** ESLint, PostCSS, TypeScript tooling

---

## ⚙️ **Features**

* 🔗 Wallet connection (MetaMask, WalletConnect, etc.) via RainbowKit
* 💳 Display wallet address, ETH balance, and network info
* 💠 Token List component with mock API data (`pages/api/tokens.ts`)
* 📝 Read and write messages to an on-chain **MessageBoard** contract
* ⚡ Lightweight, modular component architecture for easy customization

---

## 🧩 **Project Structure**

```
app/
 ┣ components/
 ┃ ┣ Header.tsx            # Navigation + RainbowKit ConnectButton
 ┃ ┣ MessageBoard.tsx      # Read/write contract message
 ┃ ┣ Providers.tsx         # wagmi, RainbowKit, React Query providers
 ┃ ┣ TokenList.tsx         # Example token list UI
 ┃ ┗ WalletInfo.tsx        # Wallet address, balance, network display
 ┣ globals.css             # Global Tailwind styles
 ┣ layout.tsx              # App shell
 ┗ page.tsx                # Dashboard homepage
lib/
 ┗ contract.ts             # Contract ABI, address, read/write helpers
pages/
 ┗ api/tokens.ts           # Mock API endpoint returning token data
public/                    # Static assets
```

---

## 💬 **Smart Contract Example**

This project interacts with a simple **MessageBoard** contract deployed on **Sepolia Testnet**:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MessageBoard {
    string public message = "Hello Blockchain";

    function setMessage(string memory _msg) public {
        message = _msg;
    }
}
```

* The dashboard reads the `message` variable
* Connected users can call `setMessage()` to update it

---

## 🧾 **Environment Variables**

Create a `.env` file in your project root:

```env
NEXT_PUBLIC_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
NEXT_PUBLIC_MESSAGE_CONTRACT_ADDRESS=0x2fBa4a8454536E545B08B0195bad4dE6499F70aa
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=a01e2cedd4c97c5d82b82f6aa4c8c222
```

💡 **Tip:**
For improved reliability, consider using an Infura or Alchemy RPC endpoint.

* Infura: [https://infura.io](https://infura.io)
* Alchemy: [https://alchemy.com](https://alchemy.com)

**Example:**

```env
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
```

---

## 🚀 **Getting Started**

### **Prerequisites**

* Node.js **v18+**
* A wallet such as **MetaMask** (for signing transactions)

### **Setup Steps**

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/kakushin.git
cd kakushin

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) and connect your wallet using the top-right Connect button.

---

## 🧪 **Testing & Quality**

* **Lint:** `npm run lint`
* **Type check:** `tsc --noEmit`

⚙️ Consider adding **Vitest + React Testing Library** for component-level testing.

---

## 🧰 **Available Scripts**

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run ESLin
```
