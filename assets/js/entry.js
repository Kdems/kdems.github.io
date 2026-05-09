document.addEventListener(
  "DOMContentLoaded",
  initEntryPage
);





function initEntryPage() {

  bindEntryForm();

  renderEntryList();

}





function bindEntryForm() {

  const form =
    document.getElementById(
      "entryForm"
    );



  form.addEventListener(
    "submit",

    function(
      event
    ) {

      event.preventDefault();



      const payload = {

        date:
          getValue(
            "entryDate"
          ),



        budget:
          Number(
            getValue(
              "dailyBudget"
            )
          ),



        foodRevenue:
          Number(
            getValue(
              "foodRevenue"
            )
          ),



        beverageRevenue:
          Number(
            getValue(
              "beverageRevenue"
            )
          )

      };



      addEntry(
        payload
      );



      form.reset();



      renderEntryList();

    }

  );

}





function renderEntryList() {

  const entries =
    getAllEntries();



  const container =
    document.getElementById(
      "entryList"
    );



  if (
    !entries.length
  ) {

    container.innerHTML =

      `
      <div class="text-slate-400">
        No entries found
      </div>
      `;

    return;

  }



  container.innerHTML =

    entries
      .slice()
      .reverse()
      .map(
        item => {

          const revenue =

            item.foodRevenue +

            item.beverageRevenue;



          return `

            <div
              class="flex justify-between border-b py-3">

              <span>

                ${formatDate(
                  item.date
                )}

              </span>



              <span class="font-bold">

                ${money(
                  revenue
                )}

              </span>

            </div>

          `;

        }
      )
      .join("");

}





function getValue(
  id
) {

  return document
    .getElementById(
      id
    ).value;

}





function money(
  value
) {

  return (

    getSettings()
      .currency +

    Number(
      value
    ).toLocaleString()

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
