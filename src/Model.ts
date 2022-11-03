interface Data {
	gravityValue: number;
	numberOfShapes: number;
}
export default class Model {
	width: number;
	height: number;
	shapeColors: number[];
	shapeTypes: string[];
	pixels: number;
	data: Data;

	constructor() {
		this.width = 800;
		this.height = 600;
		this.shapeColors = [0xFF7DFF, 0xFFFF7D, 0x5A76E5, 0x008080, 0xBE7DFF, 0xFFDB00, 0x5DEA5D, 0x5FDCFF, 0xFD9AB1];
		this.shapeTypes = ['triangle', 'quadrangle', 'pentagon', 'hexagon', 'circle', 'ellipse'];
		this.pixels = 0;

		this.data = {
			gravityValue: 5,
			numberOfShapes: 1
		};
	};

	getData() {
		return this.data;
	}

	getProperties() {
		return {
			width: this.width,
			height: this.height,
			shapeColors: this.shapeColors,
			shapeTypes: this.shapeTypes
		}
	}

	changeGravityValue(type: 'increase' | 'decrease') {
		let { gravityValue } = this.data;
		switch (type) {
			case 'increase':
				gravityValue += 1;
				break;
			case 'decrease':
				if (gravityValue > 1) {
					gravityValue -= 1;
				}
				break;

		}
		this.data.gravityValue = gravityValue;
	};

	changeShapesNumber(type: 'increase' | 'decrease') {
		let { numberOfShapes } = this.data;

		switch (type) {
			case 'increase':
				numberOfShapes += 1;
				break;
			case 'decrease':
				if (numberOfShapes > 1) {
					numberOfShapes -= 1;
				}
				break;
		}
		this.data.numberOfShapes = numberOfShapes;
	};
}
