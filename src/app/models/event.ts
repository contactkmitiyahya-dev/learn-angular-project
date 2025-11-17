import { address } from './address'

export interface EventModel {
  id:number;
  title:string;
  description:string;
  date:Date;
  place:string;
  price:number;
  organizerId:number;
  imageUrl:string;
  nbPlaces:number;
  nbLikes:number;
  domaines ?:string[];
  detailedAddress: address;
}
