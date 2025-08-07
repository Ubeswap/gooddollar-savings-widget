import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
// import { createPublicClient, http } from 'viem'; // Uncomment and configure as needed

@customElement('gooddollar-savings-widget')
export class GooddollarSavingsWidget extends LitElement {
  static styles = css`
    :host {
      display: block;
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 1rem;
      max-width: 400px;
      font-family: Arial, sans-serif;
      background: #fafbfc;
    }
    h2 {
      margin-top: 0;
      color: #2d3748;
    }
    button {
      background: #4f46e5;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 0.5rem 1rem;
      cursor: pointer;
      font-size: 1rem;
    }
    button:disabled {
      background: #a0aec0;
      cursor: not-allowed;
    }
  `;

  @property({ type: String })
  accessor userAddress: string = '';

  @property({ type: Object })
  accessor web3Provider: any = null;

  @property({ type: Function })
  accessor connectWallet: (() => void) | undefined = undefined;

  @state()
  accessor stakingAmount: number = 0;

  render() {
    const isConnected = !!this.web3Provider;
    return html`
      <h2>Gooddollar Savings Widget</h2>
      <div>
        <label>
          Amount to stake:
          <input type="number" .value=${this.stakingAmount} @input=${this.onAmountInput} min="0" />
        </label>
      </div>
      <div style="margin-top: 1rem;">
        <button
          @click=${isConnected ? this.stake : this.handleConnectWallet}
          ?disabled=${!isConnected && !this.connectWallet}
        >
          ${isConnected ? 'Stake' : 'Connect Wallet'}
        </button>
      </div>
    `;
  }

  private onAmountInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.stakingAmount = Number(input.value);
  }

  private async stake() {
    // TODO: Integrate with viem for staking logic
    alert(`Staking ${this.stakingAmount} tokens!`);
  }

  private handleConnectWallet() {
    if (this.connectWallet) {
      this.connectWallet();
    }
  }
}