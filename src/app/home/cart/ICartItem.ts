import {IProduct} from '../item/IProduct';

export interface ICartItem {
  product: IProduct;
  quantity: number;
}
