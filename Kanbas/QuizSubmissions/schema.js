import mongoose from "mongoose";

// schema for submitted answers, it should contain questions as well as answers.
const submittedDataSchema = new mongoose.Schema({
    questionId: {
        type: String,
        required: true,
    },

    answer: {
        type: mongoose.Schema.Types.Mixed,  // Can be a string, boolean, or other types based on the question type
        required: true,
    },
});

// quizSubmission schema
const schema = new mongoose.Schema(
    {
        quizId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "QuizModel",
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserModel",
            required: true,
        },
        data: [submittedDataSchema],
        score: {
            type: Number,
            required: true,
        },
        submissionTime: {
            type: Date,
            default: Date.now,
        },
    },
    {
        collection: "quiz_submissions",
        timestamps: true,
    }
);

export default schema;