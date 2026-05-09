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
// FILTERS
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

    yearFilter.innerHTML =
      "";



    for (
      let year = 2025;
      year <= 2040;
      year++
    ) {

      yearFilter.innerHTML += `

        <option
          value="${year}">

          ${year}

        </option>

      `;

    }



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

    monthFilter.innerHTML =
      "";



    for (
      let month = 1;
      month <= 12;
      month++
    ) {

      monthFilter.innerHTML += `

        <option
          value="${month}">

          ${month}

        </option>

      `;

    }



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



  const summary =
    calculatePeriodSummary(
      entries
    );



  renderExecutiveAlerts(
    summary,
    entries
  );


  renderYtd(
    summary
  );


  renderMtd(
    summary,
    entries
  );


  renderGop(
    summary
  );


  renderFoodAndBeverage(
    summary
  );


  renderMonthlySummary(
    summary,
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

function renderExecutiveAlerts(
  summary,
  entries
) {

  const settings =
    getSettings();



  const revenueAchievement =
    percentage(

      summary.totalRevenue,

      settings.monthlyBudget

    );



  setText(

    "revenueAlertCard",

    revenueAchievement >= 100

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

    summary.foodCostPercent <= 35

      ? "🟢 GOOD"

      : "🔴 HIGH"

  );



  setText(

    "marginAlertCard",

    summary.gopMargin >= 40

      ? "🟢 STRONG"

      : "🔴 LOW"

  );

}





// ====================
// YTD
// ====================

function renderYtd(
  summary
) {

  const settings =
    getSettings();



  const achievement =
    percentage(

      summary.totalRevenue,

      settings.annualRevenueTarget

    );



  setText(
    "ytdRevenueCard",

    money(
      summary.totalRevenue
    )
  );



  setText(
    "ytdBudgetCard",

    money(
      settings.annualRevenueTarget
    )
  );



  setText(
    "ytdAchievementCard",

    percent(
      achievement
    )
  );



  setText(
    "ytdVarianceCard",

    money(

      summary.totalRevenue -

      settings.annualRevenueTarget

    )
  );

}





// ====================
// MTD
// ====================

function renderMtd(
  summary,
  entries
) {

  const settings =
    getSettings();



  const daysPassed =
    entries.length || 1;



  const avg =
    summary.totalRevenue /
    daysPassed;



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
      summary.totalRevenue
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
      daysPassed
  );

}





// ====================
// GOP
// ====================

function renderGop(
  summary
) {

  setText(
    "gopRevenueCard",

    money(
      summary.totalRevenue
    )
  );



  setText(
    "gopCostCard",

    money(
      summary.totalCost
    )
  );



  setText(
    "gopMainCard",

    money(
      summary.totalGop
    )
  );



  setText(
    "gopMarginCard",

    percent(
      summary.gopMargin
    )
  );

}





// ====================
// F&B
// ====================

function renderFoodAndBeverage(
  summary
) {

  setText(
    "foodRevenueCard",

    money(
      summary.totalFoodRevenue
    )
  );



  setText(
    "bevRevenueCard",

    money(
      summary.totalBeverageRevenue
    )
  );



  setText(
    "foodMixCard",

    percent(
      summary.foodMix
    )
  );



  setText(
    "bevMixCard",

    percent(
      summary.beverageMix
    )
  );

}





// ====================
// SUMMARY
// ====================

function renderMonthlySummary(
  summary,
  entries
) {

  setText(
    "summaryRevenueCard",

    money(
      summary.totalRevenue
    )
  );



  setText(
    "summaryBudgetCard",

    money(
      getSettings()
        .monthlyBudget
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





// ====================
// RECENT
// ====================

function renderRecentEntries(
  entries
) {

  const container =
    document.getElementById(
      "recentEntriesList"
    );


  if (
    !container
  ) return;



  if (
    !entries.length
  ) {

    container.innerHTML =
      `
      <div class="text-slate-400">
        No entries
      </div>
      `;

    return;

  }



  container.innerHTML =
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
    ).toFixed(1)

    + "%"

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
