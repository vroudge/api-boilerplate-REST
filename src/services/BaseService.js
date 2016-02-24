import SecurityContext from '../utils/securityContext';

export default class BaseService {

	constructor(context) {
		if (!context) {
			context = new SecurityContext();
		}
		this.context = context;
	}

	/**
	 * Returns a new instance of this service
	 */
	god() {
		const sv = new this.constructor();
		return sv;
	}
}
