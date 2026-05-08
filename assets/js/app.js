(function bootSkybarFinance(global) {
  async function loadFinanceData() {
    const response = await fetch('data/finance-data.json');
    if (!response.ok) throw new Error(`Finance data request failed: ${response.status}`);
    return response.json();
  }

  function enableViewPersistence(getCurrentPeriod) {
    const saveButton = document.querySelector('#save-view');
    saveButton.addEventListener('click', () => {
      const currentPeriod = getCurrentPeriod();
      global.SKYBARStorage.saveView({ month: currentPeriod.month, year: currentPeriod.year });
      saveButton.textContent = 'View saved';
      window.setTimeout(() => { saveButton.textContent = 'Save view'; }, 1800);
    });
  }

  async function initDashboard() {
    const data = await loadFinanceData();
    let currentPeriod;
    const savedView = global.SKYBARStorage.loadView();
    currentPeriod = global.SKYBARFilters.bindFilters(data.periods, savedView, (period) => {
      currentPeriod = period;
      global.SKYBARDashboard.render(period);
    });
    global.SKYBARDashboard.render(currentPeriod);
    enableViewPersistence(() => currentPeriod);
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (document.body.dataset.page === 'dashboard') {
      initDashboard().catch((error) => {
        console.error(error);
        document.querySelector('#performance-alerts').innerHTML = '<div class="alert">Finance data could not be loaded. Confirm the local preview server is running.</div>';
      });
    }
  });
})(window);
