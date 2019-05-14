export class ServiceProvider {
  _id: String;
  displayName: String;
  description: String;
  categories: [{ name: String }];
  images: [{ loc: String }];
  user: String;
  status: Boolean;
  rank: Number;
  statistics: [{name: Number}];
}
