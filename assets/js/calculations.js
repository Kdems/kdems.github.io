(function exposeCalculations(global) {
  const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const number = new Intl.NumberFormat('en-US');

  function pct(value, total) {
    if (!total) return 0;
    return (value / total) * 100;
  }

  function margin(period) {
    const profit = period.netSales - period.foodCost - period.beverageCost - period.laborCost - period.operatingExpenses;
    return { profit, rate: pct(profit, period.netSales) };
  }

  function primeCost(period) {
    const total = period.foodCost + period.beverageCost + period.laborCost;
    return { total, rate: pct(total, period.netSales) };
  }

  function averageCheck(period) {
    return period.covers ? period.netSales / period.covers : 0;
  }

  function cashPosition(period) {
    return period.bankDeposits - period.openPayables;
  }

  function variance(actual, target) {
    return actual - target;
  }

  global.SKYBARCalculations = { averageCheck, cashPosition, margin, money, number, pct, primeCost, variance };
})(window);
