#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

// Object-Oriented Programming
// Define a class for Student

class Learner {
  fullName: string;
  constructor(name: string) {
    this.fullName = name;
  }
}

// Define a class for Group

class Group {
  members: Learner[] = [];
  addMember(student: Learner) {
    this.members.push(student);
  }
}

const group = new Group();

// Arrow function to start the program
const initiateProgram = async (group: Group) => {
  do {
    console.log(
      chalk.bold.magenta(
        "\n>>>>>>>>>>------------'WELCOME TO OBJECT ORIENTED PROGRAMMING PROJECT'---------------<<<<<<<<<<<<\n"
      )
    );

    const userSelection = await inquirer.prompt([
      {
        name: "choice",
        type: "list",
        message: chalk.bold.green("\t \nWho would you like to interact with?"),
        choices: [chalk.bold.yellow("Learner"), chalk.bold.yellow("Instructor"), chalk.bold.red("Exit")],
      },
    ]);

    if (userSelection.choice === chalk.bold.yellow("Instructor")) {
      console.log(
        chalk.bold.cyan("\nFeel free to ask any questions as you head to the instructor's room.\n")
      );
    } else if (userSelection.choice === chalk.bold.yellow("Learner")) {
      const learnerInput = await inquirer.prompt({
        name: "learnerName",
        type: "input",
        message: chalk.bold.magenta("\nPlease enter the learner's name you'd like to connect with."),
      });

      const existingLearner = group.members.find(
        (member) => member.fullName === learnerInput.learnerName
      );

      if (!existingLearner) {
        const newLearner = new Learner(learnerInput.learnerName);
        group.addMember(newLearner);
        console.log(
          chalk.bold.cyan(`\nHello, I am ${chalk.bold.yellow(newLearner.fullName)}. Nice to meet you!\n`)
        );
        console.log(chalk.bold.yellow("\n>>>>>>-------New learner added-------<<<<<<"));
        console.log(chalk.bold.green("\n>>>>>>>-------Current Learner List:--------<<<<<<<\n"));
        console.log(group.members);
      } else {
        console.log(
          chalk.bold.green(`\nHello, I am ${chalk.bold.magenta(existingLearner.fullName)}. Nice to see you again!\n`)
        );
        console.log(chalk.bold.cyan("\n>>>>>>>>-------Existing Learner List-------<<<<<<<\n"));
        console.log(group.members);
      }
    } else if (userSelection.choice === chalk.bold.red("Exit")) {
      console.log(chalk.bold.red("\n>>>>>>-----Exiting The Program---------<<<<<<<\n"));
      process.exit();
    }
  } while (true);
};

// Start the program
initiateProgram(group);
