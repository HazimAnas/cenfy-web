export class ServiceProvider {
  _id: string;
  displayName: string;
  description: string;
  categories: [{name: string}];
  address: {
    line1: string;
    line2: string;
    state: string;
    postcode: string;
    lat: string;
    long: string;
  };
  images: [{imagetype: string, loc: string}];
  user: string;
  status: boolean;
  dateCreated: Date;
  rank: number;
  statistics: {
    favorite: number,
    view: Number,
    contact: Number};
  customers: [{user: string}];
  followers: [{user: string}];
  ads: [{id: string}];
}
