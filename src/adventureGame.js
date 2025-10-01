/*
Adventure Game
This game will be a text-based game where the player will be able
to make choices that affect the outcome of the game.
The player will be able to choose their own path and the story will change
based on their decisions.
*/
const readlineSync = require('readline-sync');

// Display the game title
console.log("Welcome to the Adventure Game");
console.log("=============================")
// Add a welcome message
console.log("Prepare yourself for an epic journey!");
console.log("=============================")


// Get player name using readline-sync
playerName = readlineSync.question("What is your name, adventurer? ");
console.log(`\nWelcome, ${playerName}! Your adventure begins now.`);

// Create variables for player stats
let health = 100; // Player's health points
let gold = 20; // Player's gold level
let currentLocation = "village"; // Player's starting location
let gameRunning = true; // Game is running
let inventory = []; // Player's inventory (empty at the start)
let weaponDamage = 0; // Will increase to 10 when player gets a sword
let monsterDefense = 5; // Monster's defense value
let healingPotionValue = 30; // Health will be restored by this amount

console.log(`Your starting gold amount is : ${gold}\n`);

// Weapon damage (starts at 0 until player buys a sword)
console.log(`Initial weapon damage is : ${weaponDamage}`); 
console.log("When you buy a sword, weapon damage will increase to 10!\n");

// Monster defense (affects combat outcomes)
console.log(`Initial monster defense is : ${monsterDefense}`); 
console.log("Monsters can withstand some damage in combat!\n");

// Healing potion restoration (matches final implementation)
console.log(`Healing potion value : ${healingPotionValue}`);
console.log("A potion will restore 30 health!\n");