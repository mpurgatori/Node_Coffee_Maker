#!/usr/bin/env node
'use strict';


const program = require('vorpal')()

//Object that keeps track of inventory quantity
let ingredients = {
  coffee: 10,
  decaf_coffee: 10,
  sugar: 10,
  cream: 10,
  steamed_milk: 10,
  foamed_milk: 10,
  espresso: 10,
  cocoa: 10,
  whipped_cream: 10
}

//Function that is passed as a callback and deducts inventory as they are used
const ingredientDeduction = function(obj,c,dc,s,cr,sm,fm,e,co,wc){
  obj.coffee = obj.coffee - c;
  obj.decaf_coffee = obj.decaf_coffee - dc;
  obj.sugar = obj.sugar - s;
  obj.cream = obj.cream - cr;
  obj.steamed_milk = obj.steamed_milk - sm;
  obj.foamed_milk = obj.foamed_milk - fm;
  obj.espresso = obj.espresso - e;
  obj.cocoa = obj.cocoa - co;
  obj.whipped_cream = obj.whipped_cream - wc
}

//Function passed as a callback and resets inventory levels to 10
const ingredientReset = function(obj,c,dc,s,cr,sm,fm,e,co,wc){
  for (let prop in obj){
    obj[prop]=10;
  }
}


//Function takes ingredient level callbacks and logs current inventory
let ingredientDisplay = function(func,c,dc,s,cr,sm,fm,e,co,wc){
    func(ingredients,c,dc,s,cr,sm,fm,e,co,wc)
    console.log(`Inventory:`)
    console.log(` Cocoa,${ingredients.cocoa}`)
    console.log(` Coffee,${ingredients.coffee}`)
    console.log(` Cream,${ingredients.cream}`)
    console.log(` Decaf Coffee,${ingredients.decaf_coffee}`)
    console.log(` Espresso,${ingredients.espresso}`)
    console.log(` Foamed Milk,${ingredients.foamed_milk}`)
    console.log(` Steamed Milk,${ingredients.steamed_milk}`)
    console.log(` Sugar,${ingredients.sugar}`)
    console.log(` Whipped Cream,${ingredients.whipped_cream}`)
}

//Logs the menu items and weather they are instock depending on current inventory levels
const displayMenu = function(){
  console.log(`Menu:`)
  console.log(` 1,Caffe Americano,$3.30,${ingredients.espresso>=3}`)
  console.log(` 2,Caffe Latte,$2.55,${ingredients.espresso>=2 && ingredients.steamed_milk>=1}`)
  console.log(` 3,Caffe Mocha,$3.35,${ingredients.espresso>=1 && ingredients.steamed_milk>=1 && ingredients.cocoa>=1 && ingredients.whipped_cream>=1}`)
  console.log(` 4,Cappuccino,$2.90,${ingredients.espresso>=2 && ingredients.steamed_milk>=1 && ingredients.foamed_milk>=1}`)
  console.log(` 5,Coffee,$2.75,${ingredients.coffee>=3 && ingredients.sugar>=1 && ingredients.cream>=1}`)
  console.log(` 6,Decaf Coffee,$2.75,${ingredients.decaf_coffee>=3 && ingredients.sugar>=1 && ingredients.cream>=1}`)
}

//Display full inventory and menu items on app start
ingredientDisplay(ingredientDeduction,0,0,0,0,0,0,0,0,0)
displayMenu()

//Displays invalid selection for any inputs that are not defined
program
.catch('[selection...]', 'Catches incorrect commands')
   .action((args,callback)=> {
       console.log(`Invalid selection: ${args.selection.join(' ')}`);
       callback();
   });

//inputs r or R reset inventory levels and displays inventory and menu
program
  .command('r')
  .alias('R')
  .description('Restock the machine')
  .action((args, callback)=> {
    ingredientDisplay(ingredientReset,0,0,0,0,0,0,0,0,0)
    displayMenu()
    callback()
  })

