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
