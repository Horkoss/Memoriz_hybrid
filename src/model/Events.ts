export class EventArray {
	count: Number;
	contents: Array<Event>;
}

export class Event {
	id: Number;
	lat: number;
	lng: number;
	name: String;
	address: String;
	description: String;
}