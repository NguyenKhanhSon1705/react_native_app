import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

interface Props {
    visible: boolean;
    onClose: () => void;
    onConfirm: (password: string) => void;
    shopName: string;
}

const Container = styled.View`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
    padding: 0 16px;
`;

const ModalContent = styled.View`
    background-color: white;
    width: 100%;
    border-radius: 16px;
    padding: 20px;
`;

const ModalHeader =  styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
`;

const Title = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #2c2c2c;
`;

const CloseButton = styled(TouchableOpacity)`
    padding: 4px;
`;

const Message = styled.Text`
    color: #666;
    font-size: 16px;
    margin-bottom: 20px;
`;

const Input = styled.TextInput`
    background-color: #f5f5f5;
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 24px;
    font-size: 16px;
`;

const ButtonContainer =  styled.View`
    flex-direction: row;
    justify-content: flex-end;
    gap: 12px;
`;

const Button = styled(TouchableOpacity)`
    padding: 12px 24px;
    border-radius: 8px;
    min-width: 100px;
    align-items: center;
`;

const CancelButton = styled(Button)`
    background-color: #f5f5f5;
`;

const ConfirmButton = styled(Button)`
    background-color: #ff4444;
`;

const ButtonText = styled.Text<{ isConfirm?: boolean }>`
    font-size: 16px;
    font-weight: 500;
    color: ${props => props.isConfirm ? 'white' : '#666'};
`;

const PasswordConfirmModal: React.FC<Props> = ({ 
    visible, 
    onClose, 
    onConfirm, 
    shopName 
}) => {
    const [password, setPassword] = useState('');

    const handleConfirm = () => {
        if (password.trim()) {
            onConfirm(password);
            setPassword('');
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <Container>
                <ModalContent>
                    <ModalHeader>
                        <Title>Xác nhận xóa cửa hàng</Title>
                        <CloseButton onPress={onClose}>
                            <MaterialIcons name="close" size={24} color="#666" />
                        </CloseButton>
                    </ModalHeader>

                    <Message>
                        Bạn có chắc chắn muốn xóa cửa hàng "{shopName}"?{'\n'}
                        Vui lòng nhập mật khẩu để xác nhận.
                    </Message>

                    <Input
                        placeholder="Nhập mật khẩu của bạn"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        placeholderTextColor="#999"
                    />

                    <ButtonContainer>
                        <CancelButton onPress={onClose}>
                            <ButtonText>Hủy</ButtonText>
                        </CancelButton>
                        <ConfirmButton onPress={handleConfirm}>
                            <ButtonText isConfirm>Xác nhận</ButtonText>
                        </ConfirmButton>
                    </ButtonContainer>
                </ModalContent>
            </Container>
        </Modal>
    );
};

export default PasswordConfirmModal;