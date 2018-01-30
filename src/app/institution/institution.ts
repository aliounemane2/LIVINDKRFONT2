
export class Institution {

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
        public idInstitution:number,
        public adresseIns:string,
        public latitudeIns:number,
        public longitudeIns:number,
        public nomIns:string,
        public photoIns:string,
        public telephoneIns:number,
        public descriptionIns:string,
        public solde:string,
        public price:string,
        public idCategory: number,
        public idSousCategory: number,
        public idTypeoffre: number,
        public idUser : number,
        public interestIdInterest: number) {
       
    }

 
  }