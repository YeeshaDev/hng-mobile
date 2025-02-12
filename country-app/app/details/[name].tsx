import { 
    View,  
    Image, 
    ScrollView, 
    StyleSheet,
    useWindowDimensions, 
  } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Link, useLocalSearchParams, useNavigation } from 'expo-router';
import { CountryService } from '@/service/country-call';
import { useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { useTheme } from '@/hooks/useTheme';
import { Skeleton } from '@/components/ui/skeleton';
  
  export default function CountryDetail () {
    const { name } = useLocalSearchParams() as { name: string };
    const {colors} = useTheme();
    const { width } = useWindowDimensions();
    const { data: country, isLoading } = useQuery({
      queryKey: ['country', name], 
      queryFn: () => CountryService.getSingleCountry(name),
    });

    const navigation = useNavigation();
    
      useEffect(() => {
        navigation.setOptions({ headerShown: false });
      }, [navigation]);
    
    const DetailItem = ({ label, value }: { label: string; value: string }) => (
      <View style={styles.detailItem}>
        <ThemedText style={styles.value}>{label}:</ThemedText>
        <ThemedText style={[styles.label, {color:colors.tint}]}>{value}</ThemedText>
      </View>
    );
  if (isLoading) {
    return (
      <Skeleton details />
    );
  }
    return (
      <ThemedView style={styles.container}>
        <View style={{flexDirection:'row', alignItems:'center',marginVertical:13,paddingHorizontal:15,paddingVertical:40, }}>
          <Link href='/'>
        <AntDesign name="arrowleft" size={26} color={colors.text} />
        </Link>
          <ThemedText style={{ flex: 1,textAlign:'center', fontSize:20,fontWeight:'bold'}}>{country?.name}</ThemedText>
        </View>
        <ScrollView>
        <Image
          source={{ uri: country?.href?.flag }}
          style={[styles.flag, { width: width - 38 }]}
          resizeMode="cover"
        />
        
        <View style={styles.content}>

        <DetailItem 
            label="Full Name" 
            value={country?.full_name || 'N/A'} 
          />
          <DetailItem 
            label="Population" 
            value={country?.population || 'N/A'} 
          />
          <DetailItem 
            label="Size" 
            value={country?.size || 'N/A'} 
          />
          <DetailItem 
            label="Continent" 
            value={country?.continent || 'N/A'} 
          />
          <DetailItem 
            label="Phone Code" 
            value={country?.phone_code || 'N/A'} 
          />
          <DetailItem 
            label="Capital" 
            value={country?.capital|| 'N/A'} 
          />
          <DetailItem 
            label="Currency" 
            value={country?.currency|| 'N/A'} 
          />
          <View style={{marginVertical:15}}>
            <ThemedText style={styles.value}>Covid Status</ThemedText>
            <DetailItem 
            label="Total Case" 
            value={country?.covid19?.total_case || 'N/A'} 
          />
           <DetailItem 
            label="Total Death" 
            value={country?.covid19?.total_deaths || 'N/A'} 
          />
          <DetailItem 
          label="Last Updated" 
          value={
          country?.covid19?.last_updated 
          ? new Date(country.covid19.last_updated).toISOString().split('T')[0] 
          : 'N/A'
          }
          />
          </View>

          {country?.current_president && (
            <View style={{marginVertical:15}}>
            <ThemedText style={styles.value}>President Profile</ThemedText>
            <DetailItem 
            label="Name" 
            value={country?.current_president?.name || 'N/A'} 
          />
           <DetailItem 
            label="Gender" 
            value={country?.current_president?.gender || 'N/A'} 
          />
           <DetailItem 
            label="Appointment" 
            value={country?.current_president?.appointment_start_date || 'N/A'} 
          />
          </View>
          )}
        </View>
        
      </ScrollView>
      </ThemedView>
      
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    flag: {
      height: 300,
      marginTop: 16,
      flex:1,
      justifyContent:'center',
      marginHorizontal: 12,
      borderRadius: 8,
    },
    content: {
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    detailItem: {
      flexDirection: 'row',
      alignItems:'center',
      gap:10,
      paddingVertical: 8,
    },
    label: {
      fontSize: 16,
      color: '#666',
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    value: {
      fontSize: 16,
      fontWeight: '500',
    },
  });