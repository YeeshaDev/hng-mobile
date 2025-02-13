import { useState } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  ScrollView
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from '@/assets/styles/modal';
import { useCountries } from '@/context/app-context';
import { ThemedView } from './ui/ThemedView';
import { ThemedText } from './ui/ThemedText';
import { ThemeColors } from '@/constants/Colors';

interface FilterModalItems {
  visible: boolean;
  onClose: () => void;
  isDark: boolean;
  colors: ThemeColors;
}

export function FilterModal({ visible, onClose, isDark, colors }: FilterModalItems) {
  const [expandedSection, setExpandedSection] = useState<'continent' | 'timezone' | null>(null);
  const {
    selectedRegions,
    setSelectedRegions,
    selectedTimezones,
    setSelectedTimezones,
    continents,
    timezones,
    handleReset
  } = useCountries();

  const handleSelectRegion = (region: string) => {
            setSelectedRegions((prev) => {
              if (prev.includes(region)) {
                return prev.filter((r) => r !== region);
              }
              return [...prev, region];
            });
          };

          const handleSelectTimezones = (timezone: string) => {
            setSelectedTimezones((prev) => {
              if (prev.includes(timezone)) {
                return prev.filter((t) => t !== timezone);
              }
              return [...prev, timezone];
            });
          };
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <ThemedView style={[styles.langModalContainer, { borderColor: colors.tint}]}>
        
        <View style={[styles.modalContent, {backgroundColor:colors.background}]}>
            <View style={[styles.line, {backgroundColor:colors.text}]} />
          <View style={[styles.flexContainer, styles.modalHeader]}>
            <ThemedText type='title'>Languages</ThemedText>
            <TouchableOpacity onPress={onClose}>
              <MaterialCommunityIcons 
                name="close" 
                size={24} 
                color={colors.text} 
              />
            </TouchableOpacity>
          </View>


          <ScrollView contentContainerStyle={{paddingTop:16}} showsHorizontalScrollIndicator={false}>
            {/* ------- Continent Section Starts Here -----*/}
            <TouchableOpacity 
              style={{marginBottom: 16}}
              onPress={() => setExpandedSection(
                expandedSection === 'continent' ? null : 'continent'
              )}
            >
              <View style={[styles.flexContainer, styles.modalHeader]}>
                <ThemedText type='subtitle'>
                  Continent
                </ThemedText>
                <Ionicons 
                  name={expandedSection === 'continent' ? 'chevron-up' : 'chevron-down'} 
                  size={24} 
                  color={isDark ? '#fff' : '#000'} 
                />
              </View>
              {expandedSection === 'continent' && (
                <View>
                  {continents.map((region) => (
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
  ))}
                </View>
              )}
            </TouchableOpacity>

            {/* ------- Timezone Section Starts Here ------ */}
            <TouchableOpacity 
              style={styles.sectionHeader}
              onPress={() => setExpandedSection(
                expandedSection === 'timezone' ? null : 'timezone'
              )}
            >
              <View style={[styles.flexContainer, styles.modalHeader]}>
                <ThemedText  type='subtitle'>
                  Time Zone
                </ThemedText>
                <Ionicons 
                  name={expandedSection === 'timezone' ? 'chevron-up' : 'chevron-down'} 
                  size={24} 
                  color={isDark ? '#fff' : '#000'} 
                />
              </View>
              {expandedSection === 'timezone' && (
                <View style={{marginTop:8}}>
                  {timezones.map((timezone) => (
                    <TouchableOpacity
                      key={timezone}
                      style={[
                        styles.option,
                      ]}
                      onPress={() => handleSelectTimezones(timezone)}
                    >
                      <ThemedText>
                        {timezone}
                      </ThemedText>
                      <View
        style={[
          styles.checkbox,
          selectedTimezones.includes(timezone)
            ? { backgroundColor: colors.text, borderColor: colors.text }
            : {},
        ]}
      >
        {selectedTimezones.includes(timezone) && (
          <MaterialCommunityIcons
            name="check"
            size={16}
            color={colors.background}
          />
        )}
      </View>
                      
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </TouchableOpacity>
          </ScrollView>

          <View style={[styles.flexContainer, styles.buttonContainer]}>
            <TouchableOpacity 
              style={[styles.button, styles.resetButton]} 
              onPress={handleReset}
            >
              <ThemedText>Reset</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity 
               style={[styles.button, styles.showResultsButton, {backgroundColor:colors.button}]}
              onPress={onClose}
            >
              <Text style={styles.showResultsText}>Show results</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ThemedView>
    </Modal>
  );
}
