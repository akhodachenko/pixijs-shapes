import { Point } from 'pixi.js'
import MainFigure from "./MainFigure";

let area = require('area-polygon')
export default class Hexagon extends MainFigure {

	drawShape() {
		super.drawShape();
		this.graphics.drawPolygon([
			new Point(10, this.height),
			new Point(70, this.height),
			new Point(this.width, this.height / 2),
			new Point(this.width / 2, 0),
			new Point(0, this.height / 2),
			new Point(this.width / 2, this.height + 30),
			new Point(20, this.height / 2)
		]);

		this.setArea();

		return this.graphics
	}

	setArea() {
		this.area = area([
			[10, 100],
			[70, 100],
			[100, 50],
			[50, 0],
			[0, 50],
			[50, 130],
			[20, 50]
		]
		) >> 0;
	}
}
