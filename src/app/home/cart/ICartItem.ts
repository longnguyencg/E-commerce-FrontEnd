import {IProduct} from '../item/IProduct';

export interface ICartItem {
  image?: string;
  product: IProduct;
  quantity: number;
}
