import { user } from '../login/user';

export class discussion{
    public corps:string;
    public etat:string;
    public dateMessage:string;
    public idEnvoyeur: user = new user();
    public idReceveur:user = new user();
}