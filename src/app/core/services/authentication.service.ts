import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor() {}

  signin(value: any): any {
    console.log(value);
    return 1;
    // return this.http
    //   .post(this.baseAPI + this.pvmeUrl, {
    //     installation_date: moment(value.installation_date).format("YYYY-MM-DD"),
    //     company: {
    //       name: value.name_company,
    //       siren: value.siren,
    //     },
    //     customer: {
    //       name: value.name_client,
    //       email: value.email,
    //       telephone: value.telephone,
    //     },
    //     address: {
    //       street: value.street,
    //       city: value.city,
    //       zip_code: value.zip_code,
    //       country: value.country,
    //     },
    //     solar_panels_ids: [
    //       value.items.map((item: any) => {
    //         return {
    //           solar_panel_id: item.solar_panel_id,
    //         };
    //       }),
    //     ],
    //     type: value.type,
    //     nb_panels: value.nb_panels,
    //     created_at: new Date(),
    //     updated_at: new Date(),

    //     //   "company_id": 1,
    //     // "customer_id": 1,
    //     // "created_at": "2022-06-01T17:10:28.888Z",
    //     // "updated_at": "2022-06-01T17:10:28.888Z",
    //     // "solar_panels": [
    //     //   {
    //     //     "id": 1,
    //     //     "type_of": "photovoltaic",
    //     //     "serial_number": "123456",
    //     //     "created_at": "2022-06-01T17:10:28.896Z",
    //     //     "updated_at": "2022-06-01T17:10:28.896Z"
    //     //   }
    //     // ]
    //   })
    //   .pipe(retry(1), catchError(this.handleError));
  }
}
