(function exposeDashboard(global) {
  const calc = global.SKYBARCalculations;

  function signedMoney(value) {
    const rounded = calc.round(value);
    return `${rounded > 0 ? '+' : ''}${calc.formatMoney(rounded)}`;
  }

  function toneForValue(value) {
    if (value > 0) return 'positive';
    if (value < 0) return 'negative';
    return '';
  }

  function kpiCard(label, value, detail = '', tone = '') {
    return `<article class="kpi-card"><span>${label}</span><strong>${value}</strong><small class="${tone}">${detail}</small></article>`;
  }

  function renderKpis(entries) {
    const summary = calc.summarize(entries);
    document.querySelector('#kpi-grid').innerHTML = [
      kpiCard('Daily Revenue', calc.formatMoney(summary.dailyRevenue), 'Latest filtered entry'),
      kpiCard('MTD Revenue', calc.formatMoney(summary.mtdRevenue), `${summary.count} saved entr${summary.count === 1 ? 'y' : 'ies'}`),
      kpiCard('Food Revenue', calc.formatMoney(summary.foodRevenue), 'Filtered period'),
      kpiCard('Beverage Revenue', calc.formatMoney(summary.beverageRevenue), 'Filtered period'),
      kpiCard('Food Cost %', calc.formatPercent(summary.foodCostPercent), 'Food cost / food revenue'),
      kpiCard('Beverage Cost %', calc.formatPercent(summary.beverageCostPercent), 'Beverage cost / beverage revenue'),
      kpiCard('Fixed Cost %', calc.formatPercent(summary.fixedCostPercent), 'Fixed cost / total revenue'),
      kpiCard('GOP', calc.formatMoney(summary.gop), 'Revenue less total cost', toneForValue(summary.gop)),
      kpiCard('Budget Variance', signedMoney(summary.budgetVariance), 'Revenue less daily budget', toneForValue(summary.budgetVariance))
    ].join('');
  }

  function renderTable(entries) {
    const body = document.querySelector('#entries-table-body');
    document.querySelector('#entry-count').textContent = `${entries.length} entr${entries.length === 1 ? 'y' : 'ies'}`;

    if (!entries.length) {
      body.innerHTML = '<tr><td class="empty-state" colspan="6">No finance entries for the selected period.</td></tr>';
      return;
    }

    body.innerHTML = entries
      .slice()
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((entry) => {
        const gop = calc.gop(entry);
        return `
          <tr>
            <td>${entry.date}</td>
            <td>${calc.formatMoney(calc.totalRevenue(entry))}</td>
            <td>${calc.formatMoney(calc.totalCost(entry))}</td>
            <td class="${toneForValue(gop)}">${calc.formatMoney(gop)}</td>
            <td><button class="button small" type="button" data-action="edit" data-date="${entry.date}">Edit</button></td>
            <td><button class="button small danger" type="button" data-action="delete" data-date="${entry.date}">Delete</button></td>
          </tr>
        `;
      }).join('');
  }

  function render(entries) {
    renderKpis(entries);
    renderTable(entries);
  }

  function setMessage(message, tone = '') {
    const target = document.querySelector('#form-message');
    target.textContent = message;
    target.className = `form-message ${tone}`.trim();
  }

  function fillForm(entry) {
    document.querySelector('#editing-date').value = entry.date;
    document.querySelector('#entry-date').value = entry.date;
    document.querySelector('#food-revenue').value = entry.foodRevenue;
    document.querySelector('#beverage-revenue').value = entry.beverageRevenue;
    document.querySelector('#food-cost').value = entry.foodCost;
    document.querySelector('#beverage-cost').value = entry.beverageCost;
    document.querySelector('#fixed-cost').value = entry.fixedCost;
    document.querySelector('#daily-budget').value = entry.dailyBudget;
    document.querySelector('#form-mode').textContent = `Editing ${entry.date}`;
    setMessage('Editing existing entry. Save to update this date.', 'warning');
  }

  function readForm() {
    return calc.normalizeEntry({
      date: document.querySelector('#entry-date').value,
      foodRevenue: document.querySelector('#food-revenue').value,
      beverageRevenue: document.querySelector('#beverage-revenue').value,
      foodCost: document.querySelector('#food-cost').value,
      beverageCost: document.querySelector('#beverage-cost').value,
      fixedCost: document.querySelector('#fixed-cost').value,
      dailyBudget: document.querySelector('#daily-budget').value
    });
  }

  function resetForm() {
    document.querySelector('#entry-form').reset();
    document.querySelector('#editing-date').value = '';
    document.querySelector('#form-mode').textContent = 'New entry';
    setMessage('');
  }

  global.SKYBARDashboard = { fillForm, readForm, render, resetForm, setMessage };
})(window);
