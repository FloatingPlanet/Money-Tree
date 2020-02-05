export class AddressInfo {
  customer: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
  };
  address: {
    street1: string;
    street2?: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };
}
