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

// Create objects
const potion = {
  name: "Health Potion",
  type: "potion",
  value: 5,
  effect: 30,
  description: "This potion restores 30 healt points",
};

const sword = {
  name: "sword",
  type: "weapon",
  value: 10,
  effect: 10,
  description: "The sword damages 10 points",
};

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

// Display starting location
console.log(`Starting location: ${currentLocation}`);
console.log(`First time visit: ${firstVisit}\n`);

let gameRunning = true; // Game is running

/**
 * Shows the player's current stats
 * Displays health, gold, and location
 */

/**
 * ---- DISPLAY FUNCTIONS ----
 */

function showStatus() {
  console.log("\n=== " + playerName + "'s Status ===");
  console.log("❤️  Health: " + playerHealth);
  console.log("💰 Gold: " + playerGold);
  console.log("📍 Location: " + currentLocation);
  checkInventory();
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
    console.log("5: Use item");
    console.log("6: Help");
    console.log("7: Quit game");
  } else if (currentLocation === "blacksmith") {
    console.log(
      "The heat from the forge fills the air. Weapons and armor line the walls."
    );
    console.log("\nWhat would you like to do?");
    console.log(`1: Buy sword (${sword.value} gold)`);
    console.log("2: Return to village");
    console.log("3: Check status");
    console.log("4: Use item");
    console.log("5: Help");
    console.log("6: Quit game");
  } else if (currentLocation === "market") {
    console.log(
      "Merchants sell their wares from colorful stalls. A potion seller catches your eye."
    );
    console.log("\nWhat would you like to do?");
    console.log(`1: Buy potion (${potion.value} gold)`);
    console.log("2: Return to village");
    console.log("3: Check status");
    console.log("4: Use item");
    console.log("5: Help");
    console.log("6: Quit game");
  } else if (currentLocation === "forest") {
    console.log(
      "The forest is dark and foreboding. You hear strange noises all around you."
    );
    console.log("\nWhat would you like to do?");
    console.log("1: Return to village");
    console.log("2: Check status");
    console.log("3: Use item");
    console.log("4: Help");
    console.log("5: Quit game");
  }
}

/**
 * Displays the player's inventory
 */
function checkInventory() {
  console.log("\n=== INVENTORY ===");
  if (inventory.length === 0) {
    console.log("Your inventory is empty!");
    return;
  }

  // Display all inventory items with numbers and descriptions
  inventory.forEach((item, index) => {
    console.log(index + 1 + ". " + item.name + " - " + item.description);
  });
}

/**
 * Show user help
 */

function showHelp() {}

/**
 * Funciton that check the items in the inventory
 */
function hasItemType(type) {
  return inventory.some((item) => item.type === type);
}

