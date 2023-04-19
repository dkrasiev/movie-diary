export class HttpError extends Error {
	public response: Response;

	constructor(
		public data: unknown,
		public status: number,
		message?: string,
		options?: ErrorOptions
	) {
		super(message, options);

		this.response = new Response(JSON.stringify(this.data), {
			status: this.status
		});
	}
}
