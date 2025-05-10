import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from 'react-native';

interface AreaModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (areaName: string, areaId?: number) => void;
  area?: { id: number, areaName: string } | null;
}

const AreaModal: React.FC<AreaModalProps> = ({
  visible,
  onClose,
  onSave,
  area
}) => {
  const [areaName, setAreaName] = useState('');
  const isEditing = !!area;
  
  useEffect(() => {
    if (visible) {
      setAreaName(area ? area.areaName : '');
    }
  }, [visible, area]);

  const handleSave = () => {
    if (areaName.trim()) {
      onSave(areaName.trim(), area?.id);
      setAreaName('');
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            {isEditing ? 'Sửa khu vực' : 'Thêm khu vực mới'}
          </Text>
          
          <TextInput
            style={styles.input}
            placeholder="Nhập tên khu vực"
            value={areaName}
            onChangeText={setAreaName}
          />
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Hủy</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
            >
              <Text style={styles.saveButtonText}>
                {isEditing ? 'Lưu' : 'Thêm'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center'
  },
  cancelButtonText: {
    color: 'gray',
    fontWeight: '500'
  },
  saveButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'black',
    alignItems: 'center'
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '500'
  }
});

export default AreaModal;