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
dynamicSort = (property) => {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

//Function to delete all rows other thant he header in a table before re populating with data
DeleteRows = (tableId) => {
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
listFormulary = () => {
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

  var newFormularyButton = document
  .querySelector("#formularySave")
  .addEventListener("click", () => {
      var medName = document.getElementById("mednameFormulary").value;
      console.log(medName)
      if(medName === "") {
        alert('Please ensure all fields are correctly filled in');
        console.log("Some information is missing, please ensure all fields are correctly filled in")
      } else {
      var medication = [{Medication : medName}];
      
      this.addMedication(medication);
      } 
  });

  var newStockButton = document
  .querySelector("#stockSave")
  .addEventListener("click", () => {
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
          console.log(medQuantity)
      this.addToStock(medication, parseInt(medQuantity));
      }
  });

  /**
   * Function to add medication to the formulary. the parameter is an array of String, this allows 
   * one or more meds to be added at the same time
   * @param {array} medication 
   */
   addMedication = (medication) => {
    var newMedList = medication;
            
            //Loop through the array 
            for(var med of newMedList) {
                //Change the string value to lowercase, this will ensure that if the same medication is entere
                //in uppercase and then lowercase, it cant be added twice.
                var lowerCase = med.Medication.toLowerCase();
                //Check if the formulary array already contains this medication
                var check = formulary.includes(lowerCase);
                //if the formulary does not contain this medication, then add it to the formulary
                if(!check) {
                    formulary.push(lowerCase);
                    //If it does contain this medication. log to the console and alert the user of this
                } else {
                    console.log(lowerCase+ " is already in the formualary");
                    alert(lowerCase +" is already in the formulary");
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
   addToStock = (medication, quantity) => {
    lowerCaseMed = medication.Medication.toLowerCase();
    //Check if the current medication exists in the formulary list
    var check = formulary.includes(lowerCaseMed);
    //Check if the medication being added, already exists in the stockList
    var exists = stockList.some(m => m.Medication === lowerCaseMed)
    //If the medication is in the formulary list, go ahead and add it to the stock list
    if(check) {
        //new object which will contain details of the new medication to add to the stoclist
        var newMed = {}
        //If the medication is already present in the stocklist, loop through all meds in the stockList,
        if(exists){
             stockList.forEach(med => {

                //  If the name of the current medication in the loop, matches that of the medication being added,
                 if(med.Medication === lowerCaseMed){
                     //Get the index from the array of this medication,
                     var index = stockList.findIndex(med => med.Medication === lowerCaseMed)
                     //Update the medication object totalPacks value with the current value + the amount to be added
                     var number = med.TotalPacks + quantity
                     stockList[index].TotalPacks = parseInt(number);
                    
                 }
             })
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
        }
        

        //If the medication is not in the formulary list, then it cannot be added to stock, log this to the console and display alert to the user.
  }  else {
      console.log(medication.Medication + " is not in the formulary, cannot be added to the stock list");
        alert(medication.Medication + " is not in the formulary. Cannot be added to stock list");
    }
    //Show the stocklist in the console as a table.
    showStockList();
    addRowToStock("stTable");
}

//function to add medication to the formulary as required
  runFormulary = () => {
    console.log("FORMULARY UPDATE");

    addMedication([{Medication : "Paracetamol"}, {Medication : "Ibuprofen"}]);
    console.log(`addMedication(["Paracetamol", "Ibuprofen"]);`);
    console.log("Added paracetamol and ibuprofen to the formulary");
    console.log(formulary);
    
    addMedication([{Medication : "Amoxicillin"}]);
    console.log(`addMedication(["Amoxicillin"]);`);
    console.log("Added Amoxicillin to the formulary");
    console.log(formulary);
    
    addMedication([{Medication : "Codeine"}, {Medication : "Diclofenac"}, {Medication : "Simvastatin"}, {Medication : "Tramadol"}]);
    console.log(`addMedication(["Codeine", "Diclofenac", "Simvastatin", "Tramadol"]);`);
    console.log("Added Codeine, Diclofenac, Simvastatin and Tramadol to the formulary");

    addRowToFormulary("formTable");
    
}

//Function to add stock to the stocklist
  runStock = () => {
    console.log("--------------------------------------------------------------------")
    console.log("STOCK UPDATE");
    addToStock({Medication:"Paracetamol", Strength:"500mg", PackSize:"50"}, 100);
    addToStock({Medication:"Ibuprofen", Strength:"500mg", PackSize:"50"}, 100);
    addToStock({Medication:"Amoxicillin", Strength:"250mg", PackSize:"20"}, 20);
    addToStock({Medication:"Tramadol", Strength:"50mg", PackSize:"100"}, 5);
    addToStock({Medication:"Codeine", Strength:"30mg", PackSize:"10"}, 20);
    addToStock({Medication:"Simvastatin", Strength:"10mg", PackSize:"10"}, 10);
    addToStock({Medication:"Warfarin", Strength:"3mg", PackSize:"50"}, 5); 
    addRowToStock("stTable");
}

/**
 * take the medication and reduces the stock by the quantity passed.
*@param {object} medication 
* @param {int} quantity
 */
reduceStock = (medication, quantity) => {
    //Transform medication to lowercase
    var lowerCase = medication.Medication.toLowerCase();
    //Check if the medication being added, already exists in the stockList
    var exists = stockList.some(m => m.Medication === lowerCase)
        //If the medication is already present in the stocklist, loop through all meds in the stockList,
        if(exists){
             stockList.forEach(med => {

                //  If the name of the current medication in the loop, matches that of the medication being added,
                 if(med.Medication === lowerCase){
                     //Get the index from the array of this medication,
                     var index = stockList.findIndex(med => med.Medication === lowerCase)
                     //Update the medication object totalPacks value with the current value + the amount to be added
                     stockList[index].TotalPacks = med.TotalPacks - quantity;
                    
                 }
             })
             //If the medication to be added, is not already in the stocklist
             //create the new medication object from the parameters passed in and create it.
        } else {
            console.log("Sorry, there are currently no " + medication.Medication + " in stock");
        }
        addRowToStock("stTable");
}

/**
 * Get the id of the formulary table and loop through all items in the formulary and display them in a table
 */
  addRowToFormulary = (tableID) => {
    // Get a reference to the table
    let tableRef = document.getElementById(tableID);
    //Empty the table ready for repopulating with the new formulary
    DeleteRows(tableRef);

   for (let i = 0; i < formulary.length; i++) {
    // Insert a row at the end of the table
    let newRow = tableRef.insertRow(-1);

    // Insert a cell in the row at index 0
    let newCell = newRow.insertCell(0);
    let newCell2 = newRow.insertCell(1);
    
    // Append a text node to the cell
    let newText = document.createTextNode(i);
    let newText2 = document.createTextNode(formulary[i]);
    
    newCell.appendChild(newText);
    newCell2.appendChild(newText2);
    }
    
  }

  /**
 * Get the id of the stock table and loop through all items in the sotck list and display them in a table
 */
  addRowToStock = (tableID) => {
    // Get a reference to the table
    let tableRef = document.getElementById(tableID);
    //Empty table ready for populating with the new stocklist
    DeleteRows(tableRef);

   for (let i = 0; i < stockList.length; i++) {
    // Insert a row at the end of the table
    let newRow = tableRef.insertRow(-1);

    // Insert a cell in the row at index 0
    let newCell = newRow.insertCell(0);
    let newCell2 = newRow.insertCell(1);
    let newCell3 = newRow.insertCell(2);
    let newCell4 = newRow.insertCell(3);
    let newCell5 = newRow.insertCell(4);
    
    // Append a text node to the cell
    let newText = document.createTextNode(i);
    let newText2 = document.createTextNode(stockList[i].Medication);
    let newText3 = document.createTextNode(stockList[i].Strength);
    let newText4 = document.createTextNode(stockList[i].PackSize);
    let newText5 = document.createTextNode(stockList[i].TotalPacks);

    
    newCell.appendChild(newText);
    newCell2.appendChild(newText2);
    newCell3.appendChild(newText3);
    newCell4.appendChild(newText4);
    newCell5.appendChild(newText5);
    }
    
  }

  
  
  










  











          












