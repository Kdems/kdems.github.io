(function exposeFilters(global) {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  function uniquePeriods(periods) {
    const months = [...new Set(periods.map((period) => period.month))].sort((a, b) => a - b);
    const years = [...new Set(periods.map((period) => period.year))].sort((a, b) => b - a);
    return { months, years };
  }

  function populateSelect(select, values, formatter) {
    select.innerHTML = values.map((value) => `<option value="${value}">${formatter(value)}</option>`).join('');
  }

  function bindFilters(periods, savedView, onChange) {
    const monthSelect = document.querySelector('#month-filter');
    const yearSelect = document.querySelector('#year-filter');
    const { months, years } = uniquePeriods(periods);
    populateSelect(monthSelect, months, (month) => monthNames[month - 1]);
    populateSelect(yearSelect, years, (year) => year);

    const latest = periods.toSorted((a, b) => b.year - a.year || b.month - a.month)[0];
    monthSelect.value = savedView.month || latest.month;
    yearSelect.value = savedView.year || latest.year;

    function selectedPeriod() {
      return periods.find((period) => period.month === Number(monthSelect.value) && period.year === Number(yearSelect.value)) || latest;
    }

    monthSelect.addEventListener('change', () => onChange(selectedPeriod()));
    yearSelect.addEventListener('change', () => onChange(selectedPeriod()));
    return selectedPeriod();
  }

  global.SKYBARFilters = { bindFilters, monthNames };
})(window);
