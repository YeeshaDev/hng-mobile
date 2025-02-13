import React from "react";
import { View, Modal, TouchableOpacity, ScrollView } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useCountries } from "@/context/app-context";
import { styles } from "@/assets/styles/modal";
import { ThemedText } from "./ui/ThemedText";
import { ThemedView } from "./ui/ThemedView";
import { ThemeColors } from "@/constants/Colors";

interface LanguageModalProps {
  visible: boolean;
  onClose: () => void;
  isDark: boolean;
  colors: ThemeColors;
}

export function LanguageModal({
  visible,
  onClose,
  isDark,
  colors,
}: LanguageModalProps) {
  const { selectedLanguage, setSelectedLanguage, languages } = useCountries();
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <ThemedView
        style={[styles.langModalContainer, { borderColor: colors.tint }]}
      >
        <View
          style={[styles.modalContent, { backgroundColor: colors.background }]}
        >
          <View style={[styles.line, { backgroundColor: colors.text }]} />
          <View style={[styles.flexContainer, styles.modalHeader]}>
            <ThemedText type="title">Languages</ThemedText>
            <TouchableOpacity onPress={onClose}>
              <MaterialCommunityIcons
                name="close"
                size={24}
                color={colors.text}
              />
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={{ paddingTop: 16 }}
            showsHorizontalScrollIndicator={false}
          >
            {languages.map((language) => (
              <TouchableOpacity
                key={language.name}
                style={[
                  styles.option,
                  selectedLanguage === language.name && {
                    backgroundColor: colors.button,
                  },
                ]}
                onPress={() => {
                  setSelectedLanguage(language.name);
                  onClose();
                }}
              >
                <ThemedText
                  style={[
                    selectedLanguage === language.name ? { color: "white" } : {},
                  ]}
                >
                  {language.name}
                </ThemedText>
                {selectedLanguage === language.name ? (
                  <MaterialIcons
                    name="radio-button-on"
                    size={24}
                    color={
                      isDark || selectedLanguage === language.name ? "#fff" : "#000"
                    }
                  />
                ) : (
                  <MaterialIcons
                    name="radio-button-off"
                    size={24}
                    color={
                      isDark || selectedLanguage === language.name ? "#fff" : "#000"
                    }
                  />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ThemedView>
    </Modal>
  );
}
