import View from "./View/view.mjs";
import Model from "./Model/model.mjs";
import Controller from "./Controller/controller.mjs";

const init = () => {
  const view = new View();
  const model = new Model();
  const controller = new Controller(view, model);

  controller.init();
};

init();
