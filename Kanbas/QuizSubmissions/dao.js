import model from './model.js';
import quizModel from '../Quizzes/model.js';

export async function gradeQuiz(quizId, userId, answers) {
    // console.log("Grading quiz", quizId, userId, answers);
    const quiz = await quizModel.findById(quizId);
    if (!quiz) {
        throw new Error("Quiz not found");
    }

    const questions = quiz.questions;
    let score = 0;

    for (const question of questions) {
        const answer = answers[question.id];

        if (!answer) {
            // skipping if no answer is provided for this question
            continue;
        }

        if (question.type === "multiple_choice") {
            // checking if the answer is correct
            const isCorrect = question.choices.some(
                (choice) => choice.id === answer && choice.isCorrect
            );
            if (isCorrect) {
                score += question.points;
            }
        } else if (question.type === "true_false") {
            // directly compare the true/false answer
            if (question.correctAnswer === answer) {
                score += question.points;
            }
        } else if (question.type === "fill_in_the_blank") {
            // Check if the user's answer matches any of the correct answers
            const userAnswer = answer?.toString().toLowerCase().trim();
            const isCorrect = question.answers.some(
                (correctAnswer) =>
                    correctAnswer.isCorrect &&
                    correctAnswer.text.toLowerCase().trim() === userAnswer
            );

            if (isCorrect) {
                score += question.points;
            }
        }
    }

    const data = questions.map((question) => {
        const answer = answers[question.id] || "";
        return {
            questionId: question.id,
            answer,
        };
    });

    // console.log("Score:", score);
    return model.create({
        quizId: quizId,
        userId: userId,
        data: data,
        score: score,
    });
}

// export async function gradeQuiz(quizId, userId, answers) {
//     // Fetch the quiz by ID
//     const quiz = await quizModel.findById(quizId);
//     if (!quiz) {
//         throw new Error("Quiz not found");
//     }

//     const questions = quiz.questions;
//     let score = 0;

//     // Iterate through each question
//     for (const question of questions) {
//         const userAnswer = answers[question.id]; // Get user's answer for this question

//         if (!userAnswer) {
//             // Skip if no answer is provided for this question
//             continue;
//         }

//         if (question.type === "multiple_choice") {
//             // Check if the answer is correct
//             const isCorrect = question.choices.some(
//                 (choice) => choice.id === userAnswer && choice.isCorrect
//             );
//             if (isCorrect) {
//                 score += question.points;
//             }
//         } else if (question.type === "true_false") {
//             // Directly compare the true/false answer
//             if (question.correctAnswer === userAnswer) {
//                 score += question.points;
//             }
//         } else if (question.type === "fill_in_the_blank") {
//             // Handle fill-in-the-blank with multiple blanks
//             const isCorrect = question.answers.every((correctAnswer, index) => {
//                 const userBlankAnswer = userAnswer[index]; // Get user's answer for this blank
//                 return (
//                     correctAnswer.isCorrect &&
//                     correctAnswer.text.toLowerCase().trim() ===
//                     (userBlankAnswer?.toLowerCase().trim() || "")
//                 );
//             });

//             if (isCorrect) {
//                 score += question.points;
//             }
//         }
//     }

//     // Prepare submission data
//     const data = questions.map((question) => {
//         const userAnswer = answers[question.id] || {};
//         return {
//             questionId: question.id,
//             answer: userAnswer,
//         };
//     });

//     // Save submission and return the result
//     return model.create({
//         quizId: quizId,
//         userId: userId,
//         data: data,
//         score: score,
//     });
// }

// fetching latest quiz submissions
export function findQuizSubmissions(quizId, userId) {
    return model.find({ userId: userId, quizId: quizId })
        .sort({ submissionTime: -1 }) // Sort in descending order (latest first)
        .limit(1);                    // Limit to 1 document
}

// return true if the user can attempt the quiz
// this means the number of attempts is less than the max attempts allowed for the quiz
export async function canAttempt(quizId, userId) {
    const quiz = await quizModel.findById(quizId);
    // console.log("Quiz Attempts:", quiz.attempts);
    // const submissions = await model.find({ userId: userId, quizId: quizId }).countDocuments();
    // console.log("Submissions:", submissions);
    return model.find({ userId: userId, quizId: quizId })
        .countDocuments()
        .then((count) => {
            return count < quiz.attempts;
        });
}

// return all latest scores for a user for all the quizzes of a course
export function findScoresForUser(quizzes, userId) {
    const quizIds = quizzes.map((quiz) => quiz._id);

    if (quizIds.length === 0) {
        return [];
    }

    return model.find({ userId: userId, quizId: { $in: quizIds } })
        .sort({ submissionTime: -1 })
        .select("quizId score")
        .limit(quizIds.length);

}