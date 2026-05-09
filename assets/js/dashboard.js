document.addEventListener(
  "DOMContentLoaded",
  initDashboard
);





function initDashboard() {

  setupFilters();

  refreshDashboard();

}





// ======================
// FILTERS
// ======================

function setupFilters() {

  const yearSelect =
    document.getElementById(
      "yearFilter"
    );


  const monthSelect =
    document.getElementById(
      "monthFilter"
    );



  if (
    !yearSelect ||
    !monthSelect
  ) return;



  yearSelect.innerHTML =
    "";



  for (
    let year = 2025;
    year <= 2040;
    year++
  ) {

    yearSelect.innerHTML += `

      <option value="${year}">
        ${year}
      </option>

    `;

  }



  for (
    let month = 1;
    month <= 12;
    month++
  ) {

    monthSelect.innerHTML += `

      <option value="${month}">
        ${month}
      </option>

    `;

  }



  const today =
    new Date();



  yearSelect.value =
    today.getFullYear();



  monthSelect.value =
    today.getMonth() + 1;



  yearSelect.onchange =
    refreshDashboard;


  monthSelect.onchange =
    refreshDashboard;

}





// ======================
// DASHBOARD
// ======================

function refreshDashboard() {

  const entries =
    getAllEntries();



  const summary =
    calculatePeriodSummary(
      entries
    );



  renderYtd(
    summary
  );


  renderMtd(
    summary
  );


  renderGop(
    summary
  );


  renderFoodBeverage(
    summary
  );


  renderSummary(
    summary,
    entries
  );


  renderRecentEntries(
    entries
  );



  if (
    typeof renderCharts ===
    "function"
  ) {

    renderCharts(
      entries
    );

  }

}





// ======================
// YTD
// ======================

function renderYtd(
  summary
) {

  setText(
    "ytdRevenueCard",
    money(
      summary.totalRevenue
    )
  );



  setText(
    "ytdBudgetCard",
    money(
      getSettings()
        .annualRevenueTarget
    )
  );



  setText(
    "ytdAchievementCard",
    percent(
      summary.ytdAchievement
    )
  );



  setText(
    "ytdVarianceCard",
    money(
      summary.ytdVariance
    )
  );



  setText(
    "ytdRemainingCard",
    money(
      summary.ytdRemaining
    )
  );

}





// ======================
// MTD
// ======================

function renderMtd(
  summary
) {

  setText(
    "mtdRevenueCard",
    money(
      summary.totalRevenue
    )
  );



  setText(
    "dailyPaceCard",
    money(
      summary.dailyPace
    )
  );



  setText(
    "projectionCard",
    money(
      summary.projectedRevenue
    )
  );



  setText(
    "projectionGapCard",
    money(
      summary.projectionGap
    )
  );



  setText(
    "daysLeftCard",
    summary.daysLeft
  );

}





// ======================
// GOP
// ======================

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





// ======================
// F&B
// ======================

function renderFoodBeverage(
  summary
) {

  setText(
    "foodRevenueCard",
    money(
      summary.foodRevenue
    )
  );



  setText(
    "foodMixCard",
    percent(
      summary.foodMix
    )
  );



  setText(
    "bevRevenueCard",
    money(
      summary.beverageRevenue
    )
  );



  setText(
    "bevMixCard",
    percent(
      summary.beverageMix
    )
  );

}





// ======================
// SUMMARY
// ======================

function renderSummary(
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





// ======================
// RECENT
// ======================

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



  container.innerHTML =

    entries
      .slice()
      .reverse()
      .slice(
        0,
        8
      )
      .map(
        item => {

          const total =

            Number(
              item.foodRevenue || 0
            ) +

            Number(
              item.beverageRevenue || 0
            );



          return `

            <div class="flex justify-between border-b py-3">

              <span>
                ${formatDate(
                  item.date
                )}
              </span>

              <span class="font-bold">
                ${money(
                  total
                )}
              </span>

            </div>

          `;

        }
      )
      .join("");

}





// ======================
// HELPERS
// ======================

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





function money(
  value
) {

  return (

    getSettings()
      .currency +

    Number(
      value || 0
    ).toLocaleString()

  );

}





function percent(
  value
) {

  return (

    Number(
      value || 0
    ).toFixed(
      1
    ) + "%"

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
