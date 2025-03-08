import { FC, useEffect, useState } from "react"
import { View } from "react-native"
import { Button, List, Menu } from "react-native-paper"

interface IItems {
    key: string | any,
    label: string | any
}

interface IProps {
    items: IItems[],
    valueCallback: any,
    style?: any , 
    icon?: string | any,
    title?: string,
    defaultValue?: any,
    mode?: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal'
}

const DropDownButton: FC<IProps> = ({title , defaultValue, items , valueCallback , style , icon , mode = "outlined" }) => {
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState<IItems>();
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    useEffect(() => {
        setValue(items.find(({ key }) => key === defaultValue))
    }, []);

    const handleSelect = (value : IItems) => {
        setValue(value);
        valueCallback(value.key)
        closeMenu();
    };
    return (
        <View>
            <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                    <Button
                    icon={icon}
                    mode= {mode}
                    onPress={openMenu}
                    style = {style}
                    >{value?.label}
                    </Button>
                }
            >
                <List.Section
                >
                    {items.map(({ key, label }) => (
                        <List.Item
                            key={key}
                            title={label}
                            onPress={() => handleSelect({key, label})}
                        />
                    ))}
                </List.Section>
            </Menu>
        </View>
    )
}

export default DropDownButton