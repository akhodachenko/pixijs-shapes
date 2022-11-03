import './styles/main.scss'
import Model from './Model';
import Controller from './Controller';

const App = new Controller(new Model());
App.init();