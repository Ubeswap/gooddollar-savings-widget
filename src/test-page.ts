// Import the component
import { GooddollarSavingsWidget } from './index';

// Reown AppKit (vanilla JS)
import { createAppKit } from '@reown/appkit';
import { celo } from '@reown/appkit/networks';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

console.log('test-page.ts');

const projectId = '46cc09a3d487a3c2587df736300bf903'
const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: [celo]
})
const metadata = {
  name: 'AppKit',
  description: 'AppKit Example',
  url: 'https://example.com',
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

const appKit = createAppKit({
    adapters: [wagmiAdapter],
    projectId,
    networks: [celo],
    metadata,
    features: {
      analytics: false // Optional - defaults to your Cloud configuration
    }
});

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    const widget = document.getElementById('savingsWidget') as GooddollarSavingsWidget | null;

    // Provide connect handler to the widget's internal button
    if (widget) {
        widget.connectWallet = () => {
            appKit.open?.();
        };
    }

    // Subscribe to account changes to wire provider
    appKit.subscribeAccount((accountState: any) => {
        const isConnected = !!accountState?.isConnected;
        if (isConnected) {
            const provider = (appKit.getProvider as any)('eip155') || appKit.getWalletProvider();
            if (widget) widget.web3Provider = provider as any;
        } else {
            if (widget) widget.web3Provider = null;
        }
    }, 'eip155');

    console.log('Gooddollar Savings Widget test page loaded!');
});
