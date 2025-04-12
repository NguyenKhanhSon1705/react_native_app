import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

const EditProfileScreen = () => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [errors, setErrors] = useState<any>({});

  const validateField = (field :any, value : any) => {
    let error = "";
    switch (field) {
      case "fullName":
        if (!value.trim()) error = "Full Name is required";
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Invalid email";
        break;
      case "phone":
        if (!/^[0-9]{9,15}$/.test(value)) error = "Invalid phone number";
        break;
      default:
        break;
    }
    setErrors((prev : any) => ({ ...prev, [field]: error }));
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (!fullName || !email || !phone) {
      Alert.alert("Please fill in all fields correctly");
      return;
    }
    Alert.alert("Saved successfully!");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
      onPress={() =>router.back()}
      style={styles.backButton}>
        <Text style={styles.backIcon}>{"<"}</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Edit Profile</Text>
      <View style={styles.avatarWrapper}>
        <Image
          source={avatar ? { uri: avatar } : require("@/assets/house.png")}
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.editIconWrapper} onPress={pickImage}>
          <Text style={styles.editIcon}>✎</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>FULL NAME</Text>
      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={(text) => {
          setFullName(text);
          validateField("fullName", text);
        }}
        placeholder="Enter full name"
      />
      {errors.fullName && <Text style={styles.error}>{errors.fullName}</Text>}

      <Text style={styles.label}>EMAIL</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          validateField("email", text);
        }}
        placeholder="Enter email"
        keyboardType="email-address"
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      <Text style={styles.label}>PHONE NUMBER</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={(text) => {
          setPhone(text);
          validateField("phone", text);
        }}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
      />
      {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

      <Text style={styles.label}>BIO</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        value={bio}
        onChangeText={setBio}
        placeholder="Tell something about yourself"
        multiline
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>SAVE</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F7FA",
  },
  backButton: {
    paddingVertical: 10,
  },
  backIcon: {
    fontSize: 20,
    color: "#333",
  },
  header: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  avatarWrapper: {
    alignSelf: "center",
    marginBottom: 20,
    position: "relative",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIconWrapper: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#FF6C00",
    borderRadius: 20,
    padding: 5,
  },
  editIcon: {
    color: "white",
    fontSize: 14,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    fontSize: 14,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
  },
  saveButton: {
    backgroundColor: "#FF6C00",
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 20,
    alignItems: "center",
  },
  saveText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
