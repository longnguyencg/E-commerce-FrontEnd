import {IUsers} from '../../user/interface/iusers';

export interface IComment {
  user?: IUsers;
  user_id: number;
  product_id?: number;
  content: string;
}
