import { JotsController } from "./Controllers/JotsController.js";
import { ValuesController } from "./Controllers/ValuesController.js";

class App {
  // valuesController = new ValuesController();
  jotsController = new JotsController();
}

window["app"] = new App();
