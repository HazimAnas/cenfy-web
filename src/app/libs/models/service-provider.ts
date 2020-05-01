export class ServiceProvider {
  _id: string;
  displayName: string;
  description: string;
  categories: [{name: string}];
  images: string[];
  user: string;
  status: boolean;
  dateCreated: Date;
  rank: number;
  statistics: {
    view: Number,
    contact: Number};
  customers: [{user: string}];
  ads: [{id: string}];
}
