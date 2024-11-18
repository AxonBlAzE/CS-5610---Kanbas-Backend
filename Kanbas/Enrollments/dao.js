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