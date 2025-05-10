import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/stores';
import areaAction from '@/stores/areaStore/areaThunk';
import { ITableData } from '@/interfaces/table.ts/TableTypes';
import Toast from "react-native-toast-message";
import { Dropdown } from 'react-native-element-dropdown';
interface TableModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (tableId: number, areaId: number, nameTable: string) => void;
  table?: ITableData | null;
}

const TableModal: React.FC<TableModalProps> = ({ visible, onClose, onSave, table }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [tableName, setTableName] = useState('');
  const [selectedItems, setSelectedItems] = useState<any>('');
  const isEditing = !!table;
  const [isFocus, setIsFocus] = useState(false);
  const areaList = useSelector((state: RootState) => state.areaStore.areas);

  useEffect(() => {
    if (visible) {
      dispatch(areaAction.getAreaData(5));
    }
  }, [dispatch, visible]);

  useEffect(() => {
    if (!visible) return;

    setTableName(table?.nameTable || '');
    const areaIdStr = table?.areaId;
    if (areaIdStr) {
      // const exists = areaList.some((item) => item.id === areaIdStr);
      setSelectedItems(areaIdStr);
    } else {
      setSelectedItems('');
    }
  }, [visible, table]);

  const handleSave = () => {
    if (!selectedItems || !tableName.trim()) {
      Toast.show({
        text1: "Thông báo",
        text2: "Vui lòng chọn khu vực và nhập tên bàn",
        type: "error",
      });
      return;
    }

    if (tableName.trim() && selectedItems) {
      onSave(table?.id ?? 0, selectedItems, tableName.trim());
      setTableName('');
      setSelectedItems('');
    }
  };

  const onSelectedItemsChange = (value: any) => {
    console.log('Selected Items:', value);
    setSelectedItems(value);
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{isEditing ? 'Sửa bàn' : 'Thêm bàn mới'}</Text>

          <View style={styles.multiSelectContainer}>
            <Dropdown
              data={areaList}
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              maxHeight={300}
              labelField="areaName"
              valueField="id"
              placeholder={!isFocus ? 'Chọn khu vực' : ''}
              value={selectedItems}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                onSelectedItemsChange(item.id);
                setIsFocus(false);
              }}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Nhập tên bàn"
            value={tableName}
            onChangeText={setTableName}
          />



          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>{isEditing ? 'Lưu' : 'Thêm'}</Text>
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
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    color: '#333',
  },
  multiSelectContainer: {
    width: '100%',
    marginBottom: 5,
  },
  multiSelectMainWrapper: {
    width: '100%',
    borderRadius: 8,
  },
  multiSelectDropdown: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 6,
    paddingLeft: 10,

  },
  searchInputStyle: {
    color: '#333',
    padding: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'gray',
    fontWeight: '500',
  },
  saveButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '500',
  },



  // 
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default TableModal;