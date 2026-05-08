(function exposeCalculations(global) {
  const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const percentFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1, minimumFractionDigits: 1 });

  function toNumber(value) {
    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric : 0;
  }

  function round(value, decimals = 2) {
    const factor = 10 ** decimals;
    return Math.round((toNumber(value) + Number.EPSILON) * factor) / factor;
  }

  function safePercent(part, total) {
    const denominator = toNumber(total);
    if (denominator === 0) return 0;
    return round((toNumber(part) / denominator) * 100, 1);
  }

  function normalizeEntry(entry) {
    return {
      date: entry.date || '',
      foodRevenue: round(entry.foodRevenue),
      beverageRevenue: round(entry.beverageRevenue),
      foodCost: round(entry.foodCost),
      beverageCost: round(entry.beverageCost),
      fixedCost: round(entry.fixedCost),
      dailyBudget: round(entry.dailyBudget)
    };
  }

  function totalRevenue(entry) {
    return round(toNumber(entry.foodRevenue) + toNumber(entry.beverageRevenue));
  }

  function totalCost(entry) {
    return round(toNumber(entry.foodCost) + toNumber(entry.beverageCost) + toNumber(entry.fixedCost));
  }

  function foodCostPercent(entry) {
    return safePercent(entry.foodCost, entry.foodRevenue);
  }

  function beverageCostPercent(entry) {
    return safePercent(entry.beverageCost, entry.beverageRevenue);
  }

  function fixedCostPercent(entry) {
    return safePercent(entry.fixedCost, totalRevenue(entry));
  }

  function gop(entry) {
    return round(totalRevenue(entry) - totalCost(entry));
  }

  function budgetVariance(entry) {
    return round(totalRevenue(entry) - toNumber(entry.dailyBudget));
  }

  function summarize(entries) {
    const totals = entries.reduce((summary, entry) => {
      const normalized = normalizeEntry(entry);
      summary.foodRevenue += normalized.foodRevenue;
      summary.beverageRevenue += normalized.beverageRevenue;
      summary.foodCost += normalized.foodCost;
      summary.beverageCost += normalized.beverageCost;
      summary.fixedCost += normalized.fixedCost;
      summary.dailyBudget += normalized.dailyBudget;
      return summary;
    }, { foodRevenue: 0, beverageRevenue: 0, foodCost: 0, beverageCost: 0, fixedCost: 0, dailyBudget: 0 });

    const aggregateEntry = normalizeEntry({ date: '', ...totals });
    const latestEntry = [...entries].sort((a, b) => String(b.date).localeCompare(String(a.date)))[0];

    return {
      count: entries.length,
      dailyRevenue: latestEntry ? totalRevenue(latestEntry) : 0,
      mtdRevenue: totalRevenue(aggregateEntry),
      foodRevenue: aggregateEntry.foodRevenue,
      beverageRevenue: aggregateEntry.beverageRevenue,
      foodCostPercent: foodCostPercent(aggregateEntry),
      beverageCostPercent: beverageCostPercent(aggregateEntry),
      fixedCostPercent: fixedCostPercent(aggregateEntry),
      gop: gop(aggregateEntry),
      budgetVariance: budgetVariance(aggregateEntry)
    };
  }

  function formatMoney(value) {
    return currencyFormatter.format(round(value));
  }

  function formatPercent(value) {
    return `${percentFormatter.format(round(value, 1))}%`;
  }

  global.SKYBARCalculations = {
    beverageCostPercent,
    budgetVariance,
    fixedCostPercent,
    foodCostPercent,
    formatMoney,
    formatPercent,
    gop,
    normalizeEntry,
    round,
    safePercent,
    summarize,
    toNumber,
    totalCost,
    totalRevenue
  };
})(window);
