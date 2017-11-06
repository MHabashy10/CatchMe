
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export interface User {
     firstName: string;
     lastName: string;
     email: any;
     phone: number;
}

@Injectable()
export class AuthService {
     currentUser: User;
     private commentsUrl = '/api/v1/accounts';
     // Resolve HTTP using the constructor
     constructor(private http: Http) { }

     public login(credentials) {
          if (credentials.email === null || credentials.password === null) {
               return Observable.throw("Please insert credentials");
          } else {
               let bodyString = JSON.stringify(credentials);
               let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
               let options = new RequestOptions({ headers: headers }); // Create a request option

               return this.http.post(this.commentsUrl + '/login', bodyString, options) // ...using post request
                    .map((res: Response) =>
                    this.currentUser = res.json()) // ...and calling .json() on the response to return data
               // .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any


               //  return Observable.create(observer => {
               //    // At this point make a request to your backend to make a real check!
               //    let access = (credentials.password === "pass" && credentials.email === "email");
               //    this.currentUser = new User('Simon', 'saimon@devdactic.com');
               //    observer.next(access);
               //    observer.complete();
               //  });
          }
     }

     public register(credentials) {
          if (credentials.email === null || credentials.password === null) {
               return Observable.throw("Please insert credentials");
          } else {
               // At this point store the credentials to your backend!
               let bodyString = JSON.stringify(credentials);
               let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
               let options = new RequestOptions({ headers: headers }); // Create a request option

               return this.http.post(this.commentsUrl + '/signUp', bodyString, options) // ...using post request
                    .map((res: Response) =>
                    this.currentUser = res.json()
               )
          }
     }

     public getUserInfo(): User {
          return this.currentUser;
     }

     public logout() {
          return Observable.create(observer => {
               this.currentUser = null;
               observer.next(true);
               observer.complete();
          });
     }
}
