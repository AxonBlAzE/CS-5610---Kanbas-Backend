import mongoose from "mongoose";

// multiple choice questions
const choiceSchema = new mongoose.Schema({
    id: String,
    text: String,
    isCorrect: Boolean
});

// fill in the blank questions
const answerSchema = new mongoose.Schema({
    id: String,
    text: String,
    isCorrect: Boolean
});

// question schema
const questionSchema = new mongoose.Schema({
    id: String,
    type: {
        type: String,
        enum: ['multiple_choice', 'true_false', 'fill_in_the_blank']
    },
    points: Number,
    title: String,
    text: String,
    choices: [choiceSchema],
    correctAnswer: Boolean,
    answers: [answerSchema]
});

// quiz schema
const schema = new mongoose.Schema(
    {
        title: String,
        description: String,
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CourseModel"
        },
        quizType: String,
        points: Number,
        assignmentGroup: String,
        shuffleAnswers: Boolean,
        timeLimit: Number,
        attempts: Number,
        showCorrectAnswers: Boolean,
        accessCode: String,
        oneQuestionAtTime: Boolean,
        webcamRequired: Boolean,
        lockQuestionsAfterAnswering: Boolean,
        dueDate: Date,
        availableFrom: Date,
        availableUntil: Date,
        published: Boolean,
        questions: [questionSchema],
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: "quizzes",
        timestamps: true
    }
);

export default schema;