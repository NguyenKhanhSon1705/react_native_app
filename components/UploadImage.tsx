import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import * as ImagePicker from "expo-image-picker";

interface AvatarPickerProps {
    value?: string;
    onChange: (value: string) => void;
    defaultImage?: any;
}

const AvatarPicker: React.FC<AvatarPickerProps> = ({ 
    value, 
    onChange,
    defaultImage = require('@/assets/avatar-default.png')
}) => {
    const handleImagePick = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to select an image!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            base64: true,
        });

        if (!result.canceled) {
            onChange(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.avatarContainer}>
            <TouchableOpacity 
                style={styles.avatarButton}
                onPress={handleImagePick}
            >
                <Image 
                    source={value ? { uri: value } : defaultImage} 
                    style={styles.avatarImage}
                    resizeMode="cover"
                />
                <View style={styles.editIconContainer}>
                    <Text style={styles.editIconText}>✎</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
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
        borderRadius: 60,
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
});

export default AvatarPicker;