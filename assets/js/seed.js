(function seedDummyData() {

  const existing =
    getAllEntries();


  if (
    existing.length
  ) return;



  const today =
    new Date();


  for (
    let i = 1;
    i <= 10;
    i++
  ) {

    const date =
      new Date(
        today.getFullYear(),
        today.getMonth(),
        i
      );


    addEntry({

      date:
        date
          .toISOString()
          .split(
            "T"
          )[0],


      foodRevenue:
        3000 +
        (
          i * 200
        ),


      beverageRevenue:
        1800 +
        (
          i * 100
        ),


      foodCost:
        1000 +
        (
          i * 50
        ),


      beverageCost:
        500 +
        (
          i * 30
        ),


      fixCost:
        700,



      budget:
        4000

    });

  }

})();
