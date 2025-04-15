import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import { Ionicons, MaterialIcons, Feather, FontAwesome5, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { Alert } from 'react-native';
import accessToken from '@/utils/functions/accessToken';
import { router } from 'expo-router';
import routes_path from '@/routes/routes_path';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

const menuItems = [
  {
    key: 1,
    title: 'Personal Info',
    icon: <Ionicons name="person-outline" size={20} color="#FF8A65" />,
  },
  {
    key: 2,
    title: 'Thay đổi chi nhánh',
    icon: <MaterialIcons name="storefront" size={20} color="#7E57C2" />,
  },
  {
    key: 3,
    title: 'Cart',
    icon: <Feather name="shopping-cart" size={20} color="#42A5F5" />,
  },
  {
    key: 4,
    title: 'Favourite',
    icon: <Ionicons name="heart-outline" size={20} color="#AB47BC" />,
  },
  {
    key: 5,
    title: 'Notifications',
    icon: <Ionicons name="notifications-outline" size={20} color="#FFCA28" />,
  },
  {
    key: 6,
    title: 'Payment Method',
    icon: <FontAwesome5 name="credit-card" size={20} color="#29B6F6" />,
  },
  {
    key: 7,
    title: 'FAQs',
    icon: <MaterialIcons name="question-answer" size={20} color="#EF5350" />,
  },
  {
    key: 8,
    title: 'User Reviews',
    icon: <Feather name="star" size={20} color="#00BCD4" />,
  },
  {
    key: 9,
    title: 'Settings',
    icon: <Feather name="settings" size={20} color="#9575CD" />,
  },
];

const ProfileScreen = () => {

    const handLogout = () => {
        Alert.alert(
            "Đăng xuất",
            `Bạn có muốn đăng xuất không?`,
            [
              { text: "Hủy", style: "cancel" },
              {
                text: "Đăng xuất",
                onPress:async () => {
                    await accessToken.deleteAccessToken();
                    router.replace(routes_path.LOGIN);
                },
                style: "destructive",
              },
            ]
          );
    };
    const handleclickItem = (key: number) => {
        console.log(`Item clicked: ${key}`);
        switch (key) {
            case 1: 
                router.push(routes_path.USERPROFILE);
                break;
            
            case 2:
                router.push(routes_path.CHOOSESHOP);
                break;
            default:
                console.log('Invalid key');
        }
    }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
        onPress={() => router.back()}
        ><Ionicons name="arrow-back" size={24} /></TouchableOpacity>
        <Text style={styles.headerText}>Profile</Text>
        <TouchableOpacity><Feather name="more-horizontal" size={24} /></TouchableOpacity>
      </View>

      <View style={styles.profileContainer}>
        <Avatar.Image size={80} source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} style={styles.avatar} />
        <Text style={styles.name}>Vishal Khadok</Text>
        <Text style={styles.subtitle}>I love fast food</Text>
      </View>

      <View style={styles.menuWrapper}>
        {menuItems.map((item) => (
          <TouchableOpacity 
          onPress={() => handleclickItem(item.key)}
          key={item.key} style={styles.menuItem}>
            <View style={styles.iconWrapper}>{item.icon}</View>
            <Text style={styles.menuText}>{item.title}</Text>
            <Feather name="chevron-right" size={20} color="#999" style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
        ))}

        <TouchableOpacity
        onPress={handLogout}
        style={[styles.menuItem, { marginTop: 16 }]}>
          <View style={styles.iconWrapper}>
            <AntDesign name="logout" size={20} color="#EF5350" />
          </View>
          <Text style={styles.menuText}>Log Out</Text>
          <Feather name="chevron-right" size={20} color="#999" style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fb',
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    backgroundColor: 'transparent',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 12,
  },
  subtitle: {
    color: '#999',
    marginTop: 4,
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
  },
  iconWrapper: {
    marginRight: 14,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ProfileScreen;
