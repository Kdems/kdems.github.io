document.addEventListener(
  "DOMContentLoaded",
  initReviewPage
);





function initReviewPage() {

  renderOperatingReview();

}





function renderOperatingReview() {

  const entries =
    getAllEntries();



  const summary =
    calculatePeriodSummary(
      entries
    );



  renderReviewCards(
    summary
  );


  renderRecommendations(
    summary
  );

}





// ====================
// KPI
// ====================

function renderReviewCards(
  summary
) {

  setText(
    "reviewRevenueCard",

    money(
      summary.totalRevenue
    )
  );



  setText(
    "reviewCostCard",

    money(
      summary.totalCost
    )
  );



  setText(
    "reviewGopCard",

    money(
      summary.totalGop
    )
  );



  setText(
    "reviewMarginCard",

    percent(
      summary.gopMargin
    )
  );



  setText(
    "reviewFoodCostCard",

    percent(
      summary.foodCostPercent
    )
  );



  setText(
    "reviewBevCostCard",

    percent(
      summary.beverageCostPercent
    )
  );

}





// ====================
// INSIGHT
// ====================

function renderRecommendations(
  summary
) {

  const el =
    document.getElementById(
      "recommendationBox"
    );


  if (
    !el
  ) return;



  let recommendations =
    [];



  if (
    summary.gopMargin < 40
  ) {

    recommendations.push(
      "Margin below target. Review pricing and cost control."
    );

  }



  if (
    summary.foodCostPercent > 35
  ) {

    recommendations.push(
      "Food cost above control range. Review wastage and portion."
    );

  }



  if (
    summary.beverageCostPercent > 25
  ) {

    recommendations.push(
      "Beverage cost above target. Review pouring control."
    );

  }



  if (
    !recommendations.length
  ) {

    recommendations.push(
      "Operations performing within target."
    );

  }



  el.innerHTML =
    recommendations
      .map(
        item => {

          return `

            <div class="border-b py-3">

              ${item}

            </div>

          `;

        }
      )
      .join("");

}





// ====================
// HELPERS
// ====================

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
