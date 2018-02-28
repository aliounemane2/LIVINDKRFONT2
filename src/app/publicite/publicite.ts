
export class Publicite {

    /*idInstitution:number;
    adresseIns:string;
    latitudeIns:number;
    longitudeIns:number;
    nomIns:string;
    photoIns:string;
    telephoneIns:number;
    descriptionIns:string;
    solde:number;
    price:number;
    idCategory: number;
    idSousCategory: number;
    idTypeoffre: number;
    idUser : number;
    interestIdInterest: number;
    */
  
  
    constructor(
        public id_publicite:number,
        public datepublicite:Date,
        public titre_publicite:string,
        public typepublicite:string,
        public photopublicite:string) {
       
    }

  }