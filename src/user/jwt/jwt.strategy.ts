import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../Entity/user.entity";
import { UserRepository } from "../Repository/user.repository";
import { JwtPayload } from "./jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy ){

    
    constructor(@InjectRepository(UserRepository) private _userRepo:UserRepository){
        super({
            secretOrKey: 'topSecret51',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }
    
    async validate(payload:JwtPayload):Promise<User>{
        const { emailId }=payload;
        const user =this._userRepo.findOne({emailId})
        if(!user){
            throw new UnauthorizedException()
        }
        return user;
    }


}