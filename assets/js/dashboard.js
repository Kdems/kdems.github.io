let selectedYear =
  new Date().getFullYear();

let selectedMonth =
  new Date().getMonth() + 1;



document.addEventListener(
  "DOMContentLoaded",
  initDashboard
);





function initDashboard() {

  setupFilters();

  renderDashboard();

}





// ====================
// FILTER
// ====================

function setupFilters() {

  const yearFilter =
    document.getElementById(
      "yearFilter"
    );

  const monthFilter =
    document.getElementById(
      "monthFilter"
    );


  if (
    yearFilter
  ) {

    for (
      let y = 2025;
      y <= 2040;
      y++
    ) {

      yearFilter.innerHTML += `
        <option
          value="${y}">
          ${y}
        </option>
      `;

    }

  }



  if (
    monthFilter
  ) {

    for (
      let m = 1;
      m <= 12;
      m++
    ) {

      monthFilter.innerHTML += `
        <option
          value="${m}">
          ${m}
        </option>
      `;

    }

  }



  if (
    yearFilter
  ) {

    yearFilter.value =
      selectedYear;


    yearFilter.onchange =
      function() {

        selectedYear =
          Number(
            this.value
          );

        renderDashboard();

      };

  }



  if (
    monthFilter
  ) {

    monthFilter.value =
      selectedMonth;


    monthFilter.onchange =
      function() {

        selectedMonth =
          Number(
            this.value
          );

        renderDashboard();

      };

  }

}





// ====================
// MAIN
// ====================

function renderDashboard() {

  const entries =
    filterEntries(
      selectedYear,
      selectedMonth
    );


  const data =
    calculatePeriodSummary(
      entries
    );


  renderAlerts(
    data,
    entries
  );

  renderYtd(
    data
  );

  renderMtd(
    data,
    entries
  );

  renderGop(
    data
  );

  renderFoodBeverage(
    data
  );

  renderSummary(
    data,
    entries
  );

  renderRecentEntries(
    entries
  );



  if (
    entries.length &&
    typeof renderCharts ===
      "function"
  ) {

    renderCharts(
      entries
    );

  }

}





// ====================
// ALERTS
// ====================

function renderAlerts(
  data,
  entries
) {

  const settings =
    getSettings();


  const budget =
    Number(
      settings.monthlyBudget || 0
    );


  const achievement =
    percentage(
      data.totalRevenue,
      budget
    );


  setText(
    "revenueAlertCard",

    achievement >= 100

      ? "🟢 ON TRACK"

      : "🔴 BELOW"
  );


  setText(
    "projectionAlertCard",

    entries.length

      ? "🟢 LIVE"

      : "⚪ NO DATA"
  );


  setText(
    "foodAlertCard",

    "🟢 LIVE"
  );


  setText(
    "marginAlertCard",

    "🟢 LIVE"
  );

}





// ====================
// KPI
// ====================

function renderYtd(
  data
) {

  const settings =
    getSettings();


  setText(
    "ytdRevenueCard",
    money(
      data.totalRevenue
    )
  );


  setText(
    "ytdBudgetCard",
    money(
      settings.annualRevenueTarget || 0
    )
  );


  setText(
    "ytdAchievementCard",
    percent(
      percentage(
        data.totalRevenue,
        settings.annualRevenueTarget
      )
    )
  );


  setText(
    "ytdVarianceCard",
    money(
      data.totalRevenue -
      settings.annualRevenueTarget
    )
  );

}





function renderMtd(
  data,
  entries
) {

  const settings =
    getSettings();


  const days =
    entries.length || 1;


  const avg =
    data.totalRevenue /
    days;


  const daysInMonth =
    new Date(
      selectedYear,
      selectedMonth,
      0
    ).getDate();


  const projection =
    avg *
    daysInMonth;


  setText(
    "mtdRevenueCard",
    money(
      data.totalRevenue
    )
  );


  setText(
    "dailyPaceCard",
    money(
      avg
    )
  );


  setText(
    "projectionCard",
    money(
      projection
    )
  );


  setText(
    "projectionGapCard",
    money(
      projection -
      settings.monthlyBudget
    )
  );


  setText(
    "daysLeftCard",
    daysInMonth -
      days
  );

}





