const SETTINGS_KEY =
  "skybar_settings";





function getSettings() {

  const raw =
    localStorage.getItem(
      SETTINGS_KEY
    );


  if (!raw) {

    return getDefaultSettings();

  }


  return JSON.parse(
    raw
  );

}





function saveSettings(
  payload
) {

  localStorage.setItem(

    SETTINGS_KEY,

    JSON.stringify(
      payload
    )

  );

}





function getDefaultSettings() {

  return {

    currency:
      "RM",


    monthlyBudget:
      120000,


    annualRevenueTarget:
      1440000,


    lyFoodRevenue:
      45000,


    lyBeverageRevenue:
      30000

  };

}
