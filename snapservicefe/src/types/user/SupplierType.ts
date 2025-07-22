export type Supplier = {
  id: number;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  isVerified: boolean;
  frontImageCCCD: string;
  backImageCCCD: string;
  registeredAt: string; // ISO string
  userId: number;
};
