import Triangle from "./modules/Triangle";
import Quadrangle from "./modules/Quadrangle";
import Pentagon from "./modules/Pentagon";
import Hexagon from "./modules/Hexagon";
import Circle from "./modules/Circle";
import Ellipse from "./modules/Ellipse";
import EventEmitter from "./EventEmitter";
import View from "./View";
import Model from "./Model";
import { Graphics } from "pixi.js";

export default class Controller {
	Model: Model;
	View: View;
	onUpdate: EventEmitter;

	constructor(Model: Model) {
		this.Model = Model;
		this.View = new View(this);
		this.onUpdate = new EventEmitter();
	};

	init() {
		this.View.initPIXIApp(this.Model.getProperties());
		this.onUpdate.subscribe(this.View.updateGravity.bind(this));
		this.onUpdate.subscribe(this.View.updateNumberOfShapes.bind(this));
	}

	createShapeOnClick(data) {
		const properties = this.Model.getProperties();
		const { x, y } = data.global;
		const shape = this.initShape();

		shape.graphics.position.set(x, y);
		this.shapesFalls(shape, properties, x, y);
	}

	makeShapeDisappear(figure, makeShapeFalls) {
		const shape = figure.graphics;
		let { shapeColors } = this.Model.getProperties();
		const stage = this.View.pixiApp.stage;
		
		const ticker = this.View.pixiApp.ticker;
		this.Model.pixels -= figure.area;
		shape.destroy();
		stage.children.forEach((graphic: Graphics) => {
			if (graphic && graphic.tint) {
				graphic.tint = shapeColors[Math.floor(Math.random() * shapeColors.length)];
			}
		})

		ticker.remove(makeShapeFalls);
	}

	initShape() {
		let { shapeTypes, shapeColors } = this.Model.getProperties();
		const parentContainer = this.View.pixiApp.stage;
		const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
		let shape;
		const color = shapeColors[Math.floor(Math.random() * shapeColors.length)];
		switch (shapeType) {
			case 'quadrangle':
				shape = new Quadrangle({ color });
				break;
			case 'pentagon':
				shape = new Pentagon({ color });
				break;
			case 'hexagon':
				shape = new Hexagon({ color });
				break;
			case 'circle':
				shape = new Circle({ color });
				break;
			case 'ellipse':
				shape = new Ellipse({ color });
				break;
			default:
				shape = new Triangle({ color });
		}

		shape.drawShape();
		parentContainer.addChild(shape.graphics);

		this.Model.pixels += shape.area;

		return shape
	};

	generateShapes() {
		const defaultNumberOfShapes = 1;
		if (this.View.pixiApp) {
			const ticker = this.View.pixiApp.ticker;
			let startTime = Date.now(); // save time for calc diff

			const func = () => {
				if (Date.now() - startTime > 1000 / (this.Model.getData().numberOfShapes || defaultNumberOfShapes)) { // time spent
					startTime = Date.now();
					const shape = this.initShape();
					this.shapesFalls(shape, this.Model.getProperties());
				}
			};
			ticker.add(func);
			return func;
		}
	}

	shapesFalls(figure, properties, x = Math.floor(Math.random() * (800 - figure.graphics.width)), y = -figure.graphics.height) {
		let shape = figure.graphics;
		const pixiApp = this.View.pixiApp;
		const defaultGravity = 5;
		const ticker = pixiApp.ticker;
		const parentContainer = pixiApp.stage;
		const { height } = properties;
		const pixelsElem = document.getElementById('surface-area');

		pixelsElem.innerHTML = this.Model.pixels + '';
		const shapeNumber = document.getElementById('number');
		shapeNumber.innerHTML = (parentContainer.children.length - 1) + '';
		shape.position.set(x, y);

		const makeShapeFalls = () => {
			if (shape.y >= height + shape.height) {
				this.Model.pixels -= figure.area;
				ticker.remove(makeShapeFalls);
				pixelsElem.innerHTML = this.Model.pixels + '';

				shape.destroy();
			} else {
				shape.y += this.Model.getData().gravityValue || defaultGravity
			}
		};

		shape.interactive = true;
		shape.buttonMode = true;

		shape.on('pointerdown', () => this.makeShapeDisappear(figure, makeShapeFalls));

		ticker.add(makeShapeFalls);
	}

	changeShapesNumber(type: 'increase' | 'decrease') {
		this.Model.changeShapesNumber(type);
		this.onUpdate.emit(this.Model.getData());
	}

	changeGravityValue(type: 'increase' | 'decrease') {
		this.Model.changeGravityValue(type);
		this.onUpdate.emit(this.Model.getData());
	}
}
