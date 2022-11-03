export default class EventEmitter {
	subscribtions: Function[];

	constructor() {
		this.subscribtions = [];
	}

	emit(value) {
		if (this.subscribtions.length > 0) {
			for (const sub of this.subscribtions) {
				sub(value);
			}
		}
	}

	subscribe(listener) {
		if (!listener) {
			return;
		}
		this.subscribtions.push(listener);
	}

}