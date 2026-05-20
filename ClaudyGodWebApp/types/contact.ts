export type ContactFormInputs = {
  name: string;
  email: string;
  message: string;
};

export type ApiError = {
  name: string;
  message: string;
  errors?: Record<string, string>;
};

export type ContactResponse = {
  message: string;
  contact: {
    id: string;
    createdAt: string;
  };
};
