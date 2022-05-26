import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import * as AuthSession from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: User;
  isUserStorageLoading: boolean;
  signInWithGoogle(): Promise<void>;
  signOut(): void;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [isUserStorageLoading, setIsUserStorageLoading] = useState(true);

  const userStorageKey = "@gofinances:user";

  async function signInWithGoogle() {
    try {
      const CLIENT_ID =
        "586529548082-4fkq5h3ajmvtjm1o7b7kge50f7abs7gq.apps.googleusercontent.com";
      const REDIRECT_URI = "https://auth.expo.io/@gabvask/gofinances";
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI("profile email");

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      if (type === "success") {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        );
        const userInfo = await response.json();

        const loadedUser: User = {
          id: String(userInfo.id),
          name: userInfo.name,
          email: userInfo.email,
          photo: userInfo.picture,
        };

        setUser(loadedUser);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(loadedUser));
      }
    } catch (error) {
      throw new Error(error as undefined);
    }
  }

  async function loadUser() {
    const asyncUser = await AsyncStorage.getItem(userStorageKey);

    if (asyncUser) setUser(JSON.parse(asyncUser));

    setIsUserStorageLoading(false);
  }

  async function signOut() {
    setUser({} as User);
    await AsyncStorage.removeItem(userStorageKey);
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isUserStorageLoading, signInWithGoogle, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const auth = useContext(AuthContext);

  if (!auth) throw new Error("useAuth must be used inside AuthProvider");

  return auth;
}

export { AuthProvider, useAuth };
