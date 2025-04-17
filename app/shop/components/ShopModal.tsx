import React, { useEffect, useState } from 'react';
import { 
    Modal, 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput, 
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    KeyboardAvoidingView,
    ScrollView,
    Platform
} from 'react-native';
import * as ImagePicker from "expo-image-picker";
import { IShopData } from '@/interfaces/shop/shopDTO';
import { Controller, useForm } from 'react-hook-form';
import AvatarPicker from '@/components/UploadImage';

interface ShopModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (data: IShopData) => void;
    editData?: IShopData;
}

const ShopModal: React.FC<ShopModalProps> = ({ visible, onClose, onSubmit, editData }) => {
    const { control, handleSubmit, reset, formState: { errors } } = useForm<IShopData>({
        defaultValues: {
            id: 0,
            shopName: '',
            shopPhone: '',
            shopLogo: '',
            shopAddress: '',
            isActive: true,
        }
    });

    useEffect(() => {
        if (editData) {
            reset(editData);
        }
    }, [editData]);

    useEffect(() => {
        if (!visible) {
            reset({
                id: 0,
                shopName: '',
                shopPhone: '',
                shopLogo: '',
                shopAddress: '',
                isActive: true,
            });
        }
    }, [visible]);

    const handleClose = () => {
        reset({
            id: 0,
            shopName: '',
            shopPhone: '',
            shopLogo: '',
            shopAddress: '',
            isActive: true,
        });
        onClose();
    };

    const onSubmitForm = (data: IShopData) => {
        // This will pass the form data back to the parent component
        onSubmit(data);
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={handleClose}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.modalContainer}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={{ width: '100%' }}
                    >
                        <View style={styles.modalContent}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                    <View>
                                        <Text style={styles.title}>
                                            {editData ? 'Sửa thông tin' : 'Thêm cửa hàng'}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>

                                <Controller
                                    control={control}
                                    name="shopLogo"
                                    render={({ field: { onChange, value } }) => (
                                        <AvatarPicker
                                            value={value}
                                            onChange={onChange}
                                        />
                                    )}
                                />

                                <View style={styles.inputContainer}>
                                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                        <View style={styles.labelContainer}>
                                            <Text style={styles.label}>Tên cửa hàng</Text>
                                            <Text style={styles.required}>*</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <Controller
                                        control={control}
                                        name="shopName"
                                        rules={{
                                            required: 'Shop name is required',
                                            minLength: {
                                                value: 2,
                                                message: 'Shop name must be at least 2 characters'
                                            }
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <TextInput
                                                style={[styles.input, errors.shopName && styles.inputError]}
                                                placeholder="Enter shop name"
                                                value={value}
                                                onChangeText={onChange}
                                            />
                                        )}
                                    />
                                    {errors.shopName && (
                                        <Text style={styles.errorText}>{errors.shopName.message}</Text>
                                    )}
                                </View>

                                <View style={styles.inputContainer}>
                                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                        <View style={styles.labelContainer}>
                                            <Text style={styles.label}>Số điện thoại</Text>
                                            <Text style={styles.required}>*</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <Controller
                                        control={control}
                                        name="shopPhone"
                                        rules={{
                                            required: 'Phone number is required',
                                            pattern: {
                                                value: /^[0-9]{10}$/,
                                                message: 'Please enter a valid 10-digit phone number'
                                            }
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <TextInput
                                                style={[styles.input, errors.shopPhone && styles.inputError]}
                                                placeholder="Enter phone number"
                                                value={value}
                                                keyboardType="phone-pad"
                                                onChangeText={onChange}
                                            />
                                        )}
                                    />
                                    {errors.shopPhone && (
                                        <Text style={styles.errorText}>{errors.shopPhone.message}</Text>
                                    )}
                                </View>

                                <View style={styles.inputContainer}>
                                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                        <Text style={styles.label}>Địa chỉ</Text>
                                    </TouchableWithoutFeedback>
                                    <Controller
                                        control={control}
                                        name="shopAddress"
                                        render={({ field: { onChange, value } }) => (
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Enter shop address"
                                                value={value}
                                                onChangeText={onChange}
                                            />
                                        )}
                                    />
                                </View>
                            </ScrollView>

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={[styles.button, styles.cancelButton]}
                                    onPress={handleClose}
                                >
                                    <Text style={styles.buttonText}>Hủy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, styles.submitButton]}
                                    onPress={handleSubmit(onSubmitForm)}
                                >
                                    <Text style={styles.buttonText}>
                                        {editData ? 'Cập nhật' : 'Thêm'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    inputError: {
        borderColor: '#FF3B30',
    },
    errorText: {
        color: '#FF3B30',
        fontSize: 12,
        marginTop: 4,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 20,
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        width: '100%',
        maxHeight: '80%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
        color: '#333',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 2,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 5, 
        borderTopLeftRadius:10,
        borderTopRightRadius:10
    },
    button: {
        padding: 12,
        borderRadius: 8,
        width: '45%',
    },
    submitButton: {
        backgroundColor: '#007AFF',
    },
    cancelButton: {
        backgroundColor: '#8E8E93',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    avatarButton: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#f1f3f6',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    avatarImage: {
        width: '90%',
        height: '90%',
        borderRadius: '50%',
    },
    avatarPlaceholder: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarPlaceholderText: {
        color: '#8E8E93',
        fontSize: 16,
        textAlign: 'center',
    },
    editIconContainer: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: '#007AFF',
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white',
    },
    editIconText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    required: {
        color: '#FF3B30',
        marginLeft: 4,
        fontSize: 14,
        fontWeight: '600',
    },
});

export default ShopModal;