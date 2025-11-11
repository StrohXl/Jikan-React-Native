import AsyncStorage from "@react-native-async-storage/async-storage";

// Claves para almacenamiento
const THEME_KEY = "app_theme";

// Guardar tema
export const saveTheme = async (theme: "dark" | "light" | false) => {
  try {
    if (theme) {
      await AsyncStorage.setItem(THEME_KEY, theme);
    } else {
      await AsyncStorage.removeItem(THEME_KEY);
    }
  } catch (error) {
    console.log("Error guardando tema:", error);
  }
};

// Cargar tema
export const loadTheme = async () => {
  try {
    const theme = await AsyncStorage.getItem(THEME_KEY);
    return theme || "light"; // Tema por defecto
  } catch (error) {
    console.log("Error cargando tema:", error);
    return null;
  }
};
