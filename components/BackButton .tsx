import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather"; // hoặc lucide-react-native
import { useRouter } from "expo-router"; // hoặc useNavigation nếu dùng react-navigation

const BackButton = () => {
  const router = useRouter(); // nếu dùng expo-router

  return (
    <TouchableOpacity style={styles.container} onPress={() => router.back()}>
      <Icon name="chevron-left" size={20} color="#2c2c2c" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f1f3f6",
    width: 36,
    height: 36,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    margin: 10,
    elevation: 3, // cho Android
  },
});

export default BackButton;
