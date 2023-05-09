import { Collections, type ExpandedPremiereResponse, type Month } from '@dkrasiev/movie-diary-core';
import type PocketBase from 'pocketbase';
import type { RecordService } from 'pocketbase';

export class PremiereService {
	private premieres: RecordService;

	constructor(private pb: PocketBase) {
		this.premieres = this.pb.collection(Collections.Premieres);
	}

	public async getPremiere(premiereId: string): Promise<ExpandedPremiereResponse> {
		return this.premieres.getOne<ExpandedPremiereResponse>(String(premiereId), {
			expand: 'subscriptions(premiere),movie'
		});
	}

	public async getPremiereList(year: number, month: Month): Promise<ExpandedPremiereResponse[]> {
		console.log('fetching', year, month);
		return this.premieres.getFullList({
			filter: `year = ${year} && month = '${month}'`,
			expand: 'subscriptions(premiere),movie'
		});
	}
}
