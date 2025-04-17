interface ImageData {
    uri: string;
    name: string;
    type: string;
}

export const processImageForUpload = (imageUri: string): ImageData | null => {
    if (!imageUri || !imageUri.startsWith('file://')) {
        return null;
    }

    const filename = imageUri.split('/').pop() || 'photo.jpg';
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : 'image/jpeg';

    return {
        uri: imageUri,
        name: filename,
        type,
    };
};

export const createImageFormData = (data: any, imageField: string = 'shopLogo'): FormData => {
    const formData = new FormData();

    Object.keys(data).forEach(key => {
        if (key !== imageField) {
            formData.append(key, String(data[key]));
        }
    });

    if (data[imageField]) {
        const imageData = processImageForUpload(data[imageField]);
        if (imageData) {
            formData.append(imageField, imageData as any);
        }
    }

    return formData;
};