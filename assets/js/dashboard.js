window.SkybarFinance = window.SkybarFinance || {};

window.SkybarFinance.renderDashboard = function renderDashboard(rows) {
  const { calculateTotals, formatCurrency } = window.SkybarFinance;
  const totals = calculateTotals(rows);
  const table = document.querySelector('#quarter-table');

  document.querySelector('#revenue-total').textContent = formatCurrency(totals.revenue);
  document.querySelector('#expense-total').textContent = formatCurrency(totals.expenses);
  document.querySelector('#cash-flow').textContent = formatCurrency(totals.profit);
  document.querySelector('#net-margin').textContent = `${Math.round(totals.margin * 100)}%`;

  table.innerHTML = rows.map((row) => {
    const profit = row.revenue - row.expenses;
    return `
      <tr>
        <td>${row.quarter}</td>
        <td>${formatCurrency(row.revenue)}</td>
        <td>${formatCurrency(row.expenses)}</td>
        <td>${formatCurrency(profit)}</td>
      </tr>
    `;
  }).join('');
};
