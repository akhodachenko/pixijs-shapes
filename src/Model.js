import App from './index';
export default class Model {
	constructor() {
		this.width = 800;
		this.height = 600;
		this.shapeColors = [0xFF7DFF, 0xFFFF7D, 0x5A76E5, 0x008080, 0xBE7DFF, 0xFFDB00, 0x5DEA5D, 0x5FDCFF, 0xFD9AB1];
		this.shapeTypes = ['triangle', 'quadrangle', 'pentagon', 'hexagon', 'circle', 'ellipse'];
		this.pixels = 0;

		this.data = {
			gravityValue: 5,
			numberOfShapes: 1
		}
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

	changeGravityValue(type) {
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
		App.onUpdate.emit(this.data);
	};

	changeShapesNumber(type) {
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

		App.onUpdate.emit(this.data);
	};
}
