const ENTRY_STORAGE_KEY =
  "skybar_entries";




// ======================
// GET ALL
// ======================

function getAllEntries() {

  try {

    const raw =
      localStorage.getItem(
        ENTRY_STORAGE_KEY
      );


    if (!raw)
      return [];


    const parsed =
      JSON.parse(
        raw
      );


    return Array.isArray(
      parsed
    )

      ? parsed

      : [];

  }

  catch (
    error
  ) {

    console.error(
      error
    );

    return [];

  }

}





// ======================
// SAVE ALL
// ======================

function saveAllEntries(
  entries
) {

  localStorage.setItem(
    ENTRY_STORAGE_KEY,

    JSON.stringify(
      entries
    )
  );

}





// ======================
// ADD ENTRY
// ======================

function addEntry(
  payload
) {

  const entries =
    getAllEntries();


  const entry = {

    id:
      Date.now(),


    date:
      payload.date || "",


    foodRevenue:
      Number(
        payload.foodRevenue || 0
      ),


    beverageRevenue:
      Number(
        payload.beverageRevenue || 0
      ),


    foodCost:
      Number(
        payload.foodCost || 0
      ),


    beverageCost:
      Number(
        payload.beverageCost || 0
      ),


    fixCost:
      Number(
        payload.fixCost || 0
      ),


    budget:
      Number(
        payload.budget || 0
      )

  };


  entries.push(
    entry
  );


  saveAllEntries(
    entries
  );


  return entry;

}





// ======================
// UPDATE
// ======================

function updateEntry(
  entryId,
  payload
) {

  const entries =
    getAllEntries();


  const updated =
    entries.map(
      entry => {

        if (
          entry.id !=
          entryId
        ) {

          return entry;

        }


        return {

          ...entry,


          date:
            payload.date,


          foodRevenue:
            Number(
              payload.foodRevenue || 0
            ),


          beverageRevenue:
            Number(
              payload.beverageRevenue || 0
            ),


          foodCost:
            Number(
              payload.foodCost || 0
            ),


          beverageCost:
            Number(
              payload.beverageCost || 0
            ),


          fixCost:
            Number(
              payload.fixCost || 0
            ),


          budget:
            Number(
              payload.budget || 0
            )

        };

      }
    );


  saveAllEntries(
    updated
  );

}





// ======================
// DELETE
// ======================

function deleteEntry(
  entryId
) {

  const entries =
    getAllEntries();


  const filtered =
    entries.filter(
      entry =>

        entry.id !=
        entryId
    );


  saveAllEntries(
    filtered
  );

}





// ======================
// FILTER
// ======================

function filterEntries(
  year,
  month
) {

  return getAllEntries()

    .filter(
      entry => {

        const date =
          new Date(
            entry.date
          );


        return (

          date.getFullYear() ===
            year &&

          date.getMonth() + 1 ===
            month

        );

      }
    )

    .sort(
      (
        a,
        b
      ) =>

        new Date(
          a.date
        ) -

        new Date(
          b.date
        )
    );

}





// ======================
// CLEAR
// ======================

function clearAllEntries() {

  localStorage.removeItem(
    ENTRY_STORAGE_KEY
  );

}
