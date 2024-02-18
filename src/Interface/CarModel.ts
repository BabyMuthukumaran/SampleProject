export interface CarDetail {
  brand: string;
  logoUrl: string;
}

export interface brandDetail {
  model: string;
  year: string;
  color: string;
  fitments: string;
  location: string;
  insurance: string;
  owners: string;
  kms: string;
  fuelType: string;
  transmission: string;
  fileURL: string;
}

export interface CarItem {
  id: string;
  brand: string;
  items: {
      model: string;
      year: string;
      color: string;
      insurance: string;
      location: string;
      owners: string;
      fitments: string;
      kms: string;
      fuelType: string;
      transmission: string;
      fileURL: string;
  };
}