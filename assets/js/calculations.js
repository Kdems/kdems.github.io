window.SkybarFinance = window.SkybarFinance || {};

window.SkybarFinance.formatCurrency = function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
};

window.SkybarFinance.calculateTotals = function calculateTotals(rows) {
  const totals = rows.reduce((summary, row) => {
    summary.revenue += row.revenue;
    summary.expenses += row.expenses;
    return summary;
  }, { revenue: 0, expenses: 0 });

  totals.profit = totals.revenue - totals.expenses;
  totals.margin = totals.revenue === 0 ? 0 : totals.profit / totals.revenue;
  return totals;
};
