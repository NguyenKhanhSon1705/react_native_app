import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface MenuGroupOptionsModalProps {
  visible: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  position: { top: number; left: number };
}

const MenuGroupOptionsModal: React.FC<MenuGroupOptionsModalProps> = ({
  visible,
  onClose,
  onEdit,
  onDelete,
  position,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.modalOverlay} onPress={onClose}>
        <View
          style={[
            styles.modalContent,
            {
              top: position.top,
              left: position.left,
            },
          ]}
        >
          <TouchableOpacity style={styles.optionButton} onPress={onEdit}>
            <Text style={styles.optionText}>Chỉnh sửa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={onDelete}>
            <Text style={[styles.optionText, styles.deleteText]}>Xóa</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "transparent",
  },
  modalContent: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 5,
    padding: 5,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  optionText: {
    fontSize: 14,
    color: "#333",
  },
  deleteText: {
    color: "#ff3b30",
  },
});

export default MenuGroupOptionsModal; 