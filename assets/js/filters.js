(function exposeFilters(global) {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  function populateFilters(selectedDate = new Date()) {
    const yearSelect = document.querySelector('#year-filter');
    const monthSelect = document.querySelector('#month-filter');
    yearSelect.innerHTML = '';
    monthSelect.innerHTML = '';

    for (let year = 2025; year <= 2040; year += 1) {
      yearSelect.add(new Option(String(year), String(year)));
    }

    monthNames.forEach((month, index) => {
      monthSelect.add(new Option(month, String(index + 1)));
    });

    yearSelect.value = String(selectedDate.getFullYear());
    monthSelect.value = String(selectedDate.getMonth() + 1);
  }

  function currentFilter() {
    return {
      year: Number(document.querySelector('#year-filter').value),
      month: Number(document.querySelector('#month-filter').value)
    };
  }

  function filterEntries(entries, filter = currentFilter()) {
    return entries.filter((entry) => {
      const [year, month] = entry.date.split('-').map(Number);
      return year === filter.year && month === filter.month;
    });
  }

  function bindFilterChanges(onChange) {
    document.querySelector('#year-filter').addEventListener('change', onChange);
    document.querySelector('#month-filter').addEventListener('change', onChange);
  }

  global.SKYBARFilters = { bindFilterChanges, currentFilter, filterEntries, monthNames, populateFilters };
})(window);
