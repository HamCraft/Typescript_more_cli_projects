#!/usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
import { differenceInSeconds, format } from 'date-fns';
// Function to prompt the user for date and time
const askDateTime = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'date',
            message: 'Enter the target date (YYYY-MM-DD):',
            validate: (input) => {
                return /^\d{4}-\d{2}-\d{2}$/.test(input) || 'Please enter a valid date in the format YYYY-MM-DD';
            }
        },
        {
            type: 'input',
            name: 'time',
            message: 'Enter the target time (HH:MM):',
            validate: (input) => {
                return /^\d{2}:\d{2}$/.test(input) || 'Please enter a valid time in the format HH:MM';
            }
        }
    ]);
    return new Date(`${answers.date}T${answers.time}:00`);
};
// Function to start the countdown
const startCountdown = (targetDate) => {
    const countdownInterval = setInterval(() => {
        const now = new Date();
        const secondsLeft = differenceInSeconds(targetDate, now);
        if (secondsLeft <= 0) {
            console.log(chalk.green.bold('Countdown finished!'));
            clearInterval(countdownInterval);
        }
        else {
            const hours = Math.floor(secondsLeft / 3600);
            const minutes = Math.floor((secondsLeft % 3600) / 60);
            const seconds = secondsLeft % 60;
            console.log(chalk.yellow.bold(`Time left: ${format(new Date(0, 0, 0, hours, minutes, seconds), 'HH:mm:ss')}`));
        }
    }, 1000);
};
// Main function
const main = async () => {
    console.clear();
    console.log(chalk.blue('Welcome to the Countdown Timer!'));
    const targetDate = await askDateTime();
    console.log(chalk.blue(`Countdown started for ${format(targetDate, 'yyyy-MM-dd HH:mm:ss')}`));
    startCountdown(targetDate);
};
main().catch(error => console.error(error));
