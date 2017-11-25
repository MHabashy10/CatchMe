
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';


import { Storage } from '@ionic/storage';

export class User {
    firstName: string;
    lastName: string;
    email: any;
    phone: number;

    constructor() {
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.phone = null;
    };
}

@Injectable()
export class AuthService {
    currentUser: User;
    private commentsUrl = '/api/v1/accounts';
    // Resolve HTTP using the constructor
    constructor(private http: Http, private storage: Storage) { }

    public login(credentials) {
        if (credentials.email === null || credentials.password === null) {
            return Observable.throw("Please insert credentials");
        } else {
            let bodyString = JSON.stringify(credentials);
            let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
            let options = new RequestOptions({ headers: headers }); // Create a request option

            return this.http.post(this.commentsUrl + '/login', bodyString, options) // ...using post request
                .pipe(
                tap((res: Response) => this.setUserInfo(res.json())), // tap set the userData
                map((res: Response) => res.json())
                ) // ...and calling .json() on the response to return data
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
                .pipe(
                tap((res: Response) => this.setUserInfo(res.json())), // tap set the userData
                map((res: Response) => res.json())
                )
        }
    }

    public getUserInfo(): Promise<User> {
        // get a userData object
        return this.storage.get('userData');
    }

    public setUserInfo(user: User): void {
        // set a userData object
        this.storage.set('userData', user);

    }

    public logout() {
        return Observable.create(observer => {
            // clear userData object
            this.setUserInfo(null);
            observer.next(true);
            observer.complete();
        });
    }
}
