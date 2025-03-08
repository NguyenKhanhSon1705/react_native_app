import React, { FC, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Menu, Button, PaperProvider, List } from "react-native-paper";
import DropDownButton from "./dropdown";

const Languages: FC = () => {
  const languages = [
    { label: "English", key: "en"},
    { label: "Tiếng Việt", key: "vi"},
  ];
  const [language , setLanguage] = useState();
  console.log(language);
  return (
        <DropDownButton
        title="Chọn ngôn ngữ"
        icon={"arrow-down-drop-circle"}
        items={languages} 
        defaultValue={'vi'}
        valueCallback={(setLanguage)}/>
  );
};


export default Languages;
