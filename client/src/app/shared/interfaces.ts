export interface User {
  email: string;
  password: string;
}

export interface Category {
  name: string,
  imageSrc?: string,
  _id?: string
}

export interface Position {
  name: string,
  coast: number,
  category: string,
  _id?: string
}

export interface  Message {
  message: string
}
