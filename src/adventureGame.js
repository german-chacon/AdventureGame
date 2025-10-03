/*
Adventure Game
This game will be a text-based game where the player will be able
to make choices that affect the outcome of the game.
The player will be able to choose their own path and the story will change
based on their decisions.
*/
const readlineSync = require("readline-sync");

// Create variables for player stats
let playerHealth = 100; // Player's health points
let gold = 20; // Player's gold level
let inventory = []; // Player's inventory (empty at the start)
let weaponDamage = 0; // Will increase to 10 when player gets a sword
let monsterDefense = 5; // Monster's defense value
let healingPotionValue = 30; // Health will be restored by this amount

// Display the game title
console.log("Welcome to the Adventure Game");
console.log("=============================");
// Add a welcome message
console.log("Prepare yourself for an epic journey!");
console.log("=============================");

// Get player name using readline-sync
playerName = "German"; // Hardcoded for testing
// playerName = readlineSync.question("What is your name, adventurer? ");
console.log(`\nWelcome, ${playerName}! Your adventure begins now.`);

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

let currentLocation = "village"; // Player's starting location
let firstVisit = true;

// Display current location
console.log(`Starting location: ${currentLocation}`);
console.log(`First time visit: ${firstVisit}\n`);

let gameRunning = true; // Game is running
let hasWeapon = false;
let hasPotion = true;
let hasArmor = false;

while (gameRunning) {
  // Check and display location
  if (currentLocation === "village") {
    console.log("=== VILLAGE ===");
    console.log(
      "You're in a bustling village. The blacksmith and market are nearby.\n"
    );
    console.log("Where would you like to go?");
    console.log("1: Go to blacksmith");
    console.log("2: Go to market");
    console.log("3: Enter forest");
    console.log("4: Check status");
    console.log("5: Show inventory");
    console.log("6: Quit game");
    if (firstVisit) {
      console.log(
        "\nVillager: 'Welcome, adventurer! Rumor has it there's a dragon in the mountains...'"
      );
      firstVisit = false;
    }
  } else if (currentLocation === "blacksmith") {
    console.log("\n=== BLACKSMITH ===");
    console.log(
      "The heat from the forge fills the air. Weapons and armor line the walls."
    );
    console.log("\nWhere would you like to go?");
    console.log("1: Return to village");
    console.log("2: Check status");
    console.log("3: Show inventory");
    console.log("4: Quit game");
  } else if (currentLocation === "market") {
    console.log("\n=== MARKET ===");
    console.log(
      "Merchants sell their wares from colorful stalls. A potion seller catches your eye."
    );

    console.log("\nWhat would you like to do?");
    console.log("1: Return to village");
    console.log("2: Check status");
    console.log("3: Check inventory");
    console.log("4: Quit game");
  } else if (currentLocation === "forest") {

    console.log("\n=== FOREST ===");
    console.log("A dark forest surrounds you. You hear strange noises...");

    // Simple battle when entering forest
    let inBattle = true;
    let monsterHealth = 3;

    console.log("Battle started!");

    while (inBattle) {
      console.log("Monster health: " + monsterHealth);
      console.log("You attack!");
      monsterHealth--;

      if (monsterHealth <= 0) {
        console.log("Monster defeated!");
        inBattle = false;
      }
    }
    currentLocation = "village"; // Return to village after battle
    console.log("\nYou return to the safety of the village.");
  }

  // Get user input about the next choice
  let userInput = parseInt(
    readlineSync.question("Enter a number to continue ")
  );

    // Handle choices based on location
  if (currentLocation === "village") {
    if (userInput === 1) {
      currentLocation = "blacksmith";
      console.log("\nYou enter the blacksmith's shop.");
    } else if (userInput === 2) {
      console.log("\nMerchants call out their wares.");
    } else if (userInput === 3) {
      currentLocation = "forest";
      console.log(
        "\nA dark path leads into the forest. Strange noises echo from within."
      );
    } else if (userInput === 4) {
      // Show status
      console.log("\n=== " + playerName + "'s Status ===");
      console.log("❤️  Health: " + playerHealth);
      console.log("💰 Gold: " + gold);
      console.log("📍 Location: " + currentLocation);
    } else if (userInput === 5) {
      for (let i = 0; i < 3; i++) {
        console.log("Checking item slot " + i + "...");
        if (slot === 1 && hasWeapon) {
          console.log("Found: Sword");
        } else if (slot === 2 && hasPotion) {
          console.log("Found: Health Potion");
        } else if (slot === 3 && hasArmor) {
          console.log("Found: Shield");
        } else {
          console.log("Empty slot");
        }
      }
    } else if (userInput === 6) {
      console.log("\nGoodbye, brave adventurer!");
      gameRunning = false;
    } else {
      console.log("\nInvalid choice! Please enter a number between 1 and 6.");
    }
  } else if (currentLocation === "blacksmith" || currentLocation === "market") {
    if (userInput === 1) {
      currentLocation = "village";
      console.log("\nYou return to the village center.");
    } else if (userInput === 2) {
      // Show status
      console.log("\n=== " + playerName + "'s Status ===");
      console.log("❤️  Health: " + playerHealth);
      console.log("💰 Gold: " + gold);
      console.log("📍 Location: " + currentLocation);
    } else if (userInput === 3) {
      console.log("Checking item slot " + i + "...");
      if (slot === 1 && hasWeapon) {
        console.log("Found: Sword");
      } else if (slot === 2 && hasPotion) {
        console.log("Found: Health Potion");
      } else if (slot === 3 && hasArmor) {
        console.log("Found: Shield");
      } else {
        console.log("Empty slot");
      }
    } else if (userInput === 4) {
      console.log("\nGoodbye, brave adventurer!");
      gameRunning = false;
    } else {
      console.log("\nInvalid choice! Please enter a number between 1 and 3.");
    }
  }

  // Check if player died
  if (playerHealth <= 0) {
    console.log("\nGame Over! Your health reached 0!");
    gameRunning = false;
  }
}
