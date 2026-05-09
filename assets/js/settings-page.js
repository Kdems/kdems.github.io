document.addEventListener(
  "DOMContentLoaded",
  initSettingsPage
);





function initSettingsPage() {

  loadSettings();

  bindSettingsForm();

}





function loadSettings() {

  const s =
    getSettings();



  setValue(
    "currencyInput",
    s.currency
  );



  setValue(
    "monthlyBudgetInput",
    s.monthlyBudget
  );



  setValue(
    "annualTargetInput",
    s.annualRevenueTarget
  );



  setValue(
    "foodCostPercentInput",
    s.foodCostPercent
  );



  setValue(
    "bevCostPercentInput",
    s.bevCostPercent
  );



  setValue(
    "fixedCostPercentInput",
    s.fixedCostPercent
  );

}





function bindSettingsForm() {

  const form =
    document.getElementById(
      "settingsForm"
    );



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



        foodCostPercent:
          Number(
            getValue(
              "foodCostPercentInput"
            )
          ),



        bevCostPercent:
          Number(
            getValue(
              "bevCostPercentInput"
            )
          ),



        fixedCostPercent:
          Number(
            getValue(
              "fixedCostPercentInput"
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
