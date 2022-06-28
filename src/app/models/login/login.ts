import {Injectable} from "@angular/core";
@Injectable({
  providedIn:'root'
})
export class LoginRequest {
    UserName: string | undefined;
    Password: string | undefined;
}

export class LoginResponse {
    UserName: string | undefined;
    Email: string | undefined;
    Token: string | undefined;
}
