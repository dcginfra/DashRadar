import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { CypherResponse } from './cypher-response';


@Injectable()
export class CypherService {

	private cypherURL: string = environment.cypherUrl;

	constructor(private http: HttpClient) { 
	}


	executeQuery(query: string, params: object): Observable<CypherResponse> {
		return this.http.get<any>(this.cypherURL+"?query="+encodeURIComponent(query)+"&params="+encodeURIComponent(JSON.stringify(params)))
		//return this.http.post(this.cypherURL, {query: query, params: params})
		.map((response: any) => {
			//let json = response.json();
			return new CypherResponse(response.columns, response.data);
		});
	}

}
