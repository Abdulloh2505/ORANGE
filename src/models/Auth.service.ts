import Errors, { HttpCode, Message } from "../libs/Error";
import { AUTH_TIMER } from "../libs/types/config";
import { Member } from "../libs/types/member";
import jwt from "jsonwebtoken";

 class AuthServise {
   static checkAuth(token: any): any {
     throw new Error("Method not implemented.");
   }
    private readonly secretToken
  constructor() {
    this.secretToken = process.env.SECRET_TOKEN as string
  }


  public async createToken(playload: Member) {  
    return new Promise((resolve, reject) =>   {
        const duration = `${AUTH_TIMER}h`;
        jwt.sign(playload, process.env.SECRET_TOKEN as string, {
            expiresIn: duration,
         }, (err, token) => {
         if(err) reject(new Errors(HttpCode.UNAUTHORIZED ,Message.TOKEN_CREATION_FAILED)
        
        );
        else resolve(token as string);
         });


     } );

  }
  public async checkAuth(token: string): Promise<Member> {
    const result: Member = (await jwt.verify(token, 
        this.secretToken 
    )) as Member;
  console.log(`--- [AUTH] memberNick: ${result.memberNick} ---`);
   return result;
  }


 }

 export default AuthServise;