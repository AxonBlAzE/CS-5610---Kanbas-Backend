import Database from "../Database/index.js";
export function findModulesForCourse(courseId) {
    const { modules } = Database;
    return modules.filter((module) => module.course === courseId);
}
export function createModule(module) {
    const newModule = { ...module, _id: Date.now().toString() };
    Database.modules = [...Database.modules, newModule];
    // console.log(Database.modules);
    return newModule;
}
export function deleteModule(moduleId) {
    const { modules } = Database;
    Database.modules = modules.filter((module) => module._id !== moduleId);
}
export function updateModule(moduleId, moduleUpdates) {
    const { modules } = Database;
    const module = modules.find((module) => module._id === moduleId);
    if (!module) {
        throw new Error(`Module with ID ${moduleId} not found.`);
    }
    // console.log("Updated module", module);
    Object.assign(module, moduleUpdates);
    return module;
}

