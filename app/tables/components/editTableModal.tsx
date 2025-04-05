import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/stores';
import areaAction from '@/stores/areaStore/areaThunk';
import { ITableData } from '@/interfaces/table.ts/TableTypes';
import { useMemo } from 'react';
import Toast from "react-native-toast-message";
interface TableModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (tableId: number, areaId: number, nameTable: string) => void;
  table?: ITableData | null;
}

const TableModal: React.FC<TableModalProps> = ({ visible, onClose, onSave, table }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [tableName, setTableName] = useState(''); 
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const isEditing = !!table;


  useEffect(() => {
    if (visible) {
      dispatch(areaAction.getAreaData(5));
    }
  }, [dispatch, visible]);


  const areaList = useSelector((state: RootState) => state.areaStore.areas);

  // Định dạng
  const formattedAreaList = useMemo(() => {
    const list = areaList.map((area) => ({
      id: area.id.toString(), //  id phasi là string
      name: area.areaName, // Tên hiển thị
    }));
    return list;
  }, [areaList]);


  useEffect(() => {
    if (!visible) return;

    setTableName(table?.nameTable || '');
    const areaIdStr = table?.areaId?.toString();

    if (areaIdStr) {
      const exists = formattedAreaList.some((item) => item.id === areaIdStr);
      setSelectedItems(exists ? [areaIdStr] : []);
    } else {
      setSelectedItems([]);
    }
  }, [visible, table, formattedAreaList]);

  const handleSave = () => {
    if (!selectedItems.length || !tableName.trim()) {
      Toast.show({
          text1: "Thông báo",
          text2: "Vui lòng chọn khu vực và nhập tên bàn",
          type: "error", 
      });
      return;
  }
    if (tableName.trim() && selectedItems.length > 0) {
      const areaId = Number(selectedItems[0]);
      onSave(table?.id ?? 0, areaId, tableName.trim());
      setTableName('');
      setSelectedItems([]);
    }
  };

  const onSelectedItemsChange = (selectedItems: string[]) => {
    console.log('Selected Items:', selectedItems); 
    setSelectedItems(selectedItems);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{isEditing ? 'Sửa bàn' : 'Thêm bàn mới'}</Text>

          <View style={styles.multiSelectContainer}>
            <MultiSelect
              items={formattedAreaList}
              uniqueKey="id" 
              onSelectedItemsChange={onSelectedItemsChange}
              selectedItems={selectedItems}
              selectText="Chọn khu vực"
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#333"
              selectedItemTextColor="#333"
              selectedItemIconColor="#333…"
              itemTextColor="#000"
              displayKey="name" 
              searchInputStyle={styles.searchInputStyle}
              submitButtonColor="black"
              submitButtonText="Xác nhận"
              styleMainWrapper={styles.multiSelectMainWrapper}
              styleDropdownMenuSubsection={styles.multiSelectDropdown}
              single={true} 
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
});

export default TableModal;