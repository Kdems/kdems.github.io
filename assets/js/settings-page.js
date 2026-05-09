document.addEventListener(
  "DOMContentLoaded",
  initSettingsPage
);





function initSettingsPage() {

  loadSettings();

  bindSettingsForm();

}





function loadSettings() {

  const settings =
    getSettings();



  setValue(
    "currencyInput",
    settings.currency
  );



  setValue(
    "monthlyBudgetInput",
    settings.monthlyBudget
  );



  setValue(
    "annualTargetInput",
    settings.annualRevenueTarget
  );



  setValue(
    "lyFoodRevenueInput",
    settings.lyFoodRevenue
  );



  setValue(
    "lyBeverageRevenueInput",
    settings.lyBeverageRevenue
  );

}





function bindSettingsForm() {

  const form =
    document.getElementById(
      "settingsForm"
    );


  if (
    !form
  ) return;



  form.addEventListener(
    "submit",

    function(
      event
    ) {

      event.preventDefault();



      saveSettings({

        currency:
          getValue(
            "currencyInput"
          ),



        monthlyBudget:
          Number(
            getValue(
              "monthlyBudgetInput"
            )
          ),



        annualRevenueTarget:
          Number(
            getValue(
              "annualTargetInput"
            )
          ),



        lyFoodRevenue:
          Number(
            getValue(
              "lyFoodRevenueInput"
            )
          ),



        lyBeverageRevenue:
          Number(
            getValue(
              "lyBeverageRevenueInput"
            )
          )

      });



      alert(
        "Settings saved"
      );

    }

  );

}





function getValue(
  id
) {

  return document
    .getElementById(
      id
    ).value;

}





function setValue(
  id,
  value
) {

  document
    .getElementById(
      id
    ).value =
      value;

}
