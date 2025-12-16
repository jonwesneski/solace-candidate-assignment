export type Advocate = {
  id: number,
  firstName: string,
  lastName: string,
  city: string,
  degree: string,
  specialties: string[],
  yearsOfExperience: number,
  phoneNumber: bigint,
  createdAt: string,
};

export type AdvocateResponse = {
  data: Advocate[]
  page: number,
  pageSize: number,
};

export type AdvocateQuery = Partial<{
  page: number,
  pageSize: number,
  firstName: string,
  lastName: string,
  city: string,
  degree: string,
  specialties: string[],
  yearsOfExperience: number,
  phoneNumber: bigint,
  createdAt: string,
}>;
