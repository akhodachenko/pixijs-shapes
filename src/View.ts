import { Application, Container, Graphics } from 'pixi.js';
import Controller from './Controller';
import { TextConstants } from './TextConstants';

export default class View {
	Controller: Controller;
	pixiApp: Application;

	constructor(Controller: Controller) {
		this.Controller = Controller;
	}

	initPIXIApp(properties) {
		const { width, height } = properties;

		this.pixiApp = new Application({
			width,
			height,
			view: document.getElementById('stage') as HTMLCanvasElement,
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
		gravityIncrease.addEventListener('click', () => this.Controller.changeGravityValue('increase'));
		gravityDecrease.addEventListener('click', () => this.Controller.changeGravityValue('decrease'));

		const shapesElem = document.getElementsByClassName('number-of-shapes');
		const shapesElemDecrease = shapesElem[0].getElementsByClassName('decrease')[0];
		const shapesElemIncrease = shapesElem[0].getElementsByClassName('increase')[0];

		shapesElemIncrease.addEventListener('click', () => this.Controller.changeShapesNumber('increase'));
		shapesElemDecrease.addEventListener('click', () => this.Controller.changeShapesNumber('decrease'));

		document.getElementById('shapes').innerText = TextConstants.FOOTER_SHAPES;
		document.getElementById('gravity').innerText = TextConstants.FOOTER_GRAVITY;
		document.getElementById('shapesNumber').innerText = TextConstants.SHAPES_NUMBER;
		document.getElementById('shapesArea').innerText = TextConstants.SHAPES_AREA;
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