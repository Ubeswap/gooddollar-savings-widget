// Import the component
import { GooddollarSavingsWidget } from './index';

// Mock web3 provider
let mockWeb3Provider = null;

console.log('test-page.ts');

// Mock connect wallet function
function mockConnectWallet() {
    console.log('Connect wallet clicked!');
    alert('Connect wallet function called. In a real app, this would open wallet connection.');
}

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Get widget element
    const widget = document.getElementById('savingsWidget') as GooddollarSavingsWidget;

    if (widget) {
        // Set initial connect wallet callback
        widget.connectWallet = mockConnectWallet;

        // Update user address when input changes
        const userAddressInput = document.getElementById('userAddress') as HTMLInputElement;
        if (userAddressInput) {
            userAddressInput.addEventListener('input', function(e) {
                const target = e.target as HTMLInputElement;
                widget.userAddress = target.value;
            });
        }

        // Listen for widget events
        widget.addEventListener('stake', function(e: any) {
            console.log('Stake event:', e.detail);
        });
    }

    // Global functions for testing
    (window as any).setConnected = function() {
        mockWeb3Provider = {
            isMetaMask: true,
            request: () => Promise.resolve('0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6')
        };
        if (widget) {
            widget.web3Provider = mockWeb3Provider;
        }
        updateStatus(true);
    };

    (window as any).setDisconnected = function() {
        mockWeb3Provider = null;
        if (widget) {
            widget.web3Provider = null;
        }
        updateStatus(false);
    };

    function updateStatus(connected: boolean) {
        const statusEl = document.getElementById('status');
        if (statusEl) {
            if (connected) {
                statusEl.textContent = 'Status: Connected';
                statusEl.className = 'status connected';
            } else {
                statusEl.textContent = 'Status: Disconnected';
                statusEl.className = 'status disconnected';
            }
        }
    }

    console.log('Gooddollar Savings Widget test page loaded!');
});
