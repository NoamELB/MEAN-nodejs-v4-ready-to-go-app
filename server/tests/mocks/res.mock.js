'use strict';
let self;
/**
 * res mock
 */
class ResMock {
	constructor() {
		self = this;
	}
	send(dataOrError) {
		self.latestData = dataOrError; 
	}
	popLatestData() {
		let temp = self.latestData;
		self.latestData = undefined;
		return temp;
	}
	next() {
		self.latestData = 'next';
	}
}

module.exports = ResMock;