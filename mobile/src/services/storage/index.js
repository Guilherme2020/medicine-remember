import { AsyncStorage } from "react-native";

export const login = user => AsyncStorage.setItem("user", JSON.stringify(user));
