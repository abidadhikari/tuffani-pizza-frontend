export interface IStaticContent {
  id: string;
  key: string;
  value: IStaticContentValue[] | IStaticContentValue;
  createdAt: string;
  updatedAt: string;
}

export interface IStaticContentValue {
  title: {
    prefix: string;
    highlight: string;
    suffix?: string;
  };
  description: string;
}

export interface ApplicationConfig {
  email: string;
  phoneNumber: string;
  address: string;
  socialMediaLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    tiktok?: string;
  };
  openingHours: string;
}
