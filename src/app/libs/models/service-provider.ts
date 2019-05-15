export class ServiceProvider {
  _id: String;
  displayName: String;
  description: String;
  categories: [{ name: String }];
  images: [{ loc: String }];
  user: String;
  status: Boolean;
  dateCreated: Date;
  rank: Number;
  statistics: [{name: Number}];
}
