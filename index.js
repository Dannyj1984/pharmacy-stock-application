/**
 * Helper function to sort values in the stockList alphabetically
 * @param {String} property - the key of the object by which to sort the values
 * @returns the sorted list
 */
function dynamicSort(property) {
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

//initialise empty array for the formulary list
let formulary = [];

//initialise empty array for the stocklist
let stockList = [];

//show the current stocklist as a table on the console.
//The stocklist will be sorted using the dynamic sort function and sorted on the medication key
 showStockList = () => {
    console.table(stockList.sort(dynamicSort("Medication")))
}

//Show the formulary as a list on the console
listFormulary = () => {
    console.log("CURRENT FORMULARY");
    console.table(formulary.sort());
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

  /**
   * Function to add medication to the formulary. the parameter is an array of String, this allows 
   * one or more meds to be added at the same time
   * @param {array} medication 
   */
  function addMedication(medication) {
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
  } 

  /**
   * add medication to stock, taking a medication object, containing a Medication, Strength and PackSize. then a quantity of packs.
   * only add the medication if the medication already exists in the formulary.
   * @param {object} medication 
   * @param {int} quantity 
   */
  function addToStock(medication, quantity) {
    lowerCaseMed = medication.Medication.toLowerCase();
    //Check if the current medication exists in the formulary list
    var check = formulary.includes(lowerCaseMed);
    //Check if the medication being added, already exists in the stockList
    var exists = stockList.some(m => m.Medication === medication.Medication)
    //If the medication is in the formulary list, go ahead and add it to the stock list
    if(check) {
        //new object which will contain details of the new medication to add to the stoclist
        var newMed = {}
        //If the medication is already present in the stocklist, loop through all meds in the stockList,
        if(exists){
             stockList.forEach(med => {

                //  If the name of the current medication in the loop, matches that of the medication being added,
                 if(med.Medication === medication.Medication){
                     //Get the index from the array of this medication,
                     var index = stockList.findIndex(med => med.Medication === medication.Medication)
                     //Update the medication object totalPacks value with the current value + the amount to be added
                     stockList[index].TotalPacks = med.TotalPacks + quantity;
                    
                 }
             })
             //If the medication to be added, is not already in the stocklist
             //create the new medication object from the parameters passed in and create it.
        } else {
            newMed = {
                Medication: medication.Medication,
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
}

//function to add medication to the formulary as required
  runFormulary = () => {
    console.log("FORMULARY UPDATE")

    addMedication([{Medication : "Paracetamol"}, {Medication : "Ibuprofen"}]);
    console.log(`addMedication(["Paracetamol", "Ibuprofen"]);`)
    console.log("Added paracetamol and ibuprofen to the formulary")
    console.log(formulary);
    
    addMedication([{Medication : "Amoxicillin"}]);
    console.log(`addMedication(["Amoxicillin"]);`)
    console.log("Added Amoxicillin to the formulary")
    console.log(formulary);
    
    addMedication([{Medication : "Codeine"}, {Medication : "Diclofenac"}, {Medication : "Simvastatin"}, {Medication : "Tramadol"}]);
    console.log(`addMedication(["Codeine", "Diclofenac", "Simvastatin", "Tramadol"]);`)
    console.log("Added Codeine, Diclofenac, Simvastatin and Tramadol to the formulary")
    
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
}







  











          












