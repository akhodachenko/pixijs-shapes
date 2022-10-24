import './styles/main.scss'
import Model from './Model';
import View from './View';
import Controller from './Controller';

const App = new Controller(new Model(), new View());
App.init();

export default App;