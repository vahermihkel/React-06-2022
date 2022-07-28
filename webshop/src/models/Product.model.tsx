export class ProductModel {
  constructor(
    public id: number,
    public name: string,
    public imgSrc: string,
    public price: number,
    public category: string,
    public description: string,
    public isActive: boolean
  ) {}
}


// export class ProductModel {
//   public id: number;
//   public name: string;
//   public imgSrc: string;
//   public price: number;
//   public category: string;
//   public description: string;
//   public isActive: boolean;
//   constructor(
//     _id: number,
//     _name: string,
//     _imgSrc: string,
//     _price: number,
//     _category: string,
//     _description: string,
//     _isActive: boolean
//   ) {
//     this.id = _id;
//     this.name = _name,
//     this.imgSrc = _imgSrc;
//     this.price = _price;
//     this.category = _category;
//     this.description = _description;
//     this.isActive = _isActive
//   }
// }