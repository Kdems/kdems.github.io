(function exposeDashboard(global) {
  const calc = global.SKYBARCalculations;

  function kpi(label, value, detail, tone = '') {
    return `<article class="kpi-card"><span>${label}</span><strong>${value}</strong><small class="${tone}">${detail}</small></article>`;
  }

  function renderKpis(period) {
    const margin = calc.margin(period);
    const prime = calc.primeCost(period);
    const salesVariance = calc.pct(period.netSales - period.salesTarget, period.salesTarget);
    document.querySelector('#kpi-grid').innerHTML = [
      kpi('Net sales', calc.money.format(period.netSales), `${salesVariance >= 0 ? '+' : ''}${salesVariance.toFixed(1)}% vs target`, salesVariance >= 0 ? 'positive' : 'negative'),
      kpi('Operating profit', calc.money.format(margin.profit), `${margin.rate.toFixed(1)}% operating margin`, margin.rate >= 15 ? 'positive' : 'warning'),
      kpi('Prime cost', `${prime.rate.toFixed(1)}%`, calc.money.format(prime.total), prime.rate <= 65 ? 'positive' : 'negative'),
      kpi('Covers', calc.number.format(period.covers), `${calc.money.format(calc.averageCheck(period))} average check`, 'positive')
    ].join('');
  }

  function renderRevenue(period) {
    const max = Math.max(...period.channels.map((channel) => channel.sales));
    document.querySelector('#revenue-chart').innerHTML = period.channels.map((channel) => `
      <div class="bar-row">
        <strong>${channel.name}</strong>
        <div class="bar-track"><div class="bar-fill" style="width:${calc.pct(channel.sales, max)}%"></div></div>
        <span>${calc.money.format(channel.sales)}</span>
      </div>
    `).join('');
    document.querySelector('#check-average-badge').textContent = `Avg check ${calc.money.format(calc.averageCheck(period))}`;
  }

  function renderPrimeCost(period) {
    const prime = calc.primeCost(period);
    const gauge = document.querySelector('#prime-cost-gauge');
    gauge.style.setProperty('--gauge', `${Math.min(prime.rate, 100) * 3.6}deg`);
    gauge.querySelector('.gauge-value').textContent = `${prime.rate.toFixed(1)}%`;
    document.querySelector('#prime-cost-list').innerHTML = [
      ['Food cost', period.foodCost],
      ['Beverage cost', period.beverageCost],
      ['Labor cost', period.laborCost]
    ].map(([label, value]) => `<div><dt>${label}</dt><dd>${calc.money.format(value)}</dd></div>`).join('');
  }

  function renderExpenses(period) {
    document.querySelector('#expense-table').innerHTML = period.expenseControls.map((item) => {
      const variance = calc.variance(item.actual, item.target);
      const tone = variance <= 0 ? 'positive' : 'negative';
      return `<tr><td>${item.category}</td><td>${calc.money.format(item.actual)}</td><td>${calc.money.format(item.target)}</td><td class="${tone}">${variance >= 0 ? '+' : ''}${calc.money.format(variance)}</td></tr>`;
    }).join('');
  }

  function renderCloseControls(period) {
    document.querySelector('#close-controls').innerHTML = period.closeControls.map((control) => {
      const tone = control.status === 'Complete' ? 'positive' : 'warning';
      return `<li><strong>${control.name}</strong><br><span class="badge ${tone}">${control.status}</span> <small>${control.owner}</small></li>`;
    }).join('');
  }

  function renderAlerts(period) {
    const prime = calc.primeCost(period);
    const margin = calc.margin(period);
    const alerts = [];
    if (prime.rate > 65) alerts.push(`Prime cost is ${prime.rate.toFixed(1)}%; review labor scheduling and purchasing controls.`);
    if (margin.rate < 15) alerts.push(`Operating margin is ${margin.rate.toFixed(1)}%; leadership review required.`);
    if (!alerts.length) alerts.push('Restaurant finance controls are within the current executive thresholds.');
    document.querySelector('#performance-alerts').innerHTML = alerts.map((alert) => `<div class="alert">${alert}</div>`).join('');
  }

  function render(period) {
    renderKpis(period);
    renderRevenue(period);
    renderPrimeCost(period);
    renderExpenses(period);
    renderCloseControls(period);
    renderAlerts(period);
    document.querySelector('#cash-position-side').textContent = calc.money.format(calc.cashPosition(period));
  }

  global.SKYBARDashboard = { render };
})(window);
