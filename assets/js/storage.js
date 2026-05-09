const ENTRY_STORAGE_KEY =
  "skybar_entries";





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
      "Storage error:",
      error
    );

    return [];

  }

}





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





function addEntry(
  payload
) {

  const entries =
    getAllEntries();


  const newEntry = {

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
    newEntry
  );


  saveAllEntries(
    entries
  );


  return newEntry;

}





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





function clearAllEntries() {

  localStorage.removeItem(
    ENTRY_STORAGE_KEY
  );

}





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
