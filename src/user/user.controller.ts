import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UseGuards, UsePipes } from '@nestjs/common';
import { User } from './Entity/user.entity';
import { UserService } from './user.service';
import { SignUpUserDto} from './dto/create-user.dto'
//import { UpdateUserDto } from './dto/update-user.dto';
import { SignInDto } from './dto/signIn.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { ValidationPipe } from '@nestjs/common';
//import { UserProfile } from './dto/user.profile';
import { UserProfileGuards } from 'src/guards/profile.guards';
import { UserProfile } from './dto/user.profile';
//import { request } from 'express';
@Controller('user') // fixed later
export class UserController {
    constructor(private readonly _userService:UserService){

    }
    
    @Post('/signup')
    @UsePipes(ValidationPipe)
    signUp(@Body() createUserDto:SignUpUserDto):Promise<{ generateToken:string }>{
        return this._userService.signUP(createUserDto)
    
    }

    @Get('/verify/:token')
    verifyEmail(@Param('token') token:string){
        return this._userService.varifyUserEmail(token)
    }
    
    @Post('/signin')
    @UsePipes(ValidationPipe)
    signIn(@Body() signInDto:SignInDto):Promise<{ accessToken:string }>{
        console.log()
        return this._userService.signIn(signInDto)
    
    }

    @Get()
    @UseGuards(UserProfileGuards)
    getProfile(@GetUser() user:User):Promise<UserProfile | User[]>{
        return this._userService.getProfile(user)
    }

    
    @Get('/:emailId')
    @UseGuards(AuthGuard())
    getByEmailId(@Param('emailId') emailId:string):Promise<User>
    {
        return this._userService.findByEmailId(emailId)
    }
    // @UseGuards(AuthGuard())
    // @Get()
    // getAllUser(){
    //     return this._userService.findAllUser()
    // }
    // @UseGuards(AuthGuard())
    // @Put(':emailId')
    // updateUser(@Param('emailId') emailId:string,
    // @Body() updateUserdto:UpdateUserDto){
    //     return this._userService.updateUser(emailId,updateUserdto)
    // }

    // @UseGuards(AuthGuard())
    // @Delete(':emailId')
    // deleteUser(@Param('emailId') emailId:string):string{
    //      this._userService.deleteUser(emailId)
    //     return `Successfully Deleted with emailId ${emailId}`
    // }


    

}

















































































































  //   @Post()
  //   public createUser(
  //       @Body() creaeUserDto:CreateUserDto
  //       )        
  //       {
  //           const generateUserId=this._userService.createUser(creaeUserDto);
  //           return {userId:generateUserId}
  // }

  //   @Get()
  //   public getAllUsers() {
  //   return this._userService.getUser();
  // }

  //   @Get(':id')
  //   public getSingleUser(@Param('id') userId: string) {
  //   return this._userService.getSingleUser(userId);
  // }
  
  //   @Patch(':id')
  //   public updateUser(
  //   @Param('id') userId: string,
  //   @Body() updateUserDto:User) {

  //   this._userService.updateUser(userId,updateUserDto);
  //   return "Detail Updated";
  
  // }

  //   @Delete(':id')
  //   public deleteUser(@Param('id') userId: string) {
  //   this._userService.deleteUser(userId);
  //   return null;
  // }

