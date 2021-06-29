import { EntityRepository, Repository } from "typeorm";
import { User } from "../Entity/user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User>{

//     async createUser(createUserDto:CreateUserDto):Promise<User>{
//         console.log('1')
//         const {name,emailId,password,phoneNumber,address}=createUserDto;

//         const salt= await bcrypt.genSalt();

//         const hashedPassword=await bcrypt.hash(password,salt)
//         console.log('salt',salt)
//         console.log('hashedPassword',hashedPassword)
//         console.log('2')
//         const user:User=this.create({
//             name,
//             emailId,
//             password:hashedPassword,            
//             phoneNumber,
//             address,

//         });
//         console.log('3')
//         //return await this._userRepo.save(user)  
//         try{
//             console.log('4')
//         return await this.save(user)  
//         }catch(error){

//             console.log(error.code)
            
//             if(error.code==='ER_DUP_ENTRY'){
            
//                 throw new ConflictException('Email Id already Exits')
//             }
            
//             else{
//                 console.log('Inter')
            
//                 throw new InternalServerErrorException()
            
//             }            

//         };
        
//    }


}