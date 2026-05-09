document.addEventListener(
  "DOMContentLoaded",
  initReportsPage
);





function initReportsPage() {

  renderReports();

  bindExportButton();

}





function renderReports() {

  const entries =
    getAllEntries();



  const summary =
    calculatePeriodSummary(
      entries
    );



  renderReportCards(
    summary,
    entries
  );

}





// ====================
// KPI
// ====================

function renderReportCards(
  summary,
  entries
) {

  const best =
    getBestEntry(
      entries
    );



  const worst =
    getWorstEntry(
      entries
    );



  setText(
    "reportRevenueCard",

    money(
      summary.totalRevenue
    )
  );



  setText(
    "reportCostCard",

    money(
      summary.totalCost
    )
  );



  setText(
    "reportGopCard",

    money(
      summary.totalGop
    )
  );



  setText(
    "reportMarginCard",

    percent(
      summary.gopMargin
    )
  );



  setText(
    "reportBestDayCard",

    best

      ? formatDate(
          best.date
        )

      : "-"
  );



  setText(
    "reportWorstDayCard",

    worst

      ? formatDate(
          worst.date
        )

      : "-"
  );

}





// ====================
// EXPORT
// ====================

function bindExportButton() {

  const button =
    document.getElementById(
      "exportCsvBtn"
    );


  if (
    !button
  ) return;



  button.onclick =
    exportCsvReport;

}





function exportCsvReport() {

  const entries =
    getAllEntries();



  if (
    !entries.length
  ) {

    alert(
      "No data found"
    );

    return;

  }



  const rows = [

    [

      "Date",

      "Food Revenue",

      "Beverage Revenue",

      "Food Cost",

      "Beverage Cost",

      "Fixed Cost"

    ]

  ];



  entries.forEach(
    entry => {

      rows.push([

        entry.date,

        entry.foodRevenue,

        entry.beverageRevenue,

        entry.foodCost,

        entry.beverageCost,

        entry.fixCost

      ]);

    }
  );



  const csv =
    rows
      .map(
        row =>

          row.join(
            ","
          )
      )
      .join(
        "\n"
      );



  const blob =
    new Blob(

      [csv],

      {
        type:
          "text/csv"
      }

    );



  const url =
    URL.createObjectURL(
      blob
    );



  const link =
    document.createElement(
      "a"
    );



  link.href =
    url;


  link.download =
    "skybar_report.csv";



  link.click();

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
