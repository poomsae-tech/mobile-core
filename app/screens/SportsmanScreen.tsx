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

import { StyleSheet } from 'react-native';

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
        <TouchableOpacity onPress={() => router.push('/screens/FiltersScreen')}>
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
                pathname: '/screens/SportsmanEditScreen',
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
        onPress={() => router.push('/screens/SportsmanEditScreen')}
      >
        <Text style={styles.addButtonText}>Добавить спортсмена</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}



export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#053552' 
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingVertical: 15 
  },
  headerTitleRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginLeft: 15 
  },
  headerTitle: { 
    color: '#fff', 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginLeft: 8 
  },
  searchContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    marginBottom: 20,
    gap: 15
  },
  searchInputWrapper: { 
    flex: 1, 
    backgroundColor: '#fff', 
    borderRadius: 4, 
    height: 40, 
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  searchInput: { 
    color: '#000', 
    fontSize: 16 
  },
  listContent: { 
    paddingHorizontal: 20, 
    paddingBottom: 100 
  },
  card: { 
    backgroundColor: '#0E4E75', 
    borderRadius: 8, 
    padding: 15, 
    marginBottom: 15,
    // Используем современный способ для теней
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', 
  },
  cardName: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 5 
  },
  cardInfoRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 3 
  },
  statusDot: { 
    width: 14, 
    height: 14, 
    borderRadius: 7, 
    marginRight: 8 
  },
  cardInfoText: { 
    color: '#fff', 
    fontSize: 16 
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    left: 60,
    right: 60,
    backgroundColor: '#084366',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1A6B9B',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
  },
  addButtonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '600' 
  }
});

export const ATHLETES = [
  { id: '1', name: 'Иван Петров', age: 15, belt: '1 дан', gender: 'Мужской', weight: 45, statusColor: '#FF4141' },
  { id: '2', name: 'Алексей Сидоров', age: 25, belt: '10 гып', gender: 'Мужской', weight: 60, statusColor: '#4CAF50' },
  { id: '3', name: 'Мария Иванова', age: 14, belt: '5 гып', gender: 'Женский', weight: 30, statusColor: '#FF9800' },
];