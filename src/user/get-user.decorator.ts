import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "./Entity/user.entity";

export const GetUser= createParamDecorator((_data:any, ctx:ExecutionContext):User=>{

    const req=ctx.switchToHttp().getRequest();

    return req.user;







    // if(!!req.user){
    //     return !!_data ? req.user[_data]:req.user;
    // }

})