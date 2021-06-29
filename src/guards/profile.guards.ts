import { CanActivate, ExecutionContext, forwardRef, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";
//import { UserService } from "src/user/user.service";

@Injectable()
export class UserProfileGuards implements CanActivate{

    constructor(
        
        private readonly _jwtService:JwtService
    ){

    }

    canActivate(context:ExecutionContext): boolean | Promise<boolean> | Observable<boolean>
//     {
//         const request= context.switchToHttp().getRequest();
//         console.log("Start")
//         console.log(request)
//        console.log("Finish")

//         return true;
//     }

// }    

{​​​​​​​​
        const req=context.switchToHttp().getRequest<Request>();
 
        const bearerToken = req.headers.authorization
        if(!bearerToken){​​​​​​​​

            return false;
        }​​​​​​​​
        const Token=bearerToken.split('Bearer ')[1];
        Token.trim();
        const Verification = this._jwtService.verify(Token,{​​​​​​​​secret : 'secret'}​​​​​​​​);
        if(Verification){​​​​​​​​
        return true;
    }​​​​​​​​
    return false;
    }​​​​​​​​
}​​​​​​​​

