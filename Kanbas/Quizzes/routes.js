import * as dao from "./dao.js";
import * as quizSubmissionDao from "../QuizSubmissions/dao.js";


export default function QuizRoutes(app) {

    // fetch quiz details by id
    app.get("/api/quizzes/:qid", async (req, res) => {
        const { qid } = req.params;
        // console.log("Fetching quiz details", qid);
        const quiz = await dao.fetchQuizDetails(qid);
        res.json(quiz);
    });


    // create a new quiz
    app.post("/api/quizzes", async (req, res) => {
        const quiz = req.body;
        const newQuiz = await dao.createQuiz(quiz);
        res.send(newQuiz);
    });

    // update a quiz
    app.put("/api/quizzes/:qid", async (req, res) => {
        const { qid } = req.params;
        const quizUpdates = req.body;
        const status = await dao.updateQuiz(qid, quizUpdates);
        res.send(status);
    });

    // delete a quiz
    app.delete("/api/quizzes/:qid", async (req, res) => {
        const { qid } = req.params;
        const status = await dao.deleteQuiz(qid);
        res.send(status);
    });

    // toggle publish status of a quiz
    app.put("/api/quizzes/:qid/publish", async (req, res) => {
        const { qid } = req.params;
        const status = await dao.togglePublish(qid);
        res.send(status);
    });

    // grade a quiz
    app.post("/api/quizzes/:qid/grade", async (req, res) => {
        const { qid } = req.params;
        const { userId, answers } = req.body;
        const status = await quizSubmissionDao.gradeQuiz(qid, userId, answers);
        res.send(status);
    });

    // fetch latest quiz submission for a quiz and a user
    app.get("/api/quizzes/:qid/submissions/:uid", async (req, res) => {
        const { qid, uid } = req.params;
        const submissions = await quizSubmissionDao.findQuizSubmissions(qid, uid);
        res.json(submissions);
    });

    // return if the user can attempt the quiz
    app.get("/api/quizzes/:qid/canAttempt/:uid", async (req, res) => {
        const { qid, uid } = req.params;
        const status = await quizSubmissionDao.canAttempt(qid, uid);
        res.json(status);
    });


    // fetch latest scores for a user for all the quizzes of a course
    app.get("/api/quizzes/course/:cid/user/:uid/scores", async (req, res) => {
        const { cid, uid } = req.params;
        const quizzes = await dao.findQuizzesForCourse(cid);
        const scores = await quizSubmissionDao.findScoresForUser(quizzes, uid);
        res.json(scores);
    });

}
