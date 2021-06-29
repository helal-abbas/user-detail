import { ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import {
    HttpException,
     HttpStatus,
     Injectable,
      NotFoundException
     } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, getRepository } from 'typeorm';
import { SignUpUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import {     
    User 
} from './Entity/user.entity';
import { UserRepository } from './Repository/user.repository';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signIn.dto';
import { JwtPayload } from './jwt/jwt-payload.interface';
import { UserProfile } from './dto/user.profile';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { SmsServiceTrigger } from 'src/service/sms-service.trigger';

@Injectable()
export class UserService {

    constructor(@InjectRepository(UserRepository) private readonly _userRepo:UserRepository,
               private readonly _jwtService:JwtService,
               private smsService:SmsServiceTrigger
               //private jwtStrategy:JwtStrategy
               ){}   


    async signUP(createUserDto:SignUpUserDto):Promise<{generateToken:string}>{

        const {name,emailId,password,phoneNumber,address}=createUserDto; //fixed later
        const salt= await bcrypt.genSalt()
        const hashedPassword=await bcrypt.hash(password,salt)
        const user:User=this._userRepo.create({
            name,
            emailId,
            password:hashedPassword,            
            phoneNumber,
            address,
        });
        try
        {      
            await this._userRepo.save(user) 
            const payload:JwtPayload={emailId}
            const generateToken=await this._jwtService.sign(payload) 
            return { generateToken }
        }        
        catch(error){
            if(error.code==='ER_DUP_ENTRY'){
                throw new ConflictException('Email Id already Exits')
            }
            else            
            {            
                throw new InternalServerErrorException()           
            }       
        };
    }

    async varifyUserEmail(generatedToken:string){
        let user:User;
        try{
            const payload:JwtPayload=await this._jwtService.verify(generatedToken)
            user =await this.findByEmailId(payload.emailId)
        }
        catch(error){
            throw new InternalServerErrorException() // fixed later
        }

            if(!user){
                throw new NotFoundException();  //fixed later
        }   
    
            user.isVerified=true;
            try{
                await this._userRepo.save(user)
            }
            catch(error){
                throw new InternalServerErrorException()
            }
            return 'Email Successfully verified'

    }

    async signIn(signInDto:SignInDto):Promise<{ accessToken:string }>{        
    
        const {emailId,password}=signInDto;        
        const user:User =await this._userRepo.findOne({emailId})  
        
        if(!user.isVerified){
            throw new UnauthorizedException('Please verify your Email')
        }      
        if(user && (await bcrypt.compare(password,user.password))){
            const payload: JwtPayload= { emailId }
            const accessToken:string = await this._jwtService.sign(payload);   
            const sms=Math.random()
            this.smsService.sendSMS(user); 
            return { accessToken }
            
        }
        else
        {        
            throw new UnauthorizedException('Please check your login credential')       
        }        
    }


    async getProfile(user:User):Promise<UserProfile | User[]>{

        const _profile= await this.findByEmailId(user.emailId)
        if(!_profile)
        return

        let profile:UserProfile={
            name:_profile.name,
            emailId:_profile.emailId,
            phoneNumber:_profile.phoneNumber,
            address:_profile.address
        }
//        this.smsService.sendSMS(); 
        
        return profile
    }

    async findByEmailId(emailId:string):Promise<User>{
        const foundUser=await this._userRepo.findOne({emailId})
        if(!foundUser){
            throw new NotFoundException(`User Not Found using emailId: ${emailId}`)
        }
        return foundUser
    }

    async findAllUser():Promise<User[]>{
        return await this._userRepo.find()
    }
    async updateUser(emailId:string,updateUserDto:UpdateUserDto):Promise<User>{
        let userDetail=await this._userRepo.findOne({emailId});
        console.log(userDetail)
        if(!userDetail){      
        throw new NotFoundException('Not Found User');
    }
        else
    {

        const {password,phoneNumber,address}=updateUserDto;
        userDetail.password=password;
        userDetail.phoneNumber=phoneNumber;
        userDetail.address=address;
        const updatedUser=await this._userRepo.save(userDetail);  
             
            return updatedUser;
        }
    }

    async deleteUser(emailId:string){
        const result=await getConnection()
        .createQueryBuilder()
        .delete()
        .from(User)
        .where('emailId=:emailId',({emailId}))
        .execute()            
        console.log(result)           

    }
    

    // forgotPassword(forgotPassword:ForgotPasswordDto):Promise<User>{
    //     const {emailId}=forgotPassword;
    //     const forgotUser=this._userRepo.findOne({emailId})

    //     if (!forgotUser){
    //         throw new NotFoundException()
    //     }
    //     else{
    //         forgotUser.
    //     // //user.expiration_date = new Date(today.getTime() + 86400000); // next day date 
    //     // this._userRepository.save(user);
    //     // this.eventEmitter.emit('forgotpassward', identifier, user);
        
    //   } 
    //   return
        
    // }


                
}
























































    



function IsEmailOrPhone(identifier: string) {
    throw new Error('Function not implemented.');
}
    //  userEntity:User[]=[];
    //  private static MAX_REGISTRATION=10;
    // //  const max=100000
    // //  const min=10000
    
    // public createUser(createUserDto:CreateUserDto){

    //     const USERID_GENERATE_TO=100000
    //     const USERID_GENERATE_FROM=10000
        
    //     let message=""
        
    //     if(this.userEntity?.length<UserService.MAX_REGISTRATION)

    //     {   
            
    //         const id=(Math.floor(Math.random()*(USERID_GENERATE_TO-USERID_GENERATE_FROM + 1)) + USERID_GENERATE_FROM).toString()

    //         //const newUser=new User(userId,createDto.name,createDto.email,createDto.password,createDto.address);
    //         const {name,email,password,address}=createUserDto;

    //         const newUser:User={
    //             id,
    //             name,
    //             email,
    //             password,
    //             address
    //         }
    //         this.userEntity.push(newUser)
    //         message= id;
            
    //     }
    //     else{
        
    //         message= "Our List is full for today!"
        
    //     }

    //     return message;
        
    // }
    // public getUser(){

    //     return this.userEntity

    // }

    // public getSingleUser(userId:string){

    //     const user=this.findUser(userId)[0]

    //     return user

    // }

    // public updateUser(userId:string,updateUserDto:User){
        
    //     const userIndex=this.userEntity.findIndex(user=>user.id===userId)
        
    //     const userDetail=this.userEntity[userIndex]
    //     //const updateUser=
    //     //const [userDetail,userIndex]=this.findUser(userId)

    //     const updateUser={...userDetail}

    //     if(updateUserDto.name){

    //         updateUser.name=updateUserDto.name;

    //     }

    //     if(updateUserDto.email){

    //         updateUser.email=updateUserDto.email;

    //     }

    //     if(updateUserDto.password){

    //         updateUser.password=updateUserDto.password;

    //     }

    //     if(updateUserDto.address){

    //         updateUser.address=updateUserDto.address;

    //     }

    //     this.userEntity[userIndex]=updateUser;

    // }




    // public deleteUser(userId:string){

    //     const userIndex=this.userEntity.findIndex(user=>user.id===userId)

    //     //const userIndex=this.findUser(userId)[1]
    //     this.userEntity.splice(userIndex,1)

    // }




    // public findUser(Id:string):[User, number]{

    //     const userIndex=this.userEntity.findIndex(user=>user.id===Id);

    //     const userDetail=this.userEntity[userIndex];

    //     if(!userDetail){

    //         throw new NotFoundException('Could not find User')

    //     }

    //     return [userDetail,userIndex]

    // }