import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class RetrieveSelectionsService {
	basePath: string = '/retrieve/'

	constructor(private http: HttpClient) {
	}

	getRegionList() {
		return lastValueFrom(this.http.get<string[]>(`${this.basePath}region/list`))
	}

	getProvinceList(region: string) {
		return lastValueFrom(this.http.get<string[]>(`${this.basePath}${region}/province/list`))
	}

	getCityList(region: string, province: string) {
		return lastValueFrom(this.http.get<string[]>(`${this.basePath}${region}/${province}/city/list`))
	}

}
