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

// Add a welcome message
console.log("Prepare yourself for an epic journey!");



// Get player name using readline-sync
playerName = readlineSync.question("What is your name, adventurer? ");
console.log(`Welcome, ${playerName}! Your adventure begins now.`);

// Create variables for player stats
let health = 100; // Player's health points
let gold = 20; // Player's gold level
let currentLocation = "village"; // Player's starting location
let gameRunning = true; // Game is running
let inventory = []; // Player's inventory (empty at the start)

console.log(`Your starting gold amount is : ${gold}.`);
