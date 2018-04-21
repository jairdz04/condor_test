const controller = require("../controllers/providers_controller");


module.exports = (app) => {

	app.get("/provider", controller.get);
	app.get("/provider/:id", controller.get_by_id);
	app.post("/provider/add", controller.post);
	app.put("/provider/edit/:id", controller.put);
    app.delete("/provider/delete/:id", controller.delete);
    
}


 