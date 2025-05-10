import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

interface TableOptionsModalProps {
  visible: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  position: { top: number; left: number };
}

const TableOptionsModal: React.FC<TableOptionsModalProps> = ({
  visible,
  onClose,
  onEdit,
  onDelete,
  position
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View
          style={[
            styles.modalContainer,
            {
              top: position.top,
              left: position.left - 100
            }
          ]}
        >
          <TouchableOpacity style={styles.modalOption} onPress={onEdit}>
            <Text style={styles.modalOptionText}>Sửa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalOption} onPress={onDelete}>
            <Text style={styles.modalOptionText}>Xóa</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  modalContainer: {
    position: 'absolute',
    width: 120,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    paddingVertical: 8,
  },
  modalOption: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  modalOptionText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'left'
  },
});

export default TableOptionsModal;