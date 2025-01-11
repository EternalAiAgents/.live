// js/main.js
document.addEventListener('DOMContentLoaded', () => {
    // Replace all [data-app-name] elements with the short name (APP_NAME)
    const appNameEls = document.querySelectorAll('[data-app-name]');
    appNameEls.forEach(el => {
      el.textContent = APP_NAME;
    });
  
    // Replace all [data-app-full-name] elements with the full name (APP_FULL_NAME)
    const appFullNameEls = document.querySelectorAll('[data-app-full-name]');
    appFullNameEls.forEach(el => {
      el.textContent = APP_FULL_NAME;
    });
  
    // Set the X.com link
    const twitterLinkEl = document.querySelector('[data-project-twitter-link]');
    if (twitterLinkEl && PROJECT_TWITTER_LINK) {
      twitterLinkEl.href = PROJECT_TWITTER_LINK;
    }
  
    const githubLinkEl = document.querySelector('[data-project-github-link]');
    if (githubLinkEl && PROJECT_GITBOOK_LINK) {
      githubLinkEl.href = PROJECT_GITBOOK_LINK;
    }
  
    // Show/hide the Contract Address section
    const contractAddressSection = document.getElementById('contract-address-section');
    if (CONTRACT_ADDRESS && CONTRACT_ADDRESS.trim() !== '') {
      // Fill in the CA text
      const contractAddressEl = document.querySelector('[data-contract-address]');
      contractAddressEl.textContent = CONTRACT_ADDRESS;
  
      // Show section
      contractAddressSection.style.display = 'block';
  
      // â€œOpen on pump.funâ€ button
      const openPumpFunButton = contractAddressSection.querySelector('[data-open-pump-fun]');
      openPumpFunButton.addEventListener('click', () => {
        window.open(`https://pump.fun/coin/${CONTRACT_ADDRESS}`, '_blank');
      });
    } else {
      // Hide section if there's no contract address
      contractAddressSection.style.display = 'none';
    }
  
    const openOnPumpFunHeaderButton = document.querySelector('[data-open-pump-fun-header]');
    if (openOnPumpFunHeaderButton && CONTRACT_ADDRESS && CONTRACT_ADDRESS.trim() !== '') {
      openOnPumpFunHeaderButton.style.display = 'block';
      openOnPumpFunHeaderButton.addEventListener('click', () => {
        window.open(`https://pump.fun/coin/${CONTRACT_ADDRESS}`, '_blank');
      })
    } else {
      openOnPumpFunHeaderButton.style.display = 'none';
    }
  
    const openTelegramHeaderButton = document.querySelector('[data-open-telegram-header]');
    if (openTelegramHeaderButton && PROJECT_TELEGRAM_LINK && PROJECT_TELEGRAM_LINK.trim() !== '') {
      openTelegramHeaderButton.style.display = 'block';
      openTelegramHeaderButton.href = PROJECT_TELEGRAM_LINK;
    } else {
      openTelegramHeaderButton.style.display
    }
  
  });