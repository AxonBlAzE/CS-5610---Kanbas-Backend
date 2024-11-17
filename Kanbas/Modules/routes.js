import * as modulesDao from "./dao.js";
export default function ModuleRoutes(app) {
    // update a module
    app.put("/api/modules/:moduleId", (req, res) => {
        const { moduleId } = req.params;
        const moduleUpdates = req.body;
        // console.log("Updating module with ID", moduleId, "with data", moduleUpdates);
        modulesDao.updateModule(moduleId, moduleUpdates);
        res.sendStatus(204);
    });

    // delete a module
    app.delete("/api/modules/:moduleId", (req, res) => {
        const { moduleId } = req.params;
        modulesDao.deleteModule(moduleId);
        res.sendStatus(204);
    });


}
