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
let playerGold = 20; // Player's gold level
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

console.log(`Your starting gold amount is : ${playerGold}\n`);

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
let hasPotion = false;
let hasArmor = false;

/**
 * Shows the player's current stats
 * Displays health, gold, and location
 */
function showStatus() {
  console.log("\n=== " + playerName + "'s Status ===");
  console.log("❤️  Health: " + playerHealth);
  console.log("💰 Gold: " + playerGold);
  console.log("📍 Location: " + currentLocation);
}

/**
 * Shows the current location's description and available choices
 */
function showLocation() {
  console.log("\n=== " + currentLocation.toUpperCase() + " ===");

  if (currentLocation === "village") {
    console.log(
      "You're in a bustling village. The blacksmith and market are nearby."
    );
    console.log("\nWhat would you like to do?");
    console.log("1: Go to blacksmith");
    console.log("2: Go to market");
    console.log("3: Enter forest");
    console.log("4: Check status");
    console.log("5: Check inventory");
    console.log("6: Quit game");
  } else if (currentLocation === "blacksmith") {
    console.log(
      "The heat from the forge fills the air. Weapons and armor line the walls."
    );
    console.log("\nWhat would you like to do?");
    console.log("1: Return to village");
    console.log("2: Check status");
    console.log("3: Check inventory");
    console.log("4: Quit game");
  } else if (currentLocation === "market") {
    console.log(
      "Merchants sell their wares from colorful stalls. A potion seller catches your eye."
    );
    console.log("\nWhat would you like to do?");
    console.log("1: Return to village");
    console.log("2: Check status");
    console.log("3: Check inventory");
    console.log("4: Quit game");
  }
}

/**
 * Handles movement between locations
 * @param {number} choiceNum The chosen option number
 * @returns {boolean} True if movement was successful
 */
function move(choiceNum) {
  let validMove = false;

  if (currentLocation === "village") {
    if (choiceNum === 1) {
      currentLocation = "blacksmith";
      console.log("\nYou enter the blacksmith's shop.");
      validMove = true;
    } else if (choiceNum === 2) {
      currentLocation = "market";
      console.log("\nYou enter the market.");
      validMove = true;
    } else if (choiceNum === 3) {
      currentLocation = "forest";
      console.log("\nYou venture into the forest...");
      validMove = true;
    }
  } else if (currentLocation === "blacksmith" || currentLocation === "market") {
    if (choiceNum === 1) {
      currentLocation = "village";
      console.log("\nYou return to the village center.");
      validMove = true;
    }
  }

  return validMove;
}

/**
 * Handles combat encounters
 * @returns {boolean} True if combat was successful, false if retreat
 */
function handleCombat() {
  if (hasWeapon) {
    console.log("You have a sword! You attack!");
    console.log("Victory! You found 10 gold!");
    playerGold += 10;
    return true;
  } else {
    console.log("Without a weapon, you must retreat!");
    updateHealth(-20);
    return false;
  }
}

/**
 * Updates player health within valid range
 * @param {number} amount Amount to change health by
 * @returns {number} The new health value
 */
function updateHealth(amount) {
  playerHealth += amount;

  if (playerHealth > 100) {
    playerHealth = 100;
    console.log("You're at full health!");
  }
  if (playerHealth < 0) {
    playerHealth = 0;
    console.log("You're gravely wounded!");
  }

  console.log("Health is now: " + playerHealth);
  return playerHealth;
}

/**
 * Checks and displays inventory
 */
function checkInventory() {
  console.log("\n=== INVENTORY ===");
  if (!hasWeapon && !hasPotion && !hasArmor) {
    console.log("Your inventory is empty!");
    return;
  }

  if (hasWeapon) console.log("- Sword");
  if (hasPotion) console.log("- Health Potion");
  if (hasArmor) console.log("- Shield");
}

while (gameRunning) {
  // Check and display location
  showLocation();

  let validUserInput = false;
  while (!validUserInput) {
    try {
      // Get user input about the next choice
      let userInput = readlineSync.question("Enter a number to continue ");

      if (userInput.trim() === "") {
        console.log("Empty input. Try again!");
      }

      let userInputNumber = parseInt(userInput);
      if (isNaN(userInputNumber)) {
        console.log("This is not a number. Please try again");
      }
      // Handle choices based on location
      if (currentLocation === "village") {
        if (userInputNumber < 1 || userInputNumber > 6) {
          throw "Please enter a number between 1 and 6.";
        }
        validUserInput = true;
        if (userInputNumber <= 3) {
          if (!move(userInputNumber)) {
            console.log("\nYou can't go there!");
          } else if (userInputNumber === 3) {
            console.log("\nA monster appears!");
            if (!handleCombat()) {
              currentLocation = "village";
            }
          }
        } else if (userInputNumber === 4) {
          // Show status
          showStatus();
        } else if (userInputNumber === 5) {
          checkInventory();
        } else if (userInputNumber === 6) {
          console.log("\nGoodbye, brave adventurer!");
          gameRunning = false;
        }
      } else if (
        currentLocation === "blacksmith" ||
        currentLocation === "market"
      ) {
        if (userInputNumber < 1 || userInputNumber > 4) {
          throw "Please enter a number between 1 and 4.";
        }
        validUserInput = true;
        if (userInputNumber === 1) {
          if (!move(userInputNumber)) {
            console.log("\nYou can't go there!");
          }
        } else if (userInputNumber === 2) {
          // Show status
          showStatus();
        } else if (userInputNumber === 3) {
          checkInventory();
        } else if (userInputNumber === 4) {
          console.log("\nGoodbye, brave adventurer!");
          gameRunning = false;
        } else {
          console.log(
            "\nInvalid choice! Please enter a number between 1 and 3."
          );
        }
      }
    } catch (error) {
      console.log("\nError: " + error);
      console.log("Please try again!");
    }
  }

  // Check if player died
  if (playerHealth <= 0) {
    console.log("\nGame Over! Your health reached 0!");
    gameRunning = false;
  }
}
