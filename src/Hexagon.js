import MainFigure from "./MainFigure";

let area = require('area-polygon')

export default class Hexagon extends MainFigure {

	drawShape() {
		super.drawShape();
		this.graphics.drawPolygon([
			new PIXI.Point(30, this.height),
			new PIXI.Point(80, this.height),
			new PIXI.Point(this.width, this.height / 2),
			new PIXI.Point(this.width / 2, 0),
			new PIXI.Point(0, this.height / 2),
			new PIXI.Point(this.width / 2, this.height + 30),
			new PIXI.Point(20, this.height / 2)
		]);

		this.setArea();

		return this.graphics
	}

	setArea() {
		this.area = area([
			[30, 100],
			[80, 100],
			[100, 50],
			[50, 0],
			[0, 50],
			[50, 130],
			[20, 50]
		]
		) >> 0;
	}
}
