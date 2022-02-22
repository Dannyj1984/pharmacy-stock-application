//JS functions

//DynamicSort - sort the array of objects using the Medication field
//DeleteRows - delete all rows other than the head from the specified table
//showStockList - display the current stocklist in the console and on the dashboard
//listFormulary = displau the current stocklist in the console and on the dashboard
//addMedication - add medication to the formulary
//addMedicationToStock - add medication to the stocklist
//runFormulary - run the current set of hardcoded functions to add the required medication to the formulary
//runStock - run the current set of hardcoded functions to add medication to the stock list
//reduceStock - reduce the number of packs in stock
//addRowToFormulary - update the formulary table
//addRowToStock - update the stock table


/**
 * Helper function to sort values in the stockList alphabetically
 * @param {String} property - the key of the object by which to sort the values
 * @returns the sorted list
 */
function dynamicSort (property)  {
    var sortOrder = 1;
    return function (a,b) {
        //check the values for the passed in property and sort by alphabetical order
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

/**
 * @param tableId - the id of the table to delete rows from
 */
function DeleteRows (tableId) {
    var rowCount = tableId.rows.length;
    for (var i = rowCount - 1; i > 0; i--) {
        tableId.deleteRow(i);
    }
}

//initialise empty array for the formulary list
let formulary = [];

//initialise empty array for the stocklist
let stockList = [];

//show the current stocklist as a table on the console.
//The stocklist will be sorted using the dynamic sort function and sorted on the medication key
 showStockList = () => {
    console.table(stockList.sort(dynamicSort("Medication")))
    addRowToStock("stTable")
}

//Show the formulary as a list on the console
function listFormulary () {
    console.log("CURRENT FORMULARY");
    console.table(formulary.sort());
    addRowToFormulary("formTable");
}

//button on the dashboard, when clicked will call the function to add a medication to the formulary as per the requirements
var formularyButton = document
  .querySelector("#formularyBtn")
  .addEventListener("click", () => {
    this.runFormulary();
  });

  //Button on the dashboard in index.html, when clicked will call the function to add stock as per the requirements
  var stockButton = document
  .querySelector("#stockBtn")
  .addEventListener("click", () => {
    this.runStock();
  });

  //Declare the formulary button and onClick, get the value from the formulary input
  var newFormularyButton = document
  .querySelector("#formularySave")
  .addEventListener("click", (e) => {
      e.preventDefault();
      var medName = document.getElementById("mednameFormulary").value;
      console.log(`${medName}`);
      //Check the input isnt empty
      if(medName === "") {
        alert('Please ensure all fields are correctly filled in');
        console.log("Some information is missing, please ensure all fields are correctly filled in")
      } else {
          //As long as not empty, pass the value from the input to the addMedication function
      var medication = [{Medication : medName}];
      
      this.addMedication(medication);
      } 
  });

  //Declare the add to stock button and onClick, get the values from the inputs
  var newStockButton = document
  .querySelector("#stockSave")
  .addEventListener("click", (e) => {
      e.preventDefault();
      var medName = document.getElementById("medname").value;
      var medStrength = document.getElementById("medstrength").value;
      var medPackSize = document.getElementById("medpacksize").value;
      var medQuantity = document.getElementById("noofpacks").value;
      var medication = {Medication : medName, Strength : medStrength, PackSize : medPackSize};
      //check that all values are not empty before calling the function to add to stock.

      if(medName === "" || medStrength === "" || medPackSize === "" || medQuantity === "") {
          alert('Please ensure all fields are correctly filled in');
          console.log("Some information is missing, please ensure all fields are correctly filled in")
      } else {
          console.log(`${medQuantity}`)
      this.addToStock(medication, parseInt(medQuantity));
      }
  });

  /**
   * Function to add medication to the formulary. the parameter is an array of String, this allows 
   * one or more meds to be added at the same time
   * @param {array} medication 
   */
   function addMedication (medication) {
    var newMedList = medication;
            
            //Loop through the array 
            for(var med of newMedList) {
                //Change the string value to lowercase and trim and leading or trailing whitespace, this will ensure that if the same medication is entered
                //with different capitalisation, or unintended leading and trailing whitespace, it cant be added twice.
                var lowerCase = med.Medication.toLowerCase().trim();
                // Medication name must be unique in the formulary so check if the formulary array already contains this medication
                var check = formulary.includes(lowerCase);
                //if the formulary does not contain this medication, then add it to the formulary
                if(!check) {
                    formulary.push(lowerCase);
                    //If it does contain this medication. log to the console and alert the user of this
                } else {
                    console.log(`${lowerCase} is already in the formualary`);
                    alert(`${lowerCase} is already in the formulary`);
                }
            }
            //Show the list of items in the formulary on the console
            listFormulary();
            addRowToFormulary("formTable")
    }

  /**
   * add medication to stock, taking a medication object, containing a Medication, Strength and PackSize. then a quantity of packs.
   * only add the medication if the medication already exists in the formulary.
   * @param {object} medication 
   * @param {int} quantity 
   */
   function addToStock (medication, quantity) {
       //Check if quantity is a number
       if(!Number.isNaN(parseInt(quantity))) {
           
        //transoform the medication to be added to lowercase and trime leading any trailing whitespace.
            lowerCaseMed = medication.Medication.toLowerCase().trim();

            //Check if the current medication exists in the formulary list
            var check = formulary.includes(lowerCaseMed);

            //Check if the medication being added, already exists in the stockList
            var exists = stockList.some(m => m.Medication === lowerCaseMed)

            //If the medication is in the formulary list, and already exists in the stocklist go ahead and add it to the stock list
            if(check) {
                //new object which will contain details of the new medication to add to the stoclist
                var newMed = {}
                if(exists) {
                    //Filter over the stocklist and get the medication which matches the medication to be added.
                    stockList.filter( ({Medication}) => Medication === lowerCaseMed)[0]
                    //Update the total packs of the medication to include the quantity added.
                    .TotalPacks = stockList.filter( ({Medication}) => Medication === lowerCaseMed)[0].TotalPacks + quantity;
                    console.log(`${quantity} packs of ${medication.Medication} added to stock`);


                    //If the medication to be added, is not already in the stocklist
                    //create the new medication object from the parameters passed in and create it.
                    } else {
                        newMed = {
                            Medication: lowerCaseMed,
                            Strength: medication.Strength,
                            PackSize: medication.PackSize,
                            TotalPacks: quantity
                        }
                        //Add the new medication object to the stocklist.
                    stockList.push(newMed)
                    console.log(`${quantity} packs of ${medication.Medication} added to stock`);
                    }
        

                    //If the medication is not in the formulary list, then it cannot be added to stock, log this to the console and display alert to the user.
                } else {
                    console.log(`${medication.Medication} is not in the formulary, cannot be added to the stock list`);
                    alert(`${medication.Medication} is not in the formulary. Cannot be added to stock list`);
                }
                //Show the stocklist in the console as a table.
                showStockList();
                addRowToStock("stTable");
        } else {
            console.log(`Please check the value entered for "Number of packs to add" and ensure it is a number`);
        }
            
    }

//function to add medication to the formulary as required
  function runFormulary () {
    console.log("FORMULARY UPDATE");

    addMedication([{Medication : "Paracetamol"}, {Medication : "Ibuprofen"}]);
    console.log(`addMedication(["Paracetamol", "Ibuprofen"]);`);
    console.log("Added paracetamol and ibuprofen to the formulary");
    console.log(`${formulary}`);
    
    addMedication([{Medication : "Amoxicillin"}]);
    console.log(`addMedication(["Amoxicillin"]);`);
    console.log("Added Amoxicillin to the formulary");
    console.log(`${formulary}`);
    
    addMedication([{Medication : "Codeine"}, {Medication : "Diclofenac"}, {Medication : "Simvastatin"}, {Medication : "Tramadol"}]);
    console.log(`addMedication(["Codeine", "Diclofenac", "Simvastatin", "Tramadol"]);`);
    console.log("Added Codeine, Diclofenac, Simvastatin and Tramadol to the formulary");

    addRowToFormulary("formTable");
    const table = document.querySelector('#formulary');
    table.scrollIntoView();
    
}

//Function to add stock to the stocklist
  function runStock () {
    console.log("--------------------------------------------------------------------")
    console.log("STOCK UPDATE");
    console.log(`addToStock({Medication:"Paracetamol", Strength:"500mg", PackSize:"50"}, 100);`);
    addToStock({Medication:"Paracetamol", Strength:"500mg", PackSize:"50"}, 100);
    console.log(`addToStock({Medication:"Ibuprofen", Strength:"500mg", PackSize:"50"}, 100);`)
    addToStock({Medication:"Ibuprofen", Strength:"500mg", PackSize:"50"}, 100);
    console.log(`addToStock({Medication:"Amoxicillin", Strength:"250mg", PackSize:"20"}, 20);`)
    addToStock({Medication:"Amoxicillin", Strength:"250mg", PackSize:"20"}, 20);
    console.log(`addToStock({Medication:"Tramadol", Strength:"50mg", PackSize:"100"}, 5);`)
    addToStock({Medication:"Tramadol", Strength:"50mg", PackSize:"100"}, 5);
    console.log(`addToStock({Medication:"Codeine", Strength:"30mg", PackSize:"10"}, 20);`)
    addToStock({Medication:"Codeine", Strength:"30mg", PackSize:"10"}, 20);
    console.log(`addToStock({Medication:"Simvastatin", Strength:"10mg", PackSize:"10"}, 10);`)
    addToStock({Medication:"Simvastatin", Strength:"10mg", PackSize:"10"}, 10);
    console.log(`addToStock({Medication:"Warfarin", Strength:"3mg", PackSize:"50"}, 5); `)
    addToStock({Medication:"Warfarin", Strength:"3mg", PackSize:"50"}, 5); 
    addRowToStock("stTable");
    const table = document.querySelector('#stock');
    table.scrollIntoView();
}

/**
 * take the medication and reduces the stock by the quantity passed.
*@param {object} medication 
* @param {int} quantity
 */
function reduceStock (medication, quantity) {
    //Transform medication to lowercase
    var lowerCase = medication.Medication.toLowerCase();
    //Check if the medication being added, already exists in the stockList
    var exists = stockList.some( ({Medication}) => Medication === lowerCase);
        //If the medication is already present in the stocklist, loop through all meds in the stockList,
        if(exists){
            //Check that there is enough stock to take this number of packs
            if(stockList.filter(({Medication}) => Medication === medication.Medication)[0].TotalPacks - quantity >= 0) {
                //Filter the stocklist and update the Total stock value
                stockList.filter( 
                    ({Medication}) => Medication === medication.Medication)[0]
                    //Update total packs in stock to the current value minus the value taken out of stock
                    .TotalPacks = stockList.filter( ({Medication}) => Medication === medication.Medication)[0].TotalPacks - parseInt(quantity);
            } else {
                //If not enough stock, let the user know.
                console.log(`There is not enough ${medication.Medication} in stock to take ${quantity} packs`);
            }

             
        } else {
            //If the medication is not in the stock list. Let the user know that there is no stock
            console.log(`Sorry, there are currently no ${medication.Medication} in stock`);
        }
        addRowToStock("stTable");
}

/**
 * Get the id of the formulary table and loop through all items in the formulary and display them in a table
 * @param tableID - get the id of the table to add a formulary row to
 */
  function addRowToFormulary (tableID) {
    // Get a reference to the table
    let tableRef = document.getElementById(tableID);
    //Empty the table ready for repopulating with the new formulary
    DeleteRows(tableRef);

    for (let i = 0; i < formulary.length; i++) {
    // Insert a row at the end of the table
    let newRow = tableRef.insertRow(-1);

        for(let cell = 0; cell < 2; cell ++) {
            //add a new cell to the row
            const cellElement = newRow.insertCell(cell);
            let text;
            //if at the first cell, set text to the index numbner
            if(cell === 0) {
                text = i;
            } else {
                //if at the second cell, set text to the value from the formulary at that index.
                text = formulary[i];
            }

            //add the cell to the table and create a new textNode with the value of text
            cellElement.appendChild(document.createTextNode(text));
        }
    }
  }

  /**
 * Get the id of the stock table and loop through all items in the sotck list and display them in a table
 * @param tableID - get the id of the table to add a row of stock to
 */
  function addRowToStock (tableID) {
    // Get a reference to the table
    let tableRef = document.getElementById(tableID);
    //Empty table ready for populating with the new/updated stocklist
    DeleteRows(tableRef);

    //Loop through each item in the stocklist
   for (let i = 0; i < stockList.length; i++) {
    // Insert a row at the end of the table
    let newRow = tableRef.insertRow(-1);
    //create an array of keys
    let keys = ['Medication', 'Strength', 'PackSize', 'TotalPacks'];

    //Loop through 5 times, once for each row
    for(let cell = 0; cell < 5; cell++){
        //add new cell to the row at the value of cell
        const cellElement = newRow.insertCell(cell);
        let text;

        //In the first cell show the index number of that medication
        if(cell === 0) {
        text = i;
        } else {
            //set text to the value in the stocklist at the current element
            text = stockList[i][keys[cell-1]]
        }

        //add the cell and create a textNode for that cell with the value of text
        cellElement.appendChild(document.createTextNode(text));

        //if the total packs remaining value is less than 10, then set the class for the cell to show red text
        if(stockList[i].TotalPacks < 10) {
            cellElement.classList.add('red-text');
        }
    }
    }
    
  }

  
  
  










  











          












