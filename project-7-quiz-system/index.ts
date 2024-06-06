#! /usr/bin/env node 
// File: quizSystem.ts
import inquirer from 'inquirer';
import chalk from 'chalk';
import _ from 'lodash';

// Define the questions for the quiz
const questions = [
    {
        type: 'list',
        name: 'question1',
        message: 'What is the capital of France?',
        choices: ['Berlin', 'Madrid', 'Paris', 'Lisbon'],
        answer: 'Paris'
    },
    {
        type: 'list',
        name: 'question2',
        message: 'Which planet is known as the Red Planet?',
        choices: ['Earth', 'Mars', 'Jupiter', 'Venus'],
        answer: 'Mars'
    },
    {
        type: 'list',
        name: 'question3',
        message: 'What is the largest ocean on Earth?',
        choices: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
        answer: 'Pacific Ocean'
    }
];

// Function to prompt questions and calculate results
async function runQuiz() {
    console.log(chalk.blue('Welcome to the Quiz System!'));

    // Shuffle the questions array
    const shuffledQuestions = _.shuffle(questions);

    let correctAnswers = 0;

    for (const question of shuffledQuestions) {
        const answer = await inquirer.prompt([{
            type: question.type,
            name: question.name,
            message: question.message,
            choices: question.choices
        }]);

        if (answer[question.name] === question.answer) {
            correctAnswers++;
        }
    }

    console.log(chalk.green(`\nYou have completed the quiz!`));
    console.log(chalk.yellow(`You got ${correctAnswers} out of ${shuffledQuestions.length} correct.`));
    console.log(chalk.blue('Thank you for participating!'));
}

// Run the quiz
runQuiz();
