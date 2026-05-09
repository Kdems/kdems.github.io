let revenueChart =
  null;

let gopChart =
  null;

let mixChart =
  null;





function renderCharts(
  entries
) {

  renderRevenueChart(
    entries
  );

  renderGopChart(
    entries
  );

  renderMixChart(
    entries
  );

}





// ======================
// REVENUE TREND
// ======================

function renderRevenueChart(
  entries
) {

  const canvas =
    document.getElementById(
      "revenueChart"
    );


  if (
    !canvas
  ) return;



  if (
    revenueChart
  ) {

    revenueChart.destroy();

  }



  const labels =
    entries.map(
      entry =>

        formatChartDate(
          entry.date
        )
    );



  const values =
    entries.map(
      entry => {

        return (

          Number(
            entry.foodRevenue || 0
          ) +

          Number(
            entry.beverageRevenue || 0
          )

        );

      }
    );



  revenueChart =
    new Chart(
      canvas,
      {

        type:
          "line",


        data: {

          labels,


          datasets: [

            {

              label:
                "Revenue",


              data:
                values,


              borderWidth:
                3,


              tension:
                0.35

            }

          ]

        },


        options: {

          responsive:
            true,


          maintainAspectRatio:
            false

        }

      }
    );

}





// ======================
// GOP TREND
// ======================

function renderGopChart(
  entries
) {

  const canvas =
    document.getElementById(
      "gopChart"
    );


  if (
    !canvas
  ) return;



  if (
    gopChart
  ) {

    gopChart.destroy();

  }



  const labels =
    entries.map(
      entry =>

        formatChartDate(
          entry.date
        )
    );



  const values =
    entries.map(
      entry => {

        const revenue =

          Number(
            entry.foodRevenue || 0
          ) +

          Number(
            entry.beverageRevenue || 0
          );



        const cost =

          Number(
            entry.foodCost || 0
          ) +

          Number(
            entry.beverageCost || 0
          ) +

          Number(
            entry.fixCost || 0
          );



        return (

          revenue -
          cost

        );

      }
    );



  gopChart =
    new Chart(
      canvas,
      {

        type:
          "bar",


        data: {

          labels,


          datasets: [

            {

              label:
                "GOP",


              data:
                values

            }

          ]

        },


        options: {

          responsive:
            true,


          maintainAspectRatio:
            false

        }

      }
    );

}





// ======================
// MIX
// ======================

function renderMixChart(
  entries
) {

  const canvas =
    document.getElementById(
      "mixChart"
    );


  if (
    !canvas
  ) return;



  if (
    mixChart
  ) {

    mixChart.destroy();

  }



  let food =
    0;

  let beverage =
    0;



  entries.forEach(
    entry => {

      food +=
        Number(
          entry.foodRevenue || 0
        );


      beverage +=
        Number(
          entry.beverageRevenue || 0
        );

    }
  );



  mixChart =
    new Chart(
      canvas,
      {

        type:
          "doughnut",


        data: {

          labels: [

            "Food",

            "Beverage"

          ],


          datasets: [

            {

              data: [

                food,

                beverage

              ]

            }

          ]

        },


        options: {

          responsive:
            true,


          maintainAspectRatio:
            false

        }

      }
    );

}





function formatChartDate(
  value
) {

  const date =
    new Date(
      value
    );


  return (
    date.getDate()
  );

}
