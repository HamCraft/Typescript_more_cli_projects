#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

async function askName() {
    return await inquirer.prompt([
        {
            name: "player",
            type: "input",
            message: "Please enter your name: ",
            validate: (input) => /^[A-Za-z]+$/.test(input) ? true : "Please enter only alphabetical characters.",
        },
    ]).then((answer) => answer.player);
}

async function action() {
    return await inquirer.prompt([
        {
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: ["Attack", "Drink Health Potion", "Run"],
        },
    ]).then((answer) => answer.action);
}

async function askingToContinue() {
    return await inquirer.prompt([
        {
            name: "continue",
            type: "list",
            message: "Do you want to continue playing?",
            choices: ["Yes", "No"],
        },
    ]).then((answer) => answer.continue === "Yes");
}

async function gameLoop(playerName: string) {
    let random = Math.random();

    let enemyTypes = ["Ghoul", "Lich", "Orc", "Specter"];
    let maxEnemyHealth = 100;
    let maximumHealthDamage = 25;

    let playerHealth = 100;
    let playerAttackDamage = 50;
    let numberOfHealthPotions = 4;
    let healthPotionAmount = 15;
    let healthPerDropChance = 50;

    let isRunning = true;

    while (isRunning) {
        let enemyHealth = Math.floor(random * maxEnemyHealth);
        let enemyType = enemyTypes[Math.floor(random * enemyTypes.length)];

        console.log(`\n\t"${chalk.yellow(playerName)}", behold! A ${chalk.red(enemyType)} emerges from the shadows, ready to challenge you!\n`);

        while (enemyHealth > 0) {
            console.log(`\n\t"${chalk.yellow(playerName)}" health: ${chalk.green(playerHealth)}`);
            console.log(`\t"${chalk.red(enemyType)}" health: ${chalk.green(enemyHealth)}\n`);

            const userAction = await action();

            switch (userAction) {
                case "Attack":
                    let damageDealt = Math.floor(random * playerAttackDamage);
                    let damageTaken = Math.floor(random * maximumHealthDamage);

                    enemyHealth -= damageDealt;
                    playerHealth -= damageTaken;

                    console.log(`\n\tWith a swift motion, ${chalk.yellow(playerName)}, you deal ${chalk.red(damageDealt)} damage to the ${chalk.red(enemyType)}.`);
                    console.log(`\n\tAhh, you also suffer ${chalk.red(damageTaken)} damage in return!\n`);
                    
                    if (playerHealth < 1) {
                        console.log(chalk.cyanBright(`\tYou've sustained fatal injuries. It seems you're too weakened to continue! \n`));
                        isRunning = false; 
                    }
                    break;

                case "Drink Health Potion":
                    if (numberOfHealthPotions > 0) {
                        if (playerHealth <= 80) {
                            playerHealth += healthPotionAmount;
                            numberOfHealthPotions--;
                            console.log(`\n\t${chalk.yellow(playerName)}, you've consumed a health potion, restoring ${chalk.green(healthPotionAmount)} HP.`);
                            console.log(`\n\t${chalk.yellow(playerName)}, your health is now ${chalk.green(playerHealth)} HP.`);
                            console.log(`\n\tYou have ${chalk.green(numberOfHealthPotions)} health potion${numberOfHealthPotions === 1 ? '' : 's'} remaining.`);
                        } else {
                            console.log(`\n\t${chalk.greenBright('Your HP is already at maximum capacity.')}`);
                        }
                    } else {
                        console.log(`\n\tYou don't have any potions left to drink. Defeat enemies to get a chance for one potion.\n`);
                    }
                    break;

                case "Run":
                    console.log(`\n\tYou decided to run away from the enemy :${chalk.red(enemyType)}`);
                    isRunning = false;
                    break;

                default:
                    console.log(`${chalk.red('Invalid action.')}`);
                    break;
            }
        }

        if (playerHealth < 2) {
            console.log(chalk.cyanBright(`\tYou stagger out of the dungeon, weakened from battle. Better luck next time. \n`));
            break; 
        }

        if (enemyHealth <= 0) {
            console.log(`\n\t${chalk.greenBright('Congratulations')} ${chalk.yellow(playerName)}! You defeated the ${chalk.red(enemyType)}.`);
            console.log(`\n\t${chalk.red(enemyType)} has been defeated!\n`);
            console.log(`\tYou have ${chalk.green(playerHealth)} HP remaining!\n`);
            
            if (Math.random() * 100 > healthPerDropChance) {
                healthPotionAmount++;
                console.log(`\tThe ${chalk.red(enemyType)} has dropped a health potion!`);
                console.log(`\tYou now possess ${chalk.green(numberOfHealthPotions)} health potions.\n`);
            }
        }
    }
}

async function main() {
    console.log(chalk.blue("\n\tAdventure Game System:"));
    console.log(chalk.green("\n\tYou awaken in a dimly lit dungeon, with menacing creatures lurking in the shadows."));
    console.log(chalk.green("\tYour survival depends on your cunning and bravery!\n"));

    let playerName = await askName();
    let continuePlaying = true;
    
    while (continuePlaying) {
        await gameLoop(playerName);
        continuePlaying = await askingToContinue();
    }

    console.log(`\n\t${chalk.yellow(playerName)} exits the dungeon adventure.\n`);
}

main();