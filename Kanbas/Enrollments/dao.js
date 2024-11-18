import Database from "../Database/index.js";
export function enrollUserInCourse(userId, courseId) {
    const { enrollments } = Database;
    enrollments.push({ _id: Date.now(), user: userId, course: courseId });
}
export function unenrollUserFromCourse(userId, courseId) {
    const { enrollments } = Database;
    Database.enrollments = enrollments.filter(
        (enrollment) => enrollment.user !== userId || enrollment.course !== courseId
    );
}
// function to find all enrollments for a user (helper function)
export function findCoursesForEnrolledUser(userId) {
    const { enrollments } = Database;
    const enrollmentData = enrollments.filter((enrollment) => enrollment.user === userId);
    return enrollmentData;
}

// function to find all enrollments (helper function)
export function findAllEnrollments() {
    return Database.enrollments;
}

// function to find all enrollments for a course (helper function)
export function findUsersForEnrolledCourse(courseId) {
    const { enrollments } = Database;
    const enrollmentData = enrollments.filter((enrollment) => enrollment.course === courseId);
    return enrollmentData;
}

// function to enroll another user using username. also check if the user is already enrolled in the course
export function enrollUserInCourseByUsername(username, courseId) {
    const { users, courses, enrollments } = Database;
    const user = users.find((user) => user.username === username);
    const course = courses.find((course) => course._id === courseId);

    if (!user || !course) {
        return false; // user or course not found
    }

    // checking if the user is already enrolled in the course
    const isAlreadyEnrolled = enrollments.some(
        (enrollment) => enrollment.user === user._id && enrollment.course === courseId
    );

    if (isAlreadyEnrolled) {
        return false; // user is already enrolled
    }

    enrollUserInCourse(user._id, course._id);
    return true;
}
