# CAMP Network Integration Guide

## Overview

Paideia is now integrated with CAMP Network's Origin SDK, enabling Web3 authentication, social account linking, and on-chain reputation tracking for users.

## Features

- **🔐 Web3 Authentication**: Users can connect with MetaMask, WalletConnect, and other EIP-6963 compatible wallets
- **🔗 Social Linking**: Connect Twitter, Spotify, and TikTok accounts to build on-chain reputation
- **🏆 Achievement NFTs**: Mint IPNFTs when completing milestones (coming soon)
- **📊 On-chain Reputation**: Track user achievements on the blockchain (coming soon)

## Setup Instructions

### 1. Get Your CAMP Client ID

To use the CAMP Network Origin SDK, you need a client ID:

1. Join the [CAMP Network Discord](https://discord.com/invite/campnetwork)
2. Request a client ID from the team
3. You'll receive a client ID for development and production environments

### 2. Configure Environment Variables

Create a `.env.local` file in the `frontend` directory (or update your existing `.env` file):

```bash
# Supabase Configuration (existing)
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# CAMP Network Configuration
VITE_CAMP_CLIENT_ID=your-camp-client-id-here
VITE_CAMP_ENVIRONMENT=DEVELOPMENT  # or PRODUCTION
VITE_CAMP_REDIRECT_URI=http://localhost:8080

# Optional: WalletConnect Project ID for mobile wallet support
VITE_WALLETCONNECT_PROJECT_ID=your-walletconnect-project-id
```

**Important Notes:**

- `DEVELOPMENT` environment uses **Basecamp Testnet**
- `PRODUCTION` environment uses **Camp Mainnet**
- Never commit `.env.local` to version control

### 3. Get Testnet Tokens

For testing on Basecamp Testnet:

1. Visit the [Basecamp Faucet](https://faucet.campnetwork.xyz/)
2. Enter your wallet address
3. Request test tokens

### 4. Run the Application

```bash
cd frontend
npm install  # If you haven't already
npm run dev
```

The app will run at `http://localhost:8080`

## How It Works

### Authentication Flow

1. **Traditional Auth (Supabase)**:

   - Users can sign up/login with email and password
   - Managed by Supabase Auth

2. **Web3 Auth (CAMP Network)**:

   - Users click "Connect Wallet" button
   - Select their wallet provider (MetaMask, WalletConnect, etc.)
   - Sign a message to authenticate
   - Session is managed by Origin SDK

3. **Hybrid Approach**:
   - Users can use either method
   - Both authentication states are tracked
   - Future: Link Web3 wallet to existing email account

### Components

#### `CampAuthButton`

Location: `src/components/camp/CampAuthButton.tsx`

A smart button that:

- Shows "Connect Wallet" when not authenticated
- Shows "My Origin" when authenticated
- Displays loading state during connection
- Opens the Origin modal when clicked (if authenticated)

Usage:

```tsx
import { CampAuthButton } from "@/components/camp/CampAuthButton";

<CampAuthButton variant="outline" size="lg" className="w-full" />;
```

#### `CampModalWrapper`

Location: `src/components/camp/CampModalWrapper.tsx`

Wraps the CAMP Network modal for programmatic control.

Usage:

```tsx
import { CampModalWrapper } from "@/components/camp/CampModalWrapper";

<CampModalWrapper />;
```

#### `SocialLinking`

Location: `src/components/camp/SocialLinking.tsx`

Allows users to link/unlink social accounts:

- Twitter
- Spotify
- TikTok

Usage:

```tsx
import { SocialLinking } from "@/components/camp/SocialLinking";

<SocialLinking />;
```

### Hooks Available

The Origin SDK provides several React hooks:

```tsx
import {
  useAuth, // Get Auth instance
  useAuthState, // Get authentication state
  useConnect, // Connect/disconnect functions
  useModal, // Control modal state
  useSocials, // Get linked social accounts
  useLinkSocials, // Link/unlink social accounts
  useProvider, // Get/set wallet provider
  useProviders, // Get available wallet providers
} from "@campnetwork/origin/react";
```

## Testing

### 1. Test Wallet Connection

1. Navigate to `/auth/login` or `/auth/signup`
2. Click "Connect Wallet"
3. Select your wallet provider
4. Sign the authentication message
5. Verify you're redirected to the dashboard

### 2. Test Social Linking

1. Connect your wallet
2. Navigate to `/profile` (coming soon)
3. Click "Link" next to Twitter/Spotify
4. Complete OAuth flow
5. Verify account shows as "Connected"

### 3. View Transactions

All blockchain transactions can be viewed on:

- **Testnet**: [Basecamp Testnet Explorer](https://camp.cloud.blockscout.com/)
- **Mainnet**: [Camp Mainnet Explorer](https://camp.cloud.blockscout.com/)

## Network Information

### Basecamp Testnet

- **Chain ID**: TBD (check [docs](https://docs.campnetwork.xyz/building-on-camp/network-information))
- **RPC URL**: TBD
- **Explorer**: https://camp.cloud.blockscout.com/
- **Faucet**: https://faucet.campnetwork.xyz/

### Camp Mainnet

- **Chain ID**: TBD
- **RPC URL**: TBD
- **Explorer**: https://camp.cloud.blockscout.com/
- **USDC Token**: `0x977fdEF62CE095Ae8750Fd3496730F24F60dea7a`

## Troubleshooting

### "Client ID not found" Error

**Problem**: The app can't find your CAMP client ID.

**Solution**:

1. Ensure `.env.local` file exists in the `frontend` directory
2. Verify `VITE_CAMP_CLIENT_ID` is set correctly
3. Restart the dev server (`npm run dev`)

### Wallet Not Connecting

**Problem**: Wallet connection fails or hangs.

**Solution**:

1. Ensure your wallet extension is installed and unlocked
2. Try refreshing the page
3. Check browser console for errors
4. Try a different wallet provider

### Social Linking Fails

**Problem**: OAuth flow fails when linking social accounts.

**Solution**:

1. Ensure `VITE_CAMP_REDIRECT_URI` matches your current URL
2. Check that you're authenticated with CAMP first
3. Try again after clearing browser cache

### Transactions Not Appearing

**Problem**: Blockchain transactions don't show up.

**Solution**:

1. Verify you're on the correct network (Testnet vs Mainnet)
2. Check the block explorer with your wallet address
3. Ensure you have enough gas tokens

## Next Steps

### Planned Features

1. **Profile Integration**:

   - Display connected wallet address
   - Show linked social accounts
   - View on-chain reputation score

2. **Achievement NFTs**:

   - Mint IPNFTs for completing assessments
   - Mint IPNFTs for finishing courses
   - Mint IPNFTs for program acceptances
   - Display NFT gallery in profile

3. **USDC Integration**:

   - Accept USDC payments for premium features
   - Reward users with USDC for achievements

4. **Reputation System**:
   - Calculate on-chain reputation score
   - Display reputation badges
   - Unlock features based on reputation

## Resources

- **CAMP Developer Docs**: https://docs.campnetwork.xyz
- **Origin SDK GitHub**: https://github.com/campaign-layer/origin-sdk
- **CAMP Discord**: https://discord.com/invite/campnetwork
- **Basecamp Faucet**: https://faucet.campnetwork.xyz/
- **Block Explorer**: https://camp.cloud.blockscout.com/

## Support

For issues or questions:

1. Check this documentation first
2. Search the [Origin SDK GitHub Issues](https://github.com/campaign-layer/origin-sdk/issues)
3. Ask in the [CAMP Discord](https://discord.com/invite/campnetwork)
4. Contact the Paideia development team

---

**Built with ❤️ for Africa's next generation of leaders, powered by CAMP Network**
