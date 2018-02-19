import { user } from "../login/user";

export class userchat{
    public type:string;
    public content:string;
    public sender:string;
    public corps:string;
    public dateMessage:string;
    public etat: boolean;
    public idEvoyeur:user;
    public idReceveur:user;
}