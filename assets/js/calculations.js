function calculatePeriodSummary(
  entries
) {

  let totalFoodRevenue =
    0;

  let totalBeverageRevenue =
    0;

  let totalFoodCost =
    0;

  let totalBeverageCost =
    0;

  let totalFixCost =
    0;





  entries.forEach(
    entry => {

      totalFoodRevenue +=
        Number(
          entry.foodRevenue || 0
        );


      totalBeverageRevenue +=
        Number(
          entry.beverageRevenue || 0
        );


      totalFoodCost +=
        Number(
          entry.foodCost || 0
        );


      totalBeverageCost +=
        Number(
          entry.beverageCost || 0
        );


      totalFixCost +=
        Number(
          entry.fixCost || 0
        );

    }
  );





  const totalRevenue =

    totalFoodRevenue +

    totalBeverageRevenue;



  const totalCost =

    totalFoodCost +

    totalBeverageCost +

    totalFixCost;



  const totalGop =

    totalRevenue -

    totalCost;



  const gopMargin =

    totalRevenue > 0

      ? (
          totalGop /
          totalRevenue
        ) * 100

      : 0;





  return {

    totalFoodRevenue,

    totalBeverageRevenue,

    totalRevenue,



    foodCost:
      totalFoodCost,

    beverageCost:
      totalBeverageCost,

    fixCost:
      totalFixCost,



    totalCost,

    totalGop,

    gopMargin

  };

}
