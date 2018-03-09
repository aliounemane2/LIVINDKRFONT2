
export class Article {

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
 
 
    // #0f5b76 vert 
    // #c81437 Rouge 
  
    constructor(
        public idArticle:number,
        public contenuArticle:string,
        public dateArticle:string,
        public nbLecteur:number,
        public titreArticle:string,
        public idCategory:number,
        public idTagDecouverte:number,
        public image:string
    ) {
       
    }

  }