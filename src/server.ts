import App from "./infra/http";

const Main = async () => {
  await App.config();
  await App.start("0.0.0.0", 3333);
};

Main();
