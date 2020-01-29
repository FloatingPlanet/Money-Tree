export class AddressInfo {
  receiver: string;
  receiverContact: string;
  shippingAddress: {
    apt?: number;
    street1: string;
    street2?: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };
}
