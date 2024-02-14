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
        [key: string]: string;
        type: string;
        name: string;
      }[]
    | [];
  items?:
    | {
        [key: string]: any;
      }[];
}
