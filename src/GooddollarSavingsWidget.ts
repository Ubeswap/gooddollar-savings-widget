import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
// import { createPublicClient, http } from 'viem'; // Uncomment and configure as needed

console.log('staking-widget.ts');

@customElement('gooddollar-savings-widget')
export class GooddollarSavingsWidget extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      max-width: 480px;
      margin: 0 auto;
    }

    .container {
      background: white;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      border: 1px solid #e5e7eb;
    }

    .header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 24px;
    }

    .logo {
      width: 40px;
      height: 40px;
      background: #d1d5db;
      border-radius: 50%;
    }

    .title {
      font-size: 24px;
      font-weight: 600;
      color: #111827;
      margin: 0;
    }

    .tab-container {
      display: flex;
      background: #f9fafb;
      border-radius: 12px;
      padding: 4px;
      margin-bottom: 16px;
      border: 1px solid #e5e7eb;
    }

    .tab {
      flex: 1;
      padding: 12px 16px;
      border: none;
      background: transparent;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      color: #6b7280;
    }

    .tab.active {
      background: #d1d5db;
      color: #111827;
    }

    .input-section {
      background: #f9fafb;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 16px;
      border: 1px solid #e5e7eb;
    }

    .balance-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      font-size: 14px;
      color: #6b7280;
    }

    .input-container {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .amount-input {
      flex: 1;
      border: none;
      background: transparent;
      font-size: 24px;
      font-weight: 600;
      color: #111827;
      outline: none;
    }

    .max-button {
      background: #d1d5db;
      border: none;
      border-radius: 8px;
      padding: 8px 16px;
      font-size: 14px;
      font-weight: 500;
      color: #374151;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .max-button:hover {
      background: #c4c9d4;
    }

    .rewards-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      padding: 0 4px;
    }

    .rewards-label {
      font-size: 16px;
      color: #374151;
    }

    .rewards-value {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .claim-button {
      background: none;
      border: none;
      color: #111827;
      font-size: 16px;
      font-weight: 600;
      text-decoration: underline;
      cursor: pointer;
      padding: 0;
    }

    .main-button {
      width: 100%;
      background: #d1d5db;
      border: none;
      border-radius: 12px;
      padding: 16px;
      font-size: 18px;
      font-weight: 600;
      color: #374151;
      cursor: pointer;
      margin-bottom: 24px;
      transition: background-color 0.2s ease;
    }

    .main-button:hover {
      background: #c4c9d4;
    }

    .main-button.primary {
      background: #3b82f6;
      color: white;
    }

    .main-button.primary:hover {
      background: #2563eb;
    }

    .stats-section {
      background: #f9fafb;
      border-radius: 12px;
      padding: 20px;
      border: 1px solid #e5e7eb;
    }

    .stats-title {
      font-size: 18px;
      font-weight: 600;
      color: #111827;
      margin: 0 0 16px 0;
    }

    .stat-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      border-bottom: 1px solid #e5e7eb;
    }

    .stat-row:last-child {
      border-bottom: none;
    }

    .stat-label {
      font-size: 14px;
      color: #6b7280;
    }

    .stat-value {
      font-size: 14px;
      font-weight: 600;
      color: #111827;
    }

    .hidden {
      display: none;
    }
  `
  @property({ type: Object })
  web3Provider: any = null;

  @property({ type: Function })
  connectWallet: (() => void) | undefined = undefined;

  @state()
  activeTab: string = 'stake';

  @state()
  stakeAmount: string = '0.0';

  @state()
  walletBalance: number = 1500000;

  @state()
  currentStake: number = 1200000;

  @state()
  unclaimedRewards: number = 1200000;

  @state()
  totalStaked: number = 12000000;

  @state()
  userStakeShare: number = 1200000;

  @state()
  weeklyRewards: number = 1200000;

  @state()
  annualAPR: number = 5;


  render() {
    const isConnected = !!this.web3Provider;
    return html`
      <div class="container">
        <div class="header">
          <div class="logo"></div>
          <h1 class="title">Gooddollar Savings</h1>
        </div>

        <div class="tab-container">
          <button
            class="tab ${this.activeTab === "stake" ? "active" : ""}"
            @click=${() => this.handleTabClick("stake")}
          >
            Stake
          </button>
          <button
            class="tab ${this.activeTab === "unstake" ? "active" : ""}"
            @click=${() => this.handleTabClick("unstake")}
          >
            Unstake
          </button>
        </div>

        <div class="input-section">
          <div class="balance-info ${!isConnected ? "hidden" : ""}">
            <span>
              ${
                this.activeTab === "stake"
                  ? `Wallet Balance: ${this.formatNumber(this.walletBalance)}`
                  : `Current Stake: ${this.formatNumber(this.currentStake)}`
              }
            </span>
          </div>
          <div class="input-container">
            <input
              type="text"
              class="amount-input"
              .value=${this.stakeAmount}
              @input=${this.handleInputChange}
              placeholder="0.0"
            />
            <button class="max-button" @click=${this.handleMaxClick}>Max</button>
          </div>
        </div>

        <div class="rewards-section ${!isConnected ? "hidden" : ""}">
          <span class="rewards-label">Unclaimed Rewards</span>
          <div class="rewards-value">
            <button class="claim-button" @click=${this.handleClaim}>
              Claim
            </button>
            <span>${this.formatNumber(this.unclaimedRewards)}</span>
          </div>
        </div>

        ${
          !isConnected
            ? html`
          <button class="main-button primary" @click=${this.handleConnectWallet}>
            Connect Wallet
          </button>
        `
            : html`
          <button
            class="main-button"
            @click=${this.activeTab === "stake" ? this.handleStake : this.handleUnstake}
          >
            ${this.activeTab === "stake" ? "Stake" : "Unstake"}
          </button>
        `
        }

        <div class="stats-section">
          <h3 class="stats-title">Staking Statistics</h3>

          <div class="stat-row">
            <span class="stat-label">Total G$ Staked</span>
            <span class="stat-value">${this.formatNumber(this.totalStaked)}</span>
          </div>

          ${
            isConnected
              ? html`
            <div class="stat-row">
              <span class="stat-label">Your G$ Stake Pool Share</span>
              <span class="stat-value">${this.formatNumber(this.userStakeShare)}</span>
            </div>

            <div class="stat-row">
              <span class="stat-label">Your Weekly Rewards</span>
              <span class="stat-value">${this.formatNumber(this.weeklyRewards)}</span>
            </div>
          `
              : ""
          }

          <div class="stat-row">
            <span class="stat-label">Annual Stake APR</span>
            <span class="stat-value">${this.annualAPR}%</span>
          </div>
        </div>
      </div>
    `;
  }

  formatNumber(num: number) {
    return new Intl.NumberFormat().format(num)
  }

  handleTabClick(tab: string) {
    this.activeTab = tab
  }

  handleMaxClick() {
    if (this.activeTab === "stake") {
      this.stakeAmount = this.walletBalance.toString()
    } else {
      this.stakeAmount = this.currentStake.toString()
    }
  }

  handleInputChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.stakeAmount = input.value;
  }

  handleConnectWallet() {
    if (this.connectWallet) {
      this.connectWallet();
    }
  }

  handleStake() {
    console.log("Staking:", this.stakeAmount)
  }

  handleUnstake() {
    console.log("Unstaking:", this.stakeAmount)
  }

  handleClaim() {
    console.log("Claiming rewards:", this.unclaimedRewards)
  }
}
