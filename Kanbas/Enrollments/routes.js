import * as dao from "./dao.js";
export default function EnrollmentRoutes(app) {

    app.get("/api/enrollments/:userId", (req, res) => {
        const { userId } = req.params;
        const enrollments = dao.findCoursesForEnrolledUser(userId);
        res.json(enrollments);
    });

    // write to enroll and unenroll users in courses
    app.post("/api/enrollments", (req, res) => {
        // console.log(req.body);
        const { user, course } = req.body;
        dao.enrollUserInCourse(user, course);
        // console.log("User ", user, " enrolled in course ", course);
        // console.log("All Enrollments", dao.findAllEnrollments());
        res.sendStatus(201);
    });
    app.delete("/api/enrollments/:user/:course", (req, res) => {
        const { user, course } = req.params;
        if (!user || !course) {
            return res.status(400).json({ error: "User and course are required." });
        }
        dao.unenrollUserFromCourse(user, course);
        // console.log("User", user, "unenrolled from course", course);
        res.sendStatus(204);
    });
}