function renderGop(
  data
) {

  setText(
    "gopRevenueCard",
    money(
      data.totalRevenue
    )
  );

  setText(
    "gopCostCard",
    money(
      data.totalCost
    )
  );

  setText(
    "gopMainCard",
    money(
      data.totalGop
    )
  );

  setText(
    "gopMarginCard",
    percent(
      data.gopMargin
    )
  );

}





function renderFoodBeverage(
  data
) {

  setText(
    "foodRevenueCard",
    money(
      data.totalFoodRevenue
    )
  );

  setText(
    "bevRevenueCard",
    money(
      data.totalBeverageRevenue
    )
  );

  setText(
    "foodMixCard",
    percent(
      percentage(
        data.totalFoodRevenue,
        data.totalRevenue
      )
    )
  );

  setText(
    "bevMixCard",
    percent(
      percentage(
        data.totalBeverageRevenue,
        data.totalRevenue
      )
    )
  );

}





function renderSummary(
  data,
  entries
) {

  setText(
    "summaryRevenueCard",
    money(
      data.totalRevenue
    )
  );

  setText(
    "summaryBudgetCard",
    money(
      getSettings()
        .monthlyBudget || 0
    )
  );


  const best =
    getBestEntry(
      entries
    );


  const worst =
    getWorstEntry(
      entries
    );


  setText(
    "bestDayCard",

    best

      ? formatDate(
          best.date
        )

      : "-"
  );


  setText(
    "worstDayCard",

    worst

      ? formatDate(
          worst.date
        )

      : "-"
  );

}





function renderRecentEntries(
  entries
) {

  const el =
    document.getElementById(
      "recentEntriesList"
    );


  if (
    !el
  ) return;



  if (
    !entries.length
  ) {

    el.innerHTML =
      `
      <div class="text-slate-400">
        No entries
      </div>
      `;

    return;

  }



  el.innerHTML =
    entries
      .slice()
      .reverse()
      .map(
        entry => {

          const total =

            Number(
              entry.foodRevenue || 0
            ) +

            Number(
              entry.beverageRevenue || 0
            );


          return `

            <div class="grid grid-cols-2 border-b py-3">

              <div>
                ${formatDate(
                  entry.date
                )}
              </div>

              <div class="text-right font-bold">
                ${money(
                  total
                )}
              </div>

            </div>

          `;

        }
      )
      .join("");

}





// ====================
// HELPERS
// ====================

function getBestEntry(
  entries
) {

  if (
    !entries.length
  ) return null;


  return entries.reduce(
    (
      best,
      current
    ) => {

      const bestValue =

        Number(
          best.foodRevenue || 0
        ) +

        Number(
          best.beverageRevenue || 0
        );


      const currentValue =

        Number(
          current.foodRevenue || 0
        ) +

        Number(
          current.beverageRevenue || 0
        );


      return

        currentValue >
        bestValue

          ? current

          : best;

    }
  );

}



function getWorstEntry(
  entries
) {

  if (
    !entries.length
  ) return null;


  return entries.reduce(
    (
      worst,
      current
    ) => {

      const worstValue =

        Number(
          worst.foodRevenue || 0
        ) +

        Number(
          worst.beverageRevenue || 0
        );


      const currentValue =

        Number(
          current.foodRevenue || 0
        ) +

        Number(
          current.beverageRevenue || 0
        );


      return

        currentValue <
        worstValue

          ? current

          : worst;

    }
  );

}



function setText(
  id,
  value
) {

  const el =
    document.getElementById(
      id
    );


  if (
    el
  ) {

    el.innerHTML =
      value;

  }

}



function percentage(
  actual,
  target
) {

  if (
    !target
  ) return 0;


  return (
    actual /
    target
  ) * 100;

}



function percent(
  value
) {

  return (
    Number(
      value || 0
    ).toFixed(1) +
    "%"
  );

}



function money(
  value
) {

  return (

    getSettings()
      .currency +

    Number(
      value || 0
    ).toLocaleString(
      undefined,
      {
        maximumFractionDigits:
          0
      }
    )

  );

}



function formatDate(
  value
) {

  return new Date(
    value
  ).toLocaleDateString(
    "en-GB"
  );

}
