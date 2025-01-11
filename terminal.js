// terminalAnimation.js

class TerminalAnimation {
    constructor() {
      this.lines = [
        "Initializing AI core systems...",
        // "Loading AI weights...",
        "Establishing chain connections...",
        "network: Online",
        "Core: Activated",
        // "Pattern recognition: Enabled",
        "AI: Ready for analysis",
      ];
      this.terminal = document.querySelector('.terminal-content');
      this.typeSpeed = 20; // Milliseconds per character
      this.lineDelay = 300; // Milliseconds between lines
      this.currentLine = 0;
      this.currentChar = 0;
      this.websocket = null;
      this.init();
    }
  
    init() {
      this.createNewLine();
    }
  
    createNewLine() {
      if (this.currentLine >= this.lines.length) {
        // All initialization lines have been typed; start WebSocket connection
        this.setupWebSocket();
        return;
      }
  
      const line = document.createElement('div');
      line.className = 'terminal-line';
  
      const prompt = document.createElement('span');
      prompt.className = 'terminal-prompt';
      prompt.textContent = '>';
  
      const text = document.createElement('span');
      text.className = 'terminal-text';
  
      line.appendChild(prompt);
      line.appendChild(text);
      this.terminal.appendChild(line);
  
      this.typeLine(text);
    }
  
    typeLine(element) {
      const currentText = this.lines[this.currentLine];
      if (this.currentChar < currentText.length) {
        element.textContent += currentText[this.currentChar];
        this.currentChar++;
        setTimeout(() => this.typeLine(element), this.typeSpeed);
        this.scrollToBottom();
      } else {
        this.currentChar = 0;
        this.currentLine++;
        setTimeout(() => this.createNewLine(), this.lineDelay);
      }
    }
  
    setupWebSocket() {
      const wsUrl = 'wss://solana-smart-rpc.xyz/ws';
      this.websocket = new WebSocket(wsUrl);
  
      this.websocket.onopen = () => {
        console.log('WebSocket connection established.');
        this.appendSystemMessage('WebSocket connection established.');
        this.subscribeToSlot(); // If subscription is needed, else remove
      };
  
      this.websocket.onmessage = (event) => {
        this.handleWebSocketMessage(event.data);
      };
  
      this.websocket.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.appendSystemMessage('WebSocket encountered an error.');
      };
  
      this.websocket.onclose = (event) => {
        console.warn(`WebSocket closed: Code=${event.code}, Reason=${event.reason}`);
        this.appendSystemMessage('WebSocket connection closed.');
        // Optionally implement reconnection logic here
        this.retryConnection();
      };
    }
  
    retryConnection() {
      const retryDelay = 5000; // 5 seconds
      this.appendSystemMessage(`Attempting to reconnect in ${retryDelay / 1000} seconds...`);
      setTimeout(() => {
        this.setupWebSocket();
      }, retryDelay);
    }
  
    subscribeToSlot() {
      // If the new WebSocket endpoint requires a subscription message, send it here.
      // If not required, you can remove this method and the call in onopen.
      const subscribeMessage = {"action": "subscribe", "channel": "blocks"};
      this.websocket.send(JSON.stringify(subscribeMessage));
      console.log('Sent subscription message.');
      // this.appendTerminalMessage('> Sent subscription request.');
    }
  
    handleWebSocketMessage(data) {
      try {
        const message = JSON.parse(data);
  
        // Check if the message contains block information
        if (message.slotNumber && message.totalTransactions !== undefined) {
          const blockStats = {
            slotNumber: message.slotNumber,
            totalTransactions: message.totalTransactions,
            swapTransactions: message.swapTransactions,
            processedTransactions: message.processedTransactions
          };
          this.displayBlockStats(blockStats);
        } else {
          // Handle other message types if necessary
          // this.appendTerminalMessage(`> Received unknown message: ${data}`);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
        this.appendSystemMessage('Error parsing incoming WebSocket message.');
      }
    }
  
    displayBlockStats(blockStats) {
      const { slotNumber, totalTransactions, swapTransactions, processedTransactions } = blockStats;
  
      // Create a formatted message
    //   const message = `Block Received:
    // Slot Number: ${slotNumber}
    // Total Transactions: ${totalTransactions}
    // Swap Transactions: ${swapTransactions}
    // Processed Transactions: ${processedTransactions}`;
      const message = `Block ${slotNumber}: total ${totalTransactions} txs, analyzed ${processedTransactions}/${swapTransactions} swaps`;
  
      this.appendTerminalMessage(message);
    }
  
    appendTerminalMessage(message) {
      const lines = message.split('\n');
      lines.forEach(lineText => {
        const line = document.createElement('div');
        line.className = 'terminal-line';
  
        const prompt = document.createElement('span');
        prompt.className = 'terminal-prompt';
        prompt.textContent = '>';
  
        const text = document.createElement('span');
        text.className = 'terminal-text';
        text.textContent = lineText;
  
        line.appendChild(prompt);
        line.appendChild(text);
        this.terminal.appendChild(line);
      });
  
      this.scrollToBottom();
    }
  
    appendSystemMessage(message) {
      return;
      const line = document.createElement('div');
      line.className = 'terminal-line system-message';
  
      const text = document.createElement('span');
      text.className = 'terminal-text';
      text.textContent = message;
  
      line.appendChild(text);
      this.terminal.appendChild(line);
  
      this.scrollToBottom();
    }
  
    scrollToBottom() {
      this.terminal.scrollTop = this.terminal.scrollHeight;
    }
  }
  
  // Start animation when document loads
  document.addEventListener('DOMContentLoaded', () => {
    new TerminalAnimation();
  });