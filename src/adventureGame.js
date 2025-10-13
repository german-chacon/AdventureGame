const readlineSync = require("readline-sync");

// Player stats
let playerHealth = 100;
let playerGold = 20;
let inventory = [];
let currentLocation = "village";
let gameRunning = true;
let playerName = "German"; // Hardcoded for testing
let dragonDefeated = false;

// Item definitions
const items = {
  potion: {
    name: "Health Potion",
    type: "potion",
    value: 5,
    effect: 30,
    description: "Restores 30 health points",
  },
  sword: {
    name: "Sword",
    type: "weapon",
    value: 10,
    effect: 10,
    description: "Deals 10 damage",
  },
  shield: {
    name: "Wooden Shield",
    type: "armor",
    value: 8,
    effect: 5,
    description: "Reduces damage by 5",
  },
  steelSword: {
    name: "Steel Sword",
    type: "weapon",
    value: 20,
    effect: 20,
    description: "Deals 20 damage",
  },
  ironShield: {
    name: "Iron Shield",
    type: "armor",
    value: 15,
    effect: 10,
    description: "Reduces damage by 10",
  },
};

// Monster definitions
const monsters = {
  regular: {
    name: "Forest Monster",
    damage: 10,
    health: 20,
    reward: 10,
  },
  dragon: {
    name: "Dragon",
    damage: 20,
    health: 50,
    reward: 50,
  },
};

// Locations and their options
const locations = {
  village: {
    description:
      "You're in a bustling village. The blacksmith and market are nearby.",
    options: [
      { text: "Go to blacksmith", action: () => move(1) },
      { text: "Go to market", action: () => move(2) },
      { text: "Enter forest", action: () => move(3) },
      { text: "Check status", action: showStatus },
      { text: "Use item", action: useItem },
      { text: "Help", action: showHelp },
      { text: "Quit game", action: () => (gameRunning = false) },
    ],
  },
  blacksmith: {
    description:
      "The heat from the forge fills the air. Weapons and armor line the walls.",
    options: [
      { text: "Buy Sword (10 gold)", action: () => buyFromBlacksmith("sword") },
      {
        text: "Buy Steel Sword (20 gold)",
        action: () => buyFromBlacksmith("steelSword"),
      },
      {
        text: "Buy Wooden Shield (8 gold)",
        action: () => buyFromBlacksmith("shield"),
      },
      {
        text: "Buy Iron Shield (15 gold)",
        action: () => buyFromBlacksmith("ironShield"),
      },
      { text: "Return to village", action: () => move(4) },
      { text: "Check status", action: showStatus },
      { text: "Use item", action: useItem },
      { text: "Help", action: showHelp },
      { text: "Quit game", action: () => (gameRunning = false) },
    ],
  },
  market: {
    description: "Merchants sell their wares from colorful stalls.",
    options: [
      {
        text: "Buy Health Potion (5 gold)",
        action: () => buyFromMarket("potion"),
      },
      { text: "Return to village", action: () => move(4) },
      { text: "Check status", action: showStatus },
      { text: "Use item", action: useItem },
      { text: "Help", action: showHelp },
      { text: "Quit game", action: () => (gameRunning = false) },
    ],
  },
  forest: {
    description:
      "The forest is dark and foreboding. You hear strange noises all around you.",
    options: [
      { text: "Fight monster", action: () => handleCombat(false) },
      { text: "Fight dragon", action: () => handleCombat(true) },
      { text: "Return to village", action: () => move(4) },
      { text: "Check status", action: showStatus },
      { text: "Use item", action: useItem },
      { text: "Help", action: showHelp },
      { text: "Quit game", action: () => (gameRunning = false) },
    ],
  },
};

// --- Core Functions ---

function showStatus() {
  console.log("\n=== STATUS ===");
  console.log(`❤️ Health: ${playerHealth}`);
  console.log(`💰 Gold: ${playerGold}`);
  console.log(`📍 Location: ${currentLocation}`);
  checkInventory();
}

function checkInventory() {
  console.log("\n=== INVENTORY ===");
  if (inventory.length === 0) {
    console.log("Your inventory is empty!");
  } else {
    inventory.forEach((item, i) => {
      console.log(
        `${i + 1}. ${item.name} (${item.type}) - ${item.description}`
      );
    });
  }
}

function getItemsByType(type) {
  return Object.values(items).filter((item) => item.type === type);
}

function getBestItem(type) {
  const filtered = inventory.filter((item) => item.type === type);
  if (filtered.length === 0) return null;
  return filtered.reduce((best, item) =>
    item.effect > best.effect ? item : best
  );
}

function hasGoodEquipment() {
  return getBestItem("weapon")?.effect >= 20 && getBestItem("armor");
}

function updateHealth(amount) {
  playerHealth = Math.min(100, Math.max(0, playerHealth + amount));
  console.log(`Health: ${playerHealth}`);
  return playerHealth;
}

function useItem() {
  if (inventory.length === 0) {
    console.log("\nYou have no items!");
    return;
  }
  checkInventory();
  const choice = readlineSync.question(
    "\nUse which item? (number or 'cancel'): "
  );
  if (choice.toLowerCase() === "cancel") return;
  const index = parseInt(choice) - 1;
  if (index >= 0 && index < inventory.length) {
    const item = inventory[index];
    if (item.type === "potion") {
      console.log(`\nYou drink the ${item.name}.`);
      updateHealth(item.effect);
      inventory.splice(index, 1);
    } else {
      console.log(`\nYou ready your ${item.name}.`);
    }
  } else {
    console.log("\nInvalid item number!");
  }
}