/**
 * ---- GAME PLAY FUNCTIONS ----
 */

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

      // Trigger combat when entering forest
      console.log("\nA monster appears!");
      if (!handleCombat()) {
        currentLocation = "village";
      }
    }
  } else if (currentLocation === "blacksmith") {
    if (choiceNum === 2) {
      currentLocation = "village";
      console.log("\nYou return to the village center.");
      validMove = true;
    }
  } else if (currentLocation === "market") {
    if (choiceNum === 2) {
      currentLocation = "village";
      console.log("\nYou return to the village center.");
      validMove = true;
    }
  } else if (currentLocation === "forest") {
    if (choiceNum === 1) {
      currentLocation = "village";
      console.log("\nYou hurry back to the safety of the village.");
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
  // Updated to check for item type instead of specific string
  if (hasItemType("weapon")) {
    // Find the weapon to get its properties
    let weapon = inventory.find((item) => item.type === "weapon");
    console.log("You attack with your " + weapon.name + "!");
    console.log("You deal " + weapon.effect + " damage!");
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

// ===========================
// Item Functions
// Functions that handle item usage and inventory
// ===========================

/**
 * Handles using items like potions
 * @returns {boolean} true if item was used successfully, false if not
 */
function useItem() {
  if (inventory.length === 0) {
    console.log("\nYou have no items!");
    return false;
  }

  console.log("\n=== Inventory ===");
  inventory.forEach((item, index) => {
    console.log(index + 1 + ". " + item.name);
  });

  let choice = readlineSync.question("Use which item? (number or 'cancel'): ");
  if (choice === "cancel") return false;

  let index = parseInt(choice) - 1;
  if (index >= 0 && index < inventory.length) {
    let item = inventory[index];

    if (item.type === "potion") {
      console.log("\nYou drink the " + item.name + ".");
      updateHealth(item.effect);
      inventory.splice(index, 1);
      console.log("Health restored to: " + playerHealth);
      return true;
    } else if (item.type === "weapon") {
      console.log("\nYou ready your " + item.name + " for battle.");
      return true;
    }
  } else {
    console.log("\nInvalid item number!");
  }
  return false;
}

// ===========================
// Shopping Functions
// Functions that handle buying items
// ===========================

/**
 * Handles purchasing items at the blacksmith
 */
function buyFromBlacksmith() {
  if (inventory.includes("sword")) {
    console.log("\nBlacksmith: 'You already have a sword!'");
  } else if (playerGold >= sword.value) {
    console.log("\nBlacksmith: 'A fine blade for a brave adventurer!'");
    playerGold -= sword.value;
    inventory.push({ ...sword });
    console.log(`You bought a ${sword.name} for ${sword.value} gold!`);
    console.log("Gold remaining: " + playerGold);
  } else {
    console.log("\nBlacksmith: 'Come back when you have more gold!'");
  }
}

/**
 * Handles purchasing items at the market
 */
function buyFromMarket() {
  if (inventory.includes("potion")) {
    console.log("Merchant: 'You already have a potion!'");
  } else if (playerGold >= potion.value) {
    console.log("\nMerchant: 'This potion will heal your wounds!'");
    playerGold -= potion.value;
    inventory.push({ ...potion });
    console.log(`You bought a ${potion.name} for ${potion.value} gold!`);
    console.log("Gold remaining: " + playerGold);
  } else {
    console.log("\nMerchant: 'No gold, no potion!'");
  }
}

// ===========================
// Help System
// Provides information about available commands
// ===========================

/**
 * Shows all available game commands and how to use them
 */
function showHelp() {
  console.log("\n=== AVAILABLE COMMANDS ===");

  console.log("\nMovement Commands:");
  console.log("- In the village, choose 1-3 to travel to different locations");
  console.log(
    "- In other locations, choose the return option to go back to the village"
  );

  console.log("\nBattle Information:");
  console.log("- You need a sword to win battles");
  console.log("- Monsters appear in the forest");
  console.log("- Without a weapon, you'll lose health when retreating");

  console.log("\nItem Usage:");
  console.log("- Health potions restore 30 health");
  console.log("- You can buy potions at the market for 5 gold");
  console.log("- You can buy a sword at the blacksmith for 10 gold");

  console.log("\nOther Commands:");
  console.log("- Choose the status option to see your health and gold");
  console.log("- Choose the help option to see this message again");
  console.log("- Choose the quit option to end the game");

  console.log("\nTips:");
  console.log("- Keep healing potions for dangerous areas");
  console.log("- Defeat monsters to earn gold");
  console.log("- Health can't go above 100");
}

/**
 * ---- MAIN GAME ----
 */

while (gameRunning) {
  // Show current location and userInputs
  showLocation();

  // Get and validate player choice
  let validUserInput = false;
  while (!validUserInput) {
    try {
      let userInput = readlineSync.question("\nEnter choice (number): ");

      // Check for empty input
      if (userInput.trim() === "") {
        throw "Please enter a number!";
      }

      // Convert to number and check if it's a valid number
      let userInputNumber = parseInt(userInput);
      if (isNaN(userInputNumber)) {
        throw "That's not a number! Please enter a number.";
      }

      // Handle userInputs based on location
      if (currentLocation === "village") {
        if (userInputNumber < 1 || userInputNumber > 7) {
          throw "Please enter a number between 1 and 7.";
        }

        validUserInput = true;

        if (userInputNumber <= 3) {
          move(userInputNumber);
        } else if (userInputNumber === 4) {
          showStatus();
        } else if (userInputNumber === 5) {
          useItem();
        } else if (userInputNumber === 6) {
          showHelp();
        } else if (userInputNumber === 7) {
          gameRunning = false;
          console.log("\nThanks for playing!");
        }
      } else if (currentLocation === "blacksmith") {
        if (userInputNumber < 1 || userInputNumber > 6) {
          throw "Please enter a number between 1 and 6.";
        }

        validUserInput = true;

        if (userInputNumber === 1) {
          buyFromBlacksmith();
        } else if (userInputNumber === 2) {
          move(userInputNumber);
        } else if (userInputNumber === 3) {
          showStatus();
        } else if (userInputNumber === 4) {
          useItem();
        } else if (userInputNumber === 5) {
          showHelp();
        } else if (userInputNumber === 6) {
          gameRunning = false;
          console.log("\nThanks for playing!");
        }
      } else if (currentLocation === "market") {
        if (userInputNumber < 1 || userInputNumber > 6) {
          throw "Please enter a number between 1 and 6.";
        }

        validUserInput = true;

        if (userInputNumber === 1) {
          buyFromMarket();
        } else if (userInputNumber === 2) {
          move(userInputNumber);
        } else if (userInputNumber === 3) {
          showStatus();
        } else if (userInputNumber === 4) {
          useItem();
        } else if (userInputNumber === 5) {
          showHelp();
        } else if (userInputNumber === 6) {
          gameRunning = false;
          console.log("\nThanks for playing!");
        }
      } else if (currentLocation === "forest") {
        if (userInputNumber < 1 || userInputNumber > 5) {
          throw "Please enter a number between 1 and 5.";
        }

        validUserInput = true;

        if (userInputNumber === 1) {
          move(userInputNumber);
        } else if (userInputNumber === 2) {
          showStatus();
        } else if (userInputNumber === 3) {
          useItem();
        } else if (userInputNumber === 4) {
          showHelp();
        } else if (userInputNumber === 5) {
          gameRunning = false;
          console.log("\nThanks for playing!");
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
