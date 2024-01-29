import {BackendErrors, User} from "./auth.types";


export interface UpdateUserDetails {
  user: {
    email?: string;
    token?: string;
    username?: string;
    bio?: string;
    image?: string;
  }
}

export interface UpdateUserResponse {
  user: User;
}

export interface UpdateUserState {
  isSubmitting: boolean;
  errors: BackendErrors | null;
  user: User | null;
}
