export class Evenement {
   constructor(public idEvent: string, public nomEvent: string, public descriptionEvent: string, public dateEvent: string, public heureDebut: string, public heureFin: string, public idPlace: number, public idInstitution: number, public photoEvent: string, public idCategory: number,  public idInterest: number) { 
       // public idUser: number,
   }
}