import { Application, Container, Graphics } from 'pixi.js';
import App from './index';
import text from './text.json';

export default class View {
	constructor(Controller) {
		this.Controller = Controller;
	}

	initPIXIApp(properties) {
		const { width, height } = properties;
		const canvas = document.getElementById('stage');

		this.pixiApp = new Application({
			width,
			height,
			view: canvas,
			backgroundAlpha: 0
		});

		this.pixiApp.stage.sortableChildren = true;

		this.createRectangle(this.createStage(), properties);

		this.initDOM();
	}

	initDOM() {
		const gravityElem = document.getElementsByClassName('gravity-value');
		const gravityDecrease = gravityElem[0].getElementsByClassName('decrease')[0];
		const gravityIncrease = gravityElem[0].getElementsByClassName('increase')[0];
		gravityIncrease.addEventListener('click', () => this.changeGravityValue('increase'));
		gravityDecrease.addEventListener('click', () => this.changeGravityValue('decrease'));

		const shapesElem = document.getElementsByClassName('number-of-shapes');
		const shapesElemDecrease = shapesElem[0].getElementsByClassName('decrease')[0];
		const shapesElemIncrease = shapesElem[0].getElementsByClassName('increase')[0];

		shapesElemIncrease.addEventListener('click', () => this.changeShapesNumber('increase'));
		shapesElemDecrease.addEventListener('click', () => this.changeShapesNumber('decrease'));

		document.getElementById('shapes').innerinnerText = text['FOOTER-SHAPES'];
		document.getElementById('gravity').innerinnerText = text['FOOTER_GRAVITY'];
		document.getElementById('shapesNumber').innerinnerText = text['SHAPES_NUMBER'];
		document.getElementById('shapesArea').innerinnerText = text['SHAPES_AREA'];
	}

	createStage() {
		const container = new Container();
		container.name = 'stage';

		this.pixiApp.stage.addChild(container);
		return container;
	}

	createRectangle(parentContainer, properties) {
		const { width, height } = properties;
		this.Controller.generateShapes();
		const graphics = new Graphics();
		graphics.name = 'rectangle';
		graphics.beginFill(0x000000);
		graphics.drawRect(0, 0, width, height);
		graphics.endFill();
		graphics.alpha = 0;
		graphics.interactive = true;
		graphics.buttonMode = true;
		parentContainer.addChild(graphics);
		graphics.on('pointerdown', ({ data }) => this.Controller.createShapeOnClick(data));
	}

	updateGravity({ gravityValue }) {
		const footerGravity = document.getElementById('footer-gravity');
		footerGravity.innerHTML = gravityValue;
	}

	updateNumberOfShapes({ numberOfShapes }) {
		const shapeNumber = document.getElementById('footer-number-of-shapes');
		shapeNumber.innerHTML = numberOfShapes;
	}
}