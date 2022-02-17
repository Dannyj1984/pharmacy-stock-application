# pharmacy-stock-application
This application is a solution for pharmacy software where the end user needs to keep a formulary of medications which they can dispense, and
also a stock control system. 

## Formulary

A member of the pharmacy store can add new medications to the current formulary as well as view the current formulary as a list. If the medication already exists on the formulary, then a warning will be printed to console and also alert the user in the browser. To ensure that medications are not duplicated in the formulary, a check is made before adding the medication to the current formulary list. This includes converting the medication to lowercase, before checking and adding to the formulary list. This ensure that if medications are written with different capitalsation, they will not accidentally be added, if that medication already exists.

## usage

The application is currently hardcoded with code to update the formulary, from the dashboard, click the button named 'update formulary' which will run the code and output to the console and also display the current formulary items on the dashboard in table format. The formulary is saved as an array and is output as a table using console.table() with the array sorted so that the list is in alphabetical order making it easy to find a medication as the formulary grows.

You can add further medication to the formulary by typing into the console, adter adding medication in this way, the formulary table will update on the dashboard.

````bash
addMedication([{Medication : "medicationName"}]);
````
where 'medicationName' is the name of the medication you want to add. The code allows multiple medications to be added at the same time, by separating each entry with a , as below

````bash
addMedication([{Medication : "medicationName1"}, {Medication : "medicationName2"}]);
````

running the code to add 2 medications, Simvastatin and Tramadol to the formulary would look like this,

````bash
addMedication([{Medication : "Simvastatin"}, {Medication : "Tramadol"}]);
````

and the output in the cosole,

````bash
(index)     value

0	     'simvastatin'
1	     'tramadol'
````

 If you would like to just view the formulary list, without adding anything, you can run the following from the console,

 ````bash
listFormulary();
 ````

## Stock
A member of the pharmacy team can add new medication received into stock and also view the current stock available. Only medication in the formulary list can be added to stock. If the medication is not currently in the formulary list, a warning will be printed to the console and alerted to the user in the browser.

The stock list consists of the medication name, the strength of the medication, the packsize and also the total packs in stock. To add new stock, the user will add the medication name, strength and packsize. The first step when adding a new medication to stock, is to check if that medication exists in the formulary, as with the formulary, the medication name is changed to lowercase first if it does not then an alert is given and a message printed to the console. If the medication is in the formulary, the next step is to check if that medication is already in the stock list, . if it is not in the list, then it can simply be added, with the medication, strength, packsize and number of packs. If the medication is already in the stock list, then we can update the value for totalPacks for that object, to the current value + the quantity to be added.

## Usage

To run the code to update the stock, click the button on the dashboard named 'update stock' which will run the code and output to the console and display the current stock on the dashboard in a table.. The stocklist consists of an array of objects.

further medication can be added to the stock list with the following code written in the console

````bash
addToStock({Medication:"medicationName", Strength:"medStrength", PackSize:"medPackSize"}, quantity);
````
Only one medication can be added to the stock list as a time. If you add a medication that is already in the stock list, then the number of packs to be added is added to the current total number of packs. After adding a new medication to stock, the current stock list will be updated on the dashboard

for example, if adding 100 x 100 packs of 500mg paracetamol,

````bash
addToStock({Medication:"Paracetamol", Strength:"500mg", PackSize:"100"}, 100);
````

````bash
(index)    Medication    Strength    PackSize    TotalPacks

0	    'Paracetamol'	 '500mg'	 '100'	        100
````

if you then add another 100 x 100 paracetamol 500mg the stock list would show total packs as 200

````bash
(index)    Medication    Strength    PackSize    TotalPacks

0	    'Paracetamol'	 '500mg'	 '100'	        200
````

If you would just like to view the list of stock without adding new stock, you can run the following,

 ````bash
showStockList();
 ````

 The current code which is hardcoded into javascript attempts to add some warfarin tablets with the following code,

 ````bash
addToStock({Medication:"Warfarin", Strength:"3mg", PackSize:"50"}, 5);
 ````

 As warfarin is not currently in the formulary after pressing the 'update formulary' button, then an alert will be shown and a message printed to console warning the user of this. If you try to add any other medication not in the formulary, then you will receive a similar error.

 In addition to the requirements set out, I have also added a function to reduce the amount of stock which can be used when medication is dispensed, allowing the pharmacy to monitor when stock may need reordering. This method can be called from the console with, 
 ````bash
reduceStock({Medication : "medName"}, quantity)
 ````

 Where medName is the name of the medication to reduce and the quantity is the number of packs to reduce stock by. A check is carried out first to ensure that there is stock available, and if no stock is available, then a message is printed to console


## Project status

This project is currently a proof of concept, I have made some simple simple navigation with 3 pages for the dashboard, formulary and stock. Some more additions to the HTML to show input boxes and buttons, which could be used for the end user to update the formulary and stock, but these are not yet connected to the javascript code to update the formulary and array. 

The next stage would be to add to the frontend and also implement some backend code and persistence, so that the formulary and stock lists are stored in a database so that they can be accessed and the data is saved when the application is closed and re opened.

