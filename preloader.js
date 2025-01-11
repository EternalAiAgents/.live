document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.querySelector('.preloader');
    const enterButton = document.querySelector('.enter-button');
    const loadingStatus = document.querySelector('.loading-status');
  
    // Array of loading messages
    const loadingMessages = [
      'INITIALIZING PROJECT CORE',
      'CONNECTING TO BLOCKCHAIN',
      'SYNCHRONIZING DATA STREAMS',
      'CONNECTED'
    ];
  
    // Cycle through loading messages
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      if (messageIndex >= loadingMessages.length) {
        return;
      }
      loadingStatus.textContent = loadingMessages[messageIndex % loadingMessages.length];
      messageIndex += 1;
    }, 500);
  
    // Handle enter button click
    enterButton.addEventListener('click', () => {
      clearInterval(messageInterval);
      preloader.classList.add('fade-out');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    });
  });