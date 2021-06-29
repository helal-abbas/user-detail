import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User{

    @PrimaryGeneratedColumn()    
    id:number

    
    @Column()
    name:string

    @Column({name:"emaild",unique:true})  // fixed later
    emailId:string

    @Column()
    password:string

    @Column({type:"varchar",length:10,name:"phoneNumber"})
    phoneNumber:string

    @Column()
    address:string

    @Column()
    isVerified:boolean=false;

}
