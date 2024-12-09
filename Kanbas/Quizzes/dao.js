import model from './model.js';

export function findQuizzesForCourse(courseId) {
    return model.find({ course: courseId });
}

export function fetchQuizDetails(quizId) {
    return model.findById(quizId);
}

export function createQuiz(quiz) {
    delete quiz._id;
    return model.create(quiz);
}

export function updateQuiz(quizId, quizUpdates) {
    return model.updateOne({ _id: quizId }, quizUpdates);
}

export function deleteQuiz(quizId) {
    return model.deleteOne({ _id: quizId });
}

export async function togglePublish(quizId) {
    const quiz = await model.findById(quizId);
    const published = !quiz.published;
    return await model.updateOne({ _id: quizId }, { published });
}