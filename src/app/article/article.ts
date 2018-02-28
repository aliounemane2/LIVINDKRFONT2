
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
  
  
    constructor(
        public id_article:number,
        public contenu_article:string,
        public date_article:Date,
        public nb_lecteur:number,
        public titre_article:string,
        public id_category:number,
        public id_tag_decouverte:number,
        public image:string
    ) {
       
    }

  }