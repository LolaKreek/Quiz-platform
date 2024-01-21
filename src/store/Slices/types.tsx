import { quizDataType } from "../../services/quiz/tyles";

// Define a type for the slice state
export type UserType = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
  phone: string | null;
  photoURL: string | null;
  role: string;
};

export interface AuthState {
  user: UserType;
  token: string;
}

export type AppState = {
  isLocked: boolean;
};

export type NotificationState = {
  header: string;
  message: string;
  type: string;
  status: boolean;
};

export type ThemeState = {
  theme: string;
};

export type FavoritesState = {
  users: FavoriteUserType[],
  subjects: string[],
  quizes: string[],
};

export type FavoriteUserType = {
  name: string,
  email: string,
  id: string,
  picture: string
}