//Input 1 deducts ingredients for Caffe Americano and displays new inventory and menu
program
  .command('1')
  .description('Order a Caffe Americano')
  .action((args, callback)=> {
    if(ingredients.espresso>=3){
      console.log('Dispensing: Caffe Americano')
        ingredientDisplay(ingredientDeduction,0,0,0,0,0,0,3,0,0)
      }
    else {
      console.log('Out of stock: Caffe Americano')
      ingredientDisplay(ingredientDeduction,0,0,0,0,0,0,0,0,0)
    }
    displayMenu()
    callback()
  })

//Input 2 deducts ingredients for Caffe Latte and displays new inventory and menu
program
  .command('2')
  .description('Order a Caffe Latte')
  .action((args, callback)=> {
    if(ingredients.espresso>=2 && ingredients.steamed_milk>=1){
      console.log('Dispensing: Caffe Latte')
        ingredientDisplay(ingredientDeduction,0,0,0,0,1,0,2,0,0)
      }
      else {
        console.log('Out of stock: Caffe Latte')
        ingredientDisplay(ingredientDeduction,0,0,0,0,0,0,0,0,0)
      }
      displayMenu()
      callback()
    })

//Input 3 deducts ingredients for Caffe Mocha and displays new inventory and menu
program
  .command('3')
  .description('Order a Caffe Mocha')
  .action((args, callback)=> {
    if(ingredients.espresso>=1 && ingredients.steamed_milk>=1 && ingredients.cocoa>=1 && ingredients.whipped_cream>=1){
      console.log('Dispensing: Caffe Mocha')
        ingredientDisplay(ingredientDeduction,0,0,0,0,1,0,1,1,1)
      }
      else {
        console.log('Out of stock: Caffe Mocha')
        ingredientDisplay(ingredientDeduction,0,0,0,0,0,0,0,0,0)
      }
      displayMenu()
      callback()
    })

//Input 4 deducts ingredients for Cappuccino and displays new inventory and menu
program
  .command('4')
  .description('Order a Cappuccino')
  .action((args, callback)=> {
    if(ingredients.espresso>=2 && ingredients.steamed_milk>=1 && ingredients.foamed_milk>=1){
      console.log('Dispensing: Cappuccino')
        ingredientDisplay(ingredientDeduction,0,0,0,0,1,1,2,0,0)
      }
      else {
        console.log('Out of stock: Cappuccino')
        ingredientDisplay(ingredientDeduction,0,0,0,0,0,0,0,0,0)
      }
      displayMenu()
      callback()
    })

//Input 5 deducts ingredients for coffee and displays new inventory and menu
program
  .command('5')
  .description('Order a Coffee')
  .action((args, callback)=> {
    if(ingredients.coffee>=3 && ingredients.sugar>=1 && ingredients.cream>=1){
      console.log('Dispensing: Coffee')
        ingredientDisplay(ingredientDeduction,3,0,1,1,0,0,0,0,0)
      }
      else {
        console.log('Out of stock: Coffee')
        ingredientDisplay(ingredientDeduction,0,0,0,0,0,0,0,0,0)
      }
      displayMenu()
      callback()
    })

//Input 3 deducts ingredients for Decaf Coffee and displays new inventory and menu
program
  .command('6')
  .description('Order a Decaf Coffee')
  .action((args, callback)=> {
    if(ingredients.decaf_coffee>=3 && ingredients.sugar>=1 && ingredients.cream>=1){
      console.log('Dispensing: Decaf Coffee')
        ingredientDisplay(ingredientDeduction,0,3,1,1,0,0,0,0,0)
      }
      else {
        console.log('Out of stock: Decaf Coffee')
        ingredientDisplay(ingredientDeduction,0,0,0,0,0,0,0,0,0)
      }
      displayMenu()
      callback()
    })

//Entering q or Q quits the program by simply not invoking action's callback
program
  .command('q')
  .alias('Q')
  .description('Quit Barrista Matic')
  .action((args, callback)=> {
    })

//Shows the Barrista Matic delimiter
program
  .delimiter('barrista_matic$')
  .show()
