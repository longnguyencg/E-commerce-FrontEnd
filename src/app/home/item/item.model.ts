export interface Items {
  id: number;
  display?: number;
  name: string;
  description?: string;
  sale_price?: number;
  imagePath: string;
  reviewCounter: number;
  price: number;
  ratingCounter: number;
  ratings: number[];
  avg: number;
  extraImages: string[];
  categories: any[];
}
