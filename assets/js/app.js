(function bootSkybarFinance(global) {
  let entries = [];

  async function loadSeedEntries() {
    const response = await fetch('data/finance-data.json');
    if (!response.ok) throw new Error(`Finance data request failed: ${response.status}`);
    const data = await response.json();
    return Array.isArray(data.entries) ? data.entries.map(global.SKYBARCalculations.normalizeEntry) : [];
  }

  function filteredEntries() {
    return global.SKYBARFilters.filterEntries(entries);
  }

  function refreshDashboard() {
    global.SKYBARDashboard.render(filteredEntries());
  }

  function syncEntries(nextEntries) {
    entries = nextEntries;
    refreshDashboard();
  }

  function setFiltersForLatestEntry() {
    const latest = entries.slice().sort((a, b) => b.date.localeCompare(a.date))[0];
    if (!latest) return;
    const [year, month] = latest.date.split('-').map(Number);
    document.querySelector('#year-filter').value = String(year);
    document.querySelector('#month-filter').value = String(month);
  }

  function saveEntry(event) {
    event.preventDefault();
    const entry = global.SKYBARDashboard.readForm();
    const editingDate = document.querySelector('#editing-date').value;
    const result = editingDate
      ? global.SKYBARStorage.updateEntry(entries, editingDate, entry)
      : global.SKYBARStorage.createEntry(entries, entry);

    if (!result.ok) {
      global.SKYBARDashboard.setMessage(result.error, 'negative');
      return;
    }

    syncEntries(result.entries);
    document.querySelector('#year-filter').value = entry.date.slice(0, 4);
    document.querySelector('#month-filter').value = String(Number(entry.date.slice(5, 7)));
    refreshDashboard();
    global.SKYBARDashboard.resetForm();
    global.SKYBARDashboard.setMessage('Entry saved and dashboard recalculated.', 'positive');
  }

  function handleTableClick(event) {
    const button = event.target.closest('button[data-action]');
    if (!button) return;

    const date = button.dataset.date;
    const action = button.dataset.action;

    if (action === 'edit') {
      const entry = entries.find((item) => item.date === date);
      if (entry) global.SKYBARDashboard.fillForm(entry);
      return;
    }

    if (action === 'delete') {
      syncEntries(global.SKYBARStorage.deleteEntry(entries, date));
      global.SKYBARDashboard.resetForm();
      global.SKYBARDashboard.setMessage(`Deleted entry for ${date}.`, 'warning');
    }
  }

  function bindEvents() {
    document.querySelector('#entry-form').addEventListener('submit', saveEntry);
    document.querySelector('#reset-form').addEventListener('click', global.SKYBARDashboard.resetForm);
    document.querySelector('#entries-table-body').addEventListener('click', handleTableClick);
    global.SKYBARFilters.bindFilterChanges(refreshDashboard);
  }

  async function initDashboard() {
    global.SKYBARFilters.populateFilters(new Date());
    const storedEntries = global.SKYBARStorage.loadEntries();
    entries = storedEntries === null ? global.SKYBARStorage.persist(await loadSeedEntries()) : storedEntries;
    setFiltersForLatestEntry();
    bindEvents();
    refreshDashboard();
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (document.body.dataset.page !== 'dashboard') return;
    initDashboard().catch((error) => {
      console.error(error);
      global.SKYBARDashboard.setMessage('Dashboard failed to initialize. Confirm the preview server can load data/finance-data.json.', 'negative');
    });
  });
})(window);
