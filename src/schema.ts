export interface Material {
  downPayment: number;
  category: string;
  date: string | null;
  description: string;
  id: string;
  presentationPicture: string;
  pictureArray: Images[] | [];
  name: string;
  pricePerDay: number;
  disponibility: boolean;
  visible: boolean;
  bookingDate: string[] | [];
}

export interface Images {
  image: string;
}

export interface FileImport {
  id: string;
  path: string;
  preview: string;
  lastModified: number;
  name: string;
  size: number;
  webkitRelativePath: string;
  lastModifiedDate: object;
  type: string;
}

export interface Reservation {
  email: string;
  phone: string;
  city: string;
  address: string;
  bookingDate: string[] | [];
  firstName: string;
  lastName: string;
}
