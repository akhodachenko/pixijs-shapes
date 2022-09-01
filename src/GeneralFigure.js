/* PIXI aliases */
import * as PIXI from 'pixi.js';

const Graphics = PIXI.Graphics;

export default class Shape {
	constructor(params) {

		this.width = 100;
		this.height = 100;
		this.graphics = null;
		this.type = params.type;
		this.color = params.color;
		this.area = null;
	}

	drawShape() {
		this.graphics = new Graphics();
		this.graphics.beginFill(this.color);
		this.graphics.position.set(Math.floor(Math.random() * (800 - this.graphics.width)), -this.graphics.height);
	}
}
