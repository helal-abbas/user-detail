import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/user/Entity/user.entity";

export const typeOrmConfig:TypeOrmModuleOptions={
    type:'mysql',
    host:'localhost',
    port:3306,
    username:'dev',
    password:'Welcome@1',
    database:'training',
    entities:[User],
    synchronize:true
}