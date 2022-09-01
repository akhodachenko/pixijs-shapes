import './styles/main.scss'
import Model from './Model';
import View from './View';
import Controller from './Controller';
import * as PIXI from "pixi.js";

const App = new Controller(new Model(), new View());
export default App;
window.PIXI = PIXI;
window.App = App;

App.init();