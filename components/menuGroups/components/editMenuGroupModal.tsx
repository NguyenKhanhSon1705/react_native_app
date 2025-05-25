import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import { IMenuGroup } from "@/interfaces/menuGroup/MenuGroupTypes";
import * as ImagePicker from "expo-image-picker";

interface MenuGroupModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (menuGroup: Partial<IMenuGroup>) => void;
  menuGroup: IMenuGroup | null;
}

const MenuGroupModal: React.FC<MenuGroupModalProps> = ({
  visible,
  onClose,
  onSave,
  menuGroup,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [order, setOrder] = useState<number | null>(null);
  const [status, setStatus] = useState(true);

  useEffect(() => {
    if (menuGroup) {
      setName(menuGroup.name);
      setDescription(menuGroup.description || "");
      setImage(menuGroup.image);
      setOrder(menuGroup.order);
      setStatus(menuGroup.status);
    } else {
      setName("");
      setDescription("");
      setImage("");
      setOrder(null);
      setStatus(true);
    }
  }, [menuGroup]);

  const handleSave = () => {
    const updatedMenuGroup: Partial<IMenuGroup> = {
      id: menuGroup?.id,
      name,
      description,
      image,
      order,
      status,
    };
    onSave(updatedMenuGroup);
  };

  const handleClose = () => {
    Keyboard.dismiss();
    onClose();
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Xin lỗi, chúng tôi cần quyền truy cập vào thư viện ảnh của bạn!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {menuGroup ? "Chỉnh sửa nhóm món" : "Thêm nhóm món mới"}
              </Text>

              <View style={styles.imageContainer}>
                {image ? (
                  <Image source={{ uri: image }} style={styles.previewImage} />
                ) : (
                  <View style={styles.placeholderImage}>
                    <Text style={styles.placeholderText}>Chưa có hình ảnh</Text>
                  </View>
                )}
                <TouchableOpacity style={styles.changeImageButton} onPress={pickImage}>
                  <Text style={styles.changeImageText}>Thay đổi hình ảnh</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Tên nhóm món *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nhập tên nhóm món"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Mô tả</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Nhập mô tả"
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={4}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Thứ tự hiển thị</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nhập thứ tự hiển thị"
                  value={order?.toString() || ""}
                  onChangeText={(text) => setOrder(text ? parseInt(text) : null)}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
                  <Text style={styles.cancelButtonText}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                  <Text style={styles.saveButtonText}>Lưu</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#ff8c47",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  placeholderImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  placeholderText: {
    color: "#666",
    fontSize: 14,
  },
  changeImageButton: {
    backgroundColor: "#ff8c47",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  changeImageText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  cancelButton: {
    padding: 10,
    marginRight: 10,
  },
  cancelButtonText: {
    color: "#666",
  },
  saveButton: {
    backgroundColor: "#ff8c47",
    padding: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default MenuGroupModal; 