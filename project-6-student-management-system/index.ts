#! /usr/bin/env node 

import inquirer from "inquirer";
import chalk from "chalk";

let myBalance = 0;
let studentData: any[] = [];
let randomId: number = Math.floor(10000 + Math.random() * 90000);
console.log(
  chalk.bold.blueBright(`****Welcome To Student Management System****`)
);

while (true) {
  let answer = await inquirer.prompt({
    name: "ans",
    type: "list",
    choices: [
      "Add Student",
      "Remove Student",
      "Check Balance",
      "View Added Students",
      "Exit",
    ],
    message: "What do you want to do?",
  });

  if (answer.ans === "Add Student") {
    let studentName = await inquirer.prompt({
      name: "Student Name",
      type: "input",
      message: "Enter Student Name",
    });
    let courses = await inquirer.prompt({
      name: "course",
      type: "list",
      choices: [
        "HTML/CSS",
        "TypeScript",
        "Python",
        "PHP",
        "Full Stack Development",
      ],
      message: "Select Courses",
    });
    randomId = Math.floor(10000 + Math.random() * 90000);

    studentData.push({
      id: randomId,
      name: studentName["Student Name"],
      course: courses.course,
    });
    console.log(
      chalk.bold.green(
        `Student Added: Name ${studentName["Student Name"]} Course ${courses.course}`
      )
    );
  } else if (answer.ans === "Remove Student") {
    let studentToRemove = await inquirer.prompt({
      name: "exStudent",
      type: "input",
      message: "Enter Student Name You Want To Remove",
    });

    let index = studentData.findIndex(
      (student) => student.name === studentToRemove.exStudent
    );
    if (index !== -1) {
      studentData.splice(index, 1);
      console.log(
        chalk.yellow(
          `Studentname:`,
          `${studentToRemove.exStudent}`,
          `Removed Successfully`
        )
      );
    } else {
      console.log(
        chalk.bold.red(
          `Studentname:`,
          `${studentToRemove.exStudent}`,
          ` Not found`
        )
      );
    }
  } else if (answer.ans === "Check Balance") {
    console.log(chalk.green(`Your Current Balance is ${myBalance}`));
  } else if (answer.ans === "View Added Students") {
    console.log("Added Students:");
    studentData.forEach((student, index) => {
      console.log(
        chalk.magenta(
          `#${index + 1} - Name: ${student.name}, ID: ${randomId}, course: ${
            student.course
          }`
        )
      );
    });
  } else if (answer.ans === "Exit") {
    break;
  }
}

let developerName: string = "Ahmed Yaqoob Dhedhi";
let greeting: string = "Thanks For Using";
console.log(chalk.bold.blueBright(`\n`, `Developed by : ${developerName}\n`));
console.log(chalk.underline.red(`${greeting}`));