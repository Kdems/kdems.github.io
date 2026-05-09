function calculatePeriodSummary(
  entries
) {

  const settings =
    getSettings();



  const totalFoodRevenue =
    sumField(
      entries,
      "foodRevenue"
    );



  const totalBeverageRevenue =
    sumField(
      entries,
      "beverageRevenue"
    );



  const totalRevenue =

    totalFoodRevenue +

    totalBeverageRevenue;



  const totalFoodCost =
    sumField(
      entries,
      "foodCost"
    );



  const totalBeverageCost =
    sumField(
      entries,
      "beverageCost"
    );



  const totalFixCost =
    sumField(
      entries,
      "fixCost"
    );



  const totalCost =

    totalFoodCost +

    totalBeverageCost +

    totalFixCost;



  const totalGop =

    totalRevenue -

    totalCost;



  const gopMargin =

    totalRevenue

      ? (

          totalGop /

          totalRevenue

        ) * 100

      : 0;



  const foodMix =

    totalRevenue

      ? (

          totalFoodRevenue /

          totalRevenue

        ) * 100

      : 0;



  const beverageMix =

    totalRevenue

      ? (

          totalBeverageRevenue /

          totalRevenue

        ) * 100

      : 0;





  // =================
  // DAYS
  // =================

  const today =
    new Date();



  const daysInMonth =
    new Date(

      today.getFullYear(),

      today.getMonth() + 1,

      0

    ).getDate();



  const currentDay =
    today.getDate();



  const daysLeft =

    daysInMonth -

    currentDay;





  // =================
  // MTD
  // =================

  const dailyPace =

    currentDay

      ? totalRevenue /
        currentDay

      : 0;



  const projectedRevenue =

    dailyPace *

    daysInMonth;



  const projectionGap =

    projectedRevenue -

    settings.monthlyBudget;





  // =================
  // YTD
  // =================

  const ytdAchievement =

    settings.annualRevenueTarget

      ? (

          totalRevenue /

          settings.annualRevenueTarget

        ) * 100

      : 0;



  const ytdVariance =

    totalRevenue -

    settings.annualRevenueTarget;



  const ytdRemaining =

    settings.annualRevenueTarget -

    totalRevenue;





  return {

    foodRevenue:
      totalFoodRevenue,



    beverageRevenue:
      totalBeverageRevenue,



    totalRevenue,



    totalFoodCost,



    totalBeverageCost,



    totalFixCost,



    totalCost,



    totalGop,



    gopMargin,



    foodMix,



    beverageMix,



    daysLeft,



    dailyPace,



    projectedRevenue,



    projectionGap,



    ytdAchievement,



    ytdVariance,



    ytdRemaining

  };

}





// =====================
// HELPERS
// =====================

function sumField(
  entries,
  field
) {

  return entries.reduce(

    (
      total,
      item
    ) => {

      return (

        total +

        Number(
          item[
            field
          ] || 0
        )

      );

    },

    0

  );

}
