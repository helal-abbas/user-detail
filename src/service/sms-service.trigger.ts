import { Injectable } from "@nestjs/common";
//import { User } from "src/user/Entity/user.entity";
import { User } from "src/user/Entity/user.entity";

@Injectable()
export class SmsServiceTrigger{

      // private constructor() {
      //   //
      // }
    
      //getting ready
    
    
     public  sendSMS(user:User) {
      const twilioNumber = '+16672432567';
      const accountSid = 'AC4456c3b6171e0760314e93b76c374420';
      const authToken = '5853f4f5786d753de13a2d15cb87586c';
       const client = require('twilio')(accountSid, authToken);
    try {
     client.messages
       .create({
          body: user.password,
          from: '+16672432567',
          to: '+919198910506'
        })
       .then(message => console.log(message.sid));
      } catch(error) {
    console.log(error)
      }
     }
    
    //  const client = new Twilio(this.accountSid, this.authToken);
    
    // // start sending message
    
    // function sendText(){
    //     const phoneNumbers = [ 'phone-number-1', 'phone-number-2']    
    
    //     phoneNumbers.map(phoneNumber => {
    //         console.log(phoneNumber);
            
    //         if ( !validE164(phoneNumber) ) {
    //             throw new Error('number must be E164 format!')
    //         }
        
    //         const textContent = {
    //             body: `You have a new sms from Dale Nguyen :)`,
    //             to: phoneNumber,
    //             from: twilioNumber
    //         }
        
    //         client.messages.create(textContent)
    //         .then((message) => console.log(message.to))
    //     })
    // }
    
    // // Validate E164 format
    // function validE164(num) {
    //     return /^\+?[1-9]\d{1,14}$/.test(num)
    // }
    
    
    
}