
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
        public idPublicite:number,
        public datePublicite:string,
        public titrePublicite:string,
        public typePublicite:string,
        public photoPublicite:string) {
       
    }

  }