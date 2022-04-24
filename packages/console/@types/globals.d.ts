declare module 'Global' {
  interface ElementInterface {
    _id: string;
    url: string;
  }

  type IdInterface = Pick<ElementInterface, '_id'>;
}
