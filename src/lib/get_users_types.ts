export interface UserData {
  model: string; // e.g., "User"
  documents: UserDocument[];
}

export interface UserDocument {
  gender: 'male' | 'female';
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: string;
    city: string;
    state: string;
    zip: number;
  };
  email: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
  registered: number; // Unix timestamp
  dob: number; // Unix timestamp
  phone: string;
  cell: string;
  PPS: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}