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
