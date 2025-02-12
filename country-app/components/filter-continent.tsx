import React, { useState } from 'react';
import { Modal, View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedText } from './ui/ThemedText';
import { ThemeColors } from '@/constants/Colors';
import { ThemedView } from './ui/ThemedView';

interface FilterModal {
  visible: boolean;
  setSelectedRegions: React.Dispatch<React.SetStateAction<string[]>>;
  selectedRegions: string[];
  regions: string[];
  onClose: () => void;
  onReset: () => void;
  onApplyFilter: () => void;
 colors: ThemeColors;
   
}

export const FilterContinents = ({
  visible,
  selectedRegions,
  setSelectedRegions,
  regions,
  onClose,
  onReset,
  onApplyFilter,
  colors,
}: FilterModal) => {
    const [collapseItem, setCollapseItem] = useState(true)

    const handleSelectRegion = (region: string) => {
        setSelectedRegions((prev) => {
          if (prev.includes(region)) {
            return prev.filter((r) => r !== region);
          }
          return [...prev, region];
        });
      };
      
     const handleCollapseItem = () => {
        setCollapseItem((prev) => !prev);
     }
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <ThemedView style={[styles.modalContainer, { borderColor: colors.tint}]}>
      <View style={[styles.line, {backgroundColor:colors.text}]} />
        <ThemedView style={[
          styles.modalContent
        ]}>
          <View style={[styles.flexContainer, styles.modalHeader]}>
            <ThemedText type='defaultSemiBold' style={styles.modalTitle}>
              Filter
            </ThemedText>
            <TouchableOpacity onPress={onClose}>
              <MaterialCommunityIcons 
                name="close" 
                size={24} 
                color={colors.text} 
              />
            </TouchableOpacity>
          </View>

          <View style={styles.filterSection}>
            <View style={[styles.flexContainer, styles.sectionHeader]}>
              <ThemedText type='defaultSemiBold'>Continent</ThemedText>
              <TouchableOpacity onPress={handleCollapseItem}>
              {collapseItem ? (
                <MaterialCommunityIcons 
                name="chevron-up" 
                size={24} 
                color={colors.text} 
              />
              ): (<MaterialCommunityIcons 
                name="chevron-down" 
                size={24} 
                color={colors.text} 
              />)}
              </TouchableOpacity>
            </View>
            {collapseItem && (
  regions.map((region) => (
    <TouchableOpacity
      key={region}
      style={[styles.flexContainer, styles.filterOption]}
      onPress={() => handleSelectRegion(region)}
    >
      <ThemedText type="default">{region}</ThemedText>
      <View
        style={[
          styles.checkbox,
          selectedRegions.includes(region)
            ? { backgroundColor: colors.text, borderColor: colors.text }
            : {},
        ]}
      >
        {selectedRegions.includes(region) && (
          <MaterialCommunityIcons
            name="check"
            size={16}
            color={colors.background}
          />
        )}
      </View>
    </TouchableOpacity>
  ))
)}

          </View>

          <View style={[styles.flexContainer, styles.buttonContainer]}>
            <TouchableOpacity 
              style={[styles.button, styles.resetButton]}
              onPress={onReset}
            >
              <ThemedText type='default'>Reset</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.showResultsButton, {backgroundColor:colors.button}]}
              onPress={onApplyFilter}
            >
              <ThemedText type='default'>
                Show results
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>
      </ThemedView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position:'absolute',
    width:'100%',
     zIndex:1200, bottom:0,justifyContent: 'flex-end',
     borderRadius: 25,
     paddingHorizontal: 15,
     borderWidth:1
    
  },
  line: {
    width: 75,
    height: 4,
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 10,
},
  flexContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: '50%',
  },
 
  modalHeader: {
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  filterSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    paddingVertical: 10,
  },
  filterOption: {
    paddingVertical: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  buttonContainer: {
    marginTop: 'auto',
    paddingTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButton: {
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  showResultsButton: {
    marginLeft: 10,
  },
  showResultsText: {
    color: '#fff',
  },
});