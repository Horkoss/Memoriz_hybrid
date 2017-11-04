import { ImageURL } from './ImageURL'

export class ContentArray {
	count: Number;
	contents: Array<Content>;
}

export class Content {
	id: Number;
	caption: String;
	urls: ImageURL;
	username: String;
	user_id: Number;
}