var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

// Create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon_DB"
});

// Run the start function 
start();

// Function that will prompt user input
function start() {
  // Connect to the database
  connection.query('SELECT * FROM products', function(err, res) {
    var table = new Table({
      head: ['Product ID','Product Name','Department','Price','Quantity']
    })

    console.log("My Inventory for sale: ");
    // Loop to show all entire inventory
    for (var i = 0;i<res.length;i++){
      table.push([res[i].item_id,res[i].product_name,res[i].department_name,res[i].price.toFixed(2),res[i].stock_quantity])
    }
    console.log(table.toString());

    inquirer.prompt([{
      name: "itemID",
      type: "input",
      message: "What is the item ID you are buying?",
    },
    {
      name: "stock_quantity",
      type: "input",
      message: "How many items are you buying?"
    }])
    .then(function(answer) {
    // Set variables for simplicity
    var itemChoice = answer.itemID -1;
    var productChoice = res[itemChoice];
    var amount = answer.stock_quantity;

    // If quantity is available, display user the cost
    if(amount < productChoice.stock_quantity){
      console.log("You are buying " + amount + " " + productChoice.product_name);
      console.log("They cost: $" + productChoice.price.toFixed(2) + " each.");
      console.log("Your total cost comes out to be: $" + productChoice.price.toFixed(2) * amount);
      
      //Update the SQL based on how many items was purchased
      connection.query("UPDATE products SET ? WHERE ?",
          [{
              stock_quantity: res[itemChoice].stock_quantity - amount
            },
            {
              item_id: res[itemChoice].item_id
          }],
          function(error) {
            if (error) throw err;
            start();
          });
      }
      else {
      // Display not enough items and try again
      console.log("We do not have enough items. Please try again");
      start();
    }
  });
});
}
