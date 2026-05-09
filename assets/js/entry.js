document.addEventListener(
  "DOMContentLoaded",
  initEntryPage
);





function initEntryPage() {

  bindEntryForm();

  renderEntryList();

}





// ====================
// FORM
// ====================

function bindEntryForm() {

  const form =
    document.getElementById(
      "entryForm"
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



      const payload = {

        date:
          getInputValue(
            "entryDate"
          ),



        foodRevenue:
          getInputValue(
            "foodRevenue"
          ),



        beverageRevenue:
          getInputValue(
            "beverageRevenue"
          ),



        foodCost:
          getInputValue(
            "foodCost"
          ),



        beverageCost:
          getInputValue(
            "beverageCost"
          ),



        fixCost:
          getInputValue(
            "fixCost"
          ),



        budget:
          getInputValue(
            "dailyBudget"
          )

      };



      if (
        !payload.date
      ) {

        alert(
          "Please select date"
        );

        return;

      }



      addEntry(
        payload
      );



      form.reset();



      renderEntryList();

    }

  );

}





// ====================
// LIST
// ====================

function renderEntryList() {

  const container =
    document.getElementById(
      "entryList"
    );


  if (
    !container
  ) return;



  const entries =
    getAllEntries();



  if (
    !entries.length
  ) {

    container.innerHTML =
      `
      <div class="text-slate-400 py-4">
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
        entry => {

          const total =

            Number(
              entry.foodRevenue || 0
            ) +

            Number(
              entry.beverageRevenue || 0
            );



          return `

            <div
              class="grid grid-cols-3 border-b py-3 gap-3">

              <div>

                ${formatDate(
                  entry.date
                )}

              </div>



              <div class="font-bold">

                ${money(
                  total
                )}

              </div>



              <div class="text-right">

                <button
                  onclick="removeEntry(${entry.id})"
                  class="text-red-500">

                  Delete

                </button>

              </div>

            </div>

          `;

        }
      )
      .join("");

}





// ====================
// DELETE
// ====================

function removeEntry(
  entryId
) {

  deleteEntry(
    entryId
  );


  renderEntryList();

}





// ====================
// HELPERS
// ====================

function getInputValue(
  id
) {

  const input =
    document.getElementById(
      id
    );


  if (
    !input
  ) return 0;



  return input.value;

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