function showHelp() {
  console.log("\n=== HELP ===");
  console.log("Move between locations to shop, fight, and explore.");
  console.log("Defeat the dragon to win the game!");
  console.log("Use potions to restore health during combat.");
  console.log("Buy better weapons and armor to survive tougher battles.");
}

function showLocation() {
  console.log(`\n=== ${currentLocation.toUpperCase()} ===`);
  console.log(locations[currentLocation].description);
  console.log("\nWhat would you like to do?");
  locations[currentLocation].options.forEach((option, i) => {
    console.log(`${i + 1}. ${option.text}`);
  });
}

function isValidChoice(choice, max) {
  return !isNaN(choice) && choice >= 1 && choice <= max;
}

function buyFromBlacksmith(itemKey) {
  const item = items[itemKey];
  if (inventory.some((i) => i.name === item.name)) {
    console.log(`\nYou already own a ${item.name}!`);
    return;
  }
  if (playerGold >= item.value) {
    playerGold -= item.value;
    inventory.push({ ...item });
    console.log(`\nYou bought a ${item.name} for ${item.value} gold!`);
    console.log(`Gold remaining: ${playerGold}`);
  } else {
    console.log(`\nYou don't have enough gold for the ${item.name}!`);
  }
}

function buyFromMarket(itemKey) {
  const item = items[itemKey];
  if (inventory.some((i) => i.name === item.name)) {
    console.log(`\nYou already own a ${item.name}!`);
    return;
  }
  if (playerGold >= item.value) {
    playerGold -= item.value;
    inventory.push({ ...item });
    console.log(`\nYou bought a ${item.name} for ${item.value} gold!`);
    console.log(`Gold remaining: ${playerGold}`);
  } else {
    console.log(`\nYou don't have enough gold for the ${item.name}!`);
  }
}

function move(choice) {
  const moves = {
    village: { 1: "blacksmith", 2: "market", 3: "forest" },
    blacksmith: { 4: "village" },
    market: { 4: "village" },
    forest: { 4: "village" },
  };
  const newLocation = moves[currentLocation][choice];
  if (newLocation) {
    if (newLocation === "forest" && !getBestItem("weapon")) {
      console.log("\nYou need a weapon to enter the forest!");
      return false;
    }
    currentLocation = newLocation;
    console.log(`\nYou travel to the ${newLocation}.`);
    return true;
  }
  return false;
}

function handleCombat(isDragon) {
  const monster = isDragon ? monsters.dragon : monsters.regular;
  console.log(`\n=== COMBAT: You vs. ${monster.name} ===`);

  if (isDragon && !hasGoodEquipment()) {
    console.log(
      "You're not ready to face the dragon! You need a Steel Sword and armor."
    );
    updateHealth(-monster.damage / 2);
    return false;
  }

  const weapon = getBestItem("weapon");
  const armor = getBestItem("armor");

  console.log(`Weapon: ${weapon ? weapon.name : "None"}`);
  console.log(`Armor: ${armor ? armor.name : "None"}`);
  console.log(`Monster Health: ${monster.health}`);

  while (monster.health > 0 && playerHealth > 0) {
    // Player attack
    const damage = weapon ? weapon.effect : 1;
    monster.health = Math.max(0, monster.health - damage);
    console.log(`\nYou attack for ${damage} damage!`);
    console.log(`${monster.name} health: ${monster.health}`);
    if (monster.health <= 0) break;

    // Monster attack
    let monsterDamage = monster.damage;
    if (armor) {
      const blocked = Math.min(armor.effect, monsterDamage);
      monsterDamage -= blocked;
      console.log(`\n${monster.name} attacks for ${monster.damage} damage!`);
      console.log(`Your ${armor.name} blocks ${blocked} damage!`);
    } else {
      console.log(`\n${monster.name} attacks for ${monsterDamage} damage!`);
    }
    updateHealth(-Math.max(1, monsterDamage));
    if (playerHealth <= 0) {
      console.log("\nYou have been defeated...");
      return false;
    }
  }

  if (monster.health <= 0) {
    playerGold += monster.reward;
    console.log(
      `\nVictory! You defeated the ${monster.name} and found ${monster.reward} gold!`
    );
    if (isDragon) {
      dragonDefeated = true;
      console.log("\n=== YOU DEFEATED THE DRAGON! ===");
      console.log("The village celebrates your victory!");
      console.log(
        `Final stats: ❤️ ${playerHealth} Health, 💰 ${playerGold} Gold`
      );
      gameRunning = false;
    }
    return true;
  }
  return false;
}

// --- Main Game Loop ---
console.log("=== ADVENTURE GAME ===");
console.log(`Welcome, ${playerName}! Your adventure begins now.\n`);

while (gameRunning) {
  showLocation();
  const maxChoice = locations[currentLocation].options.length;
  let choice = readlineSync.question(
    "\nEnter your choice (1-" + maxChoice + "): "
  );

  try {
    if (!isValidChoice(parseInt(choice), maxChoice)) {
      throw new Error(`Please enter a number between 1 and ${maxChoice}.`);
    }
    locations[currentLocation].options[parseInt(choice) - 1].action();
  } catch (error) {
    console.log("\nError: " + error.message);
  }
}

console.log("\nThanks for playing!");
