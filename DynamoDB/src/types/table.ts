export interface Table {
  [key: string]: any;
  partitionKey: {
    name: string;
    type: string;
  };
  sortKey: {
    name: string;
    type: string;
  };
  attributes:
    | {
        type: string;
        name: string;
      }[]
    | [];
  items?:
    | {
        [key: string]: any;
      }[]
    | [];
}
