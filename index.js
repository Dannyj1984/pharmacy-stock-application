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

let formulary = []

function addMedication(medication) {
    var newMedList = medication;
    for(var med of newMedList) {
        var lowerCase = med.Medication.toLowerCase();
        var check = formulary.includes(lowerCase);
        if(!check) {
            formulary.push(lowerCase)
        } else {
            alert(lowerCase +" is already in the formulary");
        }
    }
}   

function listFormulary() {
    console.table(formulary.sort());
}



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
console.log(formulary);

console.log("Show formulary");
listFormulary();


console.log("--------------------------------------------------------------------")
console.log("STOCK UPDATE");

const column = (["Medication", "Strength", "PackSize", "TotalPacks"])
          
let stockList = []
function addToStock(medication, quantity) {
        lowerCaseMed = medication.Medication.toLowerCase();
        //Check if the current medication exists in the formulary list
        var check = formulary.includes(lowerCaseMed);
        //Check if the medication being added, already exists in the stockList
        var exists = stockList.some(m => m.Medication === medication.Medication)   
        if(check) {
            var newMed = {}
            if(exists){
                 stockList.forEach(med => {
                     if(med.Medication === medication.Medication){
                         var index = stockList.findIndex(med => med.Medication === medication.Medication)
                         console.log(index)
                         stockList.splice(index, 1);
                         var packs = quantity;
                        newMed = {
                            Medication: medication.Medication,
                            Strength: medication.Strength,
                            PackSize: medication.PackSize,
                            TotalPacks: med.TotalPacks + packs
                        }
                     }
                 })
            } else {
                newMed = {
                    Medication: medication.Medication,
                    Strength: medication.Strength,
                    PackSize: medication.PackSize,
                    TotalPacks: quantity
                }
            }
            stockList.push(newMed)
      }  else {
            alert(medication.Medication + " is not in the formulary. Cannot be added to stock list")
        }
        showStockList();
}



function showStockList() {
    stockList.sort(dynamicSort("Medication"))
    console.table(stockList, column)
}

addToStock({Medication:"Paracetamol", Strength:"500mg", PackSize:"50"}, 100);
addToStock({Medication:"Ibuprofen", Strength:"500mg", PackSize:"50"}, 100);
addToStock({Medication:"Amoxicillin", Strength:"250mg", PackSize:"20"}, 20);
addToStock({Medication:"Tramadol", Strength:"50mg", PackSize:"100"}, 5);
addToStock({Medication:"Codeine", Strength:"30mg", PackSize:"10"}, 20);
addToStock({Medication:"Simvastatin", Strength:"10mg", PackSize:"10"}, 10);
addToStock({Medication:"Warfarin", Strength:"3mg", PackSize:"50"}, 5);




