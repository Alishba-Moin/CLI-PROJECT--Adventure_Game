#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
class Player {
    name;
    fuel = 100;
    constructor(name) {
        this.name = name;
    }
    fuelDecrease() {
        this.fuel -= 25;
    }
    fuelIncrease() {
        this.fuel = 100;
    }
}
class Opponent {
    name;
    fuel = 100;
    constructor(name) {
        this.name = name;
    }
    fuelDecrease() {
        this.fuel -= 25;
    }
}
async function startGame() {
    const player = await inquirer.prompt({
        type: "input",
        name: "name",
        message: "Please Enter Your Name:"
    });
    const opponent = await inquirer.prompt({
        type: "list",
        name: "select",
        message: "Select Your Opponent",
        choices: ["Skeleton", "Assassin", "Zombie"]
    });
    const player1 = new Player(player.name);
    const opponent1 = new Opponent(opponent.select);
    do {
        let ask = await inquirer.prompt({
            name: "opt",
            message: "Select Your Option",
            type: "list",
            choices: ["Attack", "Drink Portion", "Run For Your Life...."]
        });
        switch (ask.opt) {
            case "Attack":
                const num = Math.floor(Math.random() * 2);
                if (num > 0) {
                    player1.fuelDecrease();
                    console.log(chalk.bold.red(`${player1.name} fuel is ${player1.fuel}`));
                    console.log(chalk.bold.green(`${opponent1.name} fuel is ${opponent1.fuel}`));
                    if (player1.fuel <= 0) {
                        console.log(chalk.red.bold.italic("YOU LOST BETTER LUCK NEXT TIME"));
                        process.exit();
                    }
                }
                else {
                    opponent1.fuelDecrease();
                    console.log(chalk.bold.green(`${player1.name} fuel is ${player1.fuel}`));
                    console.log(chalk.bold.red(`${opponent1.name} fuel is ${opponent1.fuel}`));
                    if (opponent1.fuel <= 0) {
                        console.log(chalk.green.bold.italic("YOU WIN"));
                        process.exit();
                    }
                }
                break;
            case "Drink Portion":
                player1.fuelIncrease();
                console.log(chalk.bold.italic.green(`YOUR DRINK HEALTH PORTION YOUR FUEL IS ${player1.fuel} `));
                break;
            case "Run For Your Life....":
                console.log(chalk.red.bold.italic("YOU LOOSE BETTER LUCK NEXT TIME"));
                process.exit();
        }
    } while (true);
}
startGame();
