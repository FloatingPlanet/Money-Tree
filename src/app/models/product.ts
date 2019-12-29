export class Product {
  SKU: string;
  productId: number;
  productName: string;
  productCategory: [string];
  productSummary?: string;
  productPrice: number;
  productDescription: string;
  productImageUrls: [string];
  productAddedAt: Date;
  productQuantity: number;
  ratings: number;
  favourite: boolean;
  productSeller?: string;
}
