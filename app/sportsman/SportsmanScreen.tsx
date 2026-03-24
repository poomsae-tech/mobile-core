import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import { styles } from './SportsmanScreen.styles';
import { ATHLETES } from './data';

export default function SportsmanScreen() {
  const router = useRouter();
  const params = useLocalSearchParams(); // все фильтры сразу
  
  const [searchText, setSearchText] = useState('');

  const [activeSearch, setActiveSearch] = useState('');


const filteredAthletes = ATHLETES.filter(athlete => {
    // поисковик по всем полям
    if (activeSearch) {
      const query = activeSearch.toLowerCase();
      
      const matchesName = athlete.name.toLowerCase().includes(query);
      const matchesAge = athlete.age.toString().includes(query);
      const matchesBelt = athlete.belt.toLowerCase().includes(query);
      const matchesWeight = athlete.weight?.toString().includes(query);

      // Если ни одно поле не подошло — отсеиваем
      if (!(matchesName || matchesAge || matchesBelt||matchesWeight)) {
        return false;
      }
    }

    if (params.gender && params.gender !== 'Все' && athlete.gender !== params.gender) return false;
    if (params.belt && athlete.belt !== params.belt) return false;
    if (params.ageMin && athlete.age < Number(params.ageMin)) return false;
    if (params.ageMax && athlete.age > Number(params.ageMax)) return false;

    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle-outline" size={36} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerTitleRow}>
          <Ionicons name="person-outline" size={24} color="#fff" />
          <Text style={styles.headerTitle}>Спортсмены</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        {/* фильтр*/}
        <TouchableOpacity onPress={() => router.push('/filters/FiltersScreen')}>
          <Ionicons name="funnel-outline" size={28} color="#fff" />
        </TouchableOpacity>
        
        <View style={styles.searchInputWrapper}>
          <TextInput 
            style={styles.searchInput} 
            placeholder="Поиск по имени..." 
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText} // Обновляем текст при вводе
            onSubmitEditing={() => setActiveSearch(searchText)} // Поиск по нажатию Enter
          />
        </View>

        {/* лупа*/}
        <TouchableOpacity onPress={() => setActiveSearch(searchText)}>
          <Ionicons name="search-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.listContent}>
        {filteredAthletes.length > 0 ? (

          filteredAthletes.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.card}
              onPress={() => router.push({
                pathname: '/sportsman-edit/SportsmanEditScreen',
                params: { id: item.id }
              })}
            >
              <Text style={styles.cardName}>{item.name}</Text>
              <View style={styles.cardInfoRow}>
                <View style={[styles.statusDot, { backgroundColor: item.statusColor }]} />
                <Text style={styles.cardInfoText}>{item.age} лет, {item.belt}</Text>
              </View>
              <Text style={styles.cardInfoText}>Пол: {item.gender === 'Мужской' ? 'М' : 'Ж'}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={{ color: '#fff', textAlign: 'center', marginTop: 20 }}>
            Никто не найден
          </Text>
        )}
      </ScrollView>

      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => router.push('/sportsman-edit/SportsmanEditScreen')}
      >
        <Text style={styles.addButtonText}>Добавить спортсмена</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}