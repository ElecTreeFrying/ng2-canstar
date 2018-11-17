import { auth } from 'firebase/app';

export interface User {
  email: string,
  password: string,
  display?: string,
  type?: string,

}

export interface AuthError {
  code: string,
  message: string
}

interface Social {
  facebook: auth.FacebookAuthProvider,
  twitter: auth.TwitterAuthProvider,
  google: auth.GoogleAuthProvider,
  github: auth.GithubAuthProvider
}

export function Social(): Social {
  return {
    facebook: new auth.FacebookAuthProvider(),
    twitter: new auth.TwitterAuthProvider(),
    google: new auth.GoogleAuthProvider(),
    github: new auth.GithubAuthProvider()
  };
}
