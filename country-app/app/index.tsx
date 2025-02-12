import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity,
  Image,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { CountryListItem } from '@/components/country-list';
import type { CountryItems } from '@/service/types';
import { Ionicons } from '@expo/vector-icons';
import { SectionList } from 'react-native';
import { ThemeToggle } from '@/components/toggle-theme';
import { ThemedView } from '@/components/ui/ThemedView';
import { CountryService } from '@/service/country-call';
import Feather from '@expo/vector-icons/Feather';
import { useTheme } from '@/hooks/useTheme';
import { ThemedText } from '@/components/ui/ThemedText';
import { FilterContinents } from '@/components/filter-continent';
import { Skeleton } from '@/components/ui/skeleton';

const regions = ['Africa', 'South America','North America', 'Central America', 'Asia', 'Europe', 'Australia'];

export default function CountryListScreen () {
  const [search, setSearch] = useState('');
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const { theme, colors } = useTheme();
  const isDark = theme === 'dark';
  const { data: countries = [], isLoading } = useQuery({
    queryKey: ['countries'],
    queryFn:  CountryService.getAllCountries
  });

  const filteredCountries = countries
    .filter(country => 
      country.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedRegions.length === 0 || selectedRegions.includes(country.continent))
    )
    .sort((a, b) => a.name.localeCompare(b.name));

const groupedCountriesByAlphabet = filteredCountries.reduce((acc, country) => {
  const firstLetter = country.name[0].toUpperCase();
  if (!acc[firstLetter]) {
    acc[firstLetter] = [];
  }
  acc[firstLetter].push(country);
  return acc;
}, {} as { [key: string]: CountryItems[] });

const sections = Object.keys(groupedCountriesByAlphabet)
  .sort()
  .map(letter => ({
    title: letter,
    data: groupedCountriesByAlphabet[letter]
  }));
const ExploreLogo = isDark ? require('../assets/images/logo.png') : require('../assets/images/dark-logo.png')
return (
  <ThemedView style={[styles.container]}>
     <View style={{ padding: 16 }} >
      <View style={styles.heading}>
      <Image 
      source={ExploreLogo} 
      style={{width:140, height:100}}
      resizeMode="contain"
    />
        <ThemeToggle/>
      </View>
      <View style={[styles.searchContainer, isDark && styles.darkInput]}>
        <Ionicons
          name="search" 
          size={20} 
          color={isDark ? '#fff' : '#666'} 
          style={{ paddingRight: 5 }} 
        />
        <TextInput
          style={[styles.searchInput, {color:colors.text}]}
          placeholder="Search Country"
          placeholderTextColor={isDark ? '#999' : '#666'}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      
      <View style={styles.controls}>
        <View style={styles.languageIndicator}>
        <Feather name="globe" size={20} color={colors.text} />
          <ThemedText style={[styles.languageText]}>EN</ThemedText>
        </View>

        <TouchableOpacity 
  style={styles.filterButton}
  onPress={selectedRegions.length > 0 ? () => setSelectedRegions([]) : () => setFilterModalVisible(true)}
>
  <Feather name="filter" size={20} color={colors.text} />

  <ThemedText style={styles.filterText}>
    {selectedRegions.length > 0 ? 'Clear Filter' : 'Filter'}
  </ThemedText>
</TouchableOpacity>

      </View>
      </View>

    {isLoading ? (
  <Skeleton />
) : sections.length === 0 ? (
  <View style={{flexDirection:'column', justifyContent:'center',
    alignItems:'center',gap:3}}>
  
    <Image 
      source={require('../assets/images/no-data.png')} 
      style={{width:200, height:200, borderRadius:20, marginTop:50}}
      resizeMode="contain"
    />
    <ThemedText>
      Country data is not available.
    </ThemedText>
  </View>
) : (
  <SectionList
    sections={sections}
    keyExtractor={(item: CountryItems) => item.iso2}
    renderItem={({ item }) => (
      <CountryListItem country={item} colors={colors} />
    )}
    renderSectionHeader={({ section: { title } }) => (
      <ThemedText style={[styles.sectionHeader, { color: colors.tint }]}>
        {title}
      </ThemedText>
    )}
    contentContainerStyle={{ padding: 16 }}
    initialNumToRender={15}
  maxToRenderPerBatch={15} 
  windowSize={10} 
  removeClippedSubviews={true} 
  />
)}

<FilterContinents
        visible={filterModalVisible}
        setSelectedRegions={setSelectedRegions}
        selectedRegions={selectedRegions}
        regions={regions}
        onClose={() => setFilterModalVisible(false)}
        onReset={() => setSelectedRegions([])}
        onApplyFilter={() => setFilterModalVisible(false)}
        colors={colors}
      />
  </ThemedView>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  paddingTop:40,
  fontFamily: 'Axiforma-Black',
},

heading: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent:'space-between',
},
searchContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#f0f0f0',
  borderRadius: 8,
  paddingHorizontal: 10,
  marginBottom: 12,
},

searchInput: {
  flex: 1,
  padding: 12,
  height:55,
  fontSize: 16,
  textAlign:'center',
  borderWidth:0,
  outlineColor:'transparent',
   fontFamily: 'Axiforma-Black'
},
darkInput: {
  color: '#fff',
  backgroundColor: '#01193A',
  outlineColor:'transparent'
},
controls: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},
languageIndicator: {
  borderWidth: 1,
  borderColor: '#ccc',
  flexDirection:'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap:8,
  padding: 8,
  borderRadius: 8,
},
languageText: {
  fontSize: 14,
  fontWeight:'bold'
},
filterButton: {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#ccc',
  padding: 8,
  fontWeight:'bold',
  borderRadius: 8,
},
filterText: {
  marginLeft: 4,
  fontSize: 14,
  fontWeight:'bold',
},
sectionHeader: {
  fontSize: 20,
  fontWeight: 'bold',
  padding: 16,
},

modalTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 16,
  flex:1,
  textAlign: 'center',
},
filterItem: {
  paddingVertical: 12,
  borderBottomWidth: StyleSheet.hairlineWidth,
  borderBottomColor: '#ccc',
},

});