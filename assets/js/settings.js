const SETTINGS_KEY =
  "skybar_settings";





function getSettings() {

  const raw =
    localStorage.getItem(
      SETTINGS_KEY
    );



  const saved =

    raw

      ? JSON.parse(
          raw
        )

      : {};



  return {

    currency:
      saved.currency || "RM",



    monthlyBudget:
      saved.monthlyBudget || 575649,



    annualRevenueTarget:
      saved.annualRevenueTarget || 7500000,



    foodCostPercent:
      saved.foodCostPercent || 31,



    bevCostPercent:
      saved.bevCostPercent || 28,



    fixedCostPercent:
      saved.fixedCostPercent || 18

  };

}





function saveSettings(
  payload
) {

  const current =
    getSettings();



  const updated = {

    ...current,

    ...payload

  };



  localStorage.setItem(

    SETTINGS_KEY,

    JSON.stringify(
      updated
    )

  );

}
