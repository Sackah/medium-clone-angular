export interface User{
  email: string;
  token: string;
  username: string;
  bio: string | null;
  image: string | null;
}

/**
 *  Login
 */
export interface LoginUserDetails{
  user: {
    email: string;
    password: string;
  }
}

export interface LoginUserResponse{
  user: User;
}

export interface LoginState{
  isSubmitting: boolean;
  errors: BackendErrors | null;
  user: User | null;
}

export interface BackendErrors{
  [key: string]: string[];
}

/**
 *  Sign up
 */
export interface SignUpUserDetails{
  user: {
    username: string;
    email: string;
    password: string;
  }
}

export interface SignUpUserResponse extends LoginUserResponse{}

export interface SignUpState extends LoginState{}

