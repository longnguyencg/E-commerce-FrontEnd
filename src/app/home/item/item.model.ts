export interface Items {
  id: number;
  name: string;
  description: string;
  imagePath: string;
  reviewCounter: number;
  reviews: string[];
  price: number;
  ratingCounter: number;
  ratings: number[];
  avg: number;
  extraImages: string[];
  category?: string;
}
