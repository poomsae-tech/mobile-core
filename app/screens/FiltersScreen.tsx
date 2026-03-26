import { Ionicons } from '@expo/vector-icons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

import { StyleSheet } from 'react-native';

export default function FiltersScreen() {
  const router = useRouter();
  
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Состояния фильтров
  const [gender, setGender] = useState<string | null>(null);
  const [belt, setBelt] = useState<string | null>(null);
  const [weight, setWeight] = useState<string | null>(null);
  const [ageRange, setAgeRange] = useState([13, 45]);

  const toggleSection = (sectionName: string) => {
    setExpandedSection(expandedSection === sectionName ? null : sectionName);
  };

  const handleReset = () => {
    setGender(null);
    setBelt(null);
    setWeight(null);
    setAgeRange([13, 45]);
  };

    const handleApply = () => {
    router.push({
        pathname: "/(tabs)/explore", 
        params: { 
        gender: gender || '', 
        belt: belt || '', 
        ageMin: ageRange[0],
        ageMax: ageRange[1]
        },
    });
    };

  const renderRadioRow = (label: string, currentValue: string | null, setValue: (val: string) => void) => {
    const isSelected = currentValue === label;
    return (
      <TouchableOpacity 
        style={styles.checkboxRow} 
        onPress={() => setValue(label)}
        key={label}
      >
        <View style={[styles.checkbox, isSelected && styles.checkboxChecked]}>
          {isSelected && <Ionicons name="checkmark" size={14} color="#fff" />}
        </View>
        <Text style={styles.rowText}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. Скрываем системный заголовок */}
      <Stack.Screen options={{ headerShown: false }} />
      
      <StatusBar barStyle="light-content" />
      
      {/* кастомный Header */}
      <View style={styles.topNav}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle-outline" size={32} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Фильтры</Text>
        <TouchableOpacity onPress={handleReset}>
          <Text style={styles.resetText}>✨ Сбросить</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Секция ПОЛ */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.accordionHeader} onPress={() => toggleSection('gender')}>
            <Text style={styles.headerText}>Пол: {gender || 'Все'}</Text>
            <Ionicons name={expandedSection === 'gender' ? "chevron-up" : "chevron-down"} size={24} color="#fff" />
          </TouchableOpacity>
          {expandedSection === 'gender' && (
            <View style={styles.sectionContent}>
              {FILTER_DATA.genders.map(item => renderRadioRow(item, gender, setGender))}
            </View>
          )}
        </View>

        {/* Секция ВОЗРАСТ */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.accordionHeader} onPress={() => toggleSection('age')}>
            <Text style={styles.headerText}>Возраст: от {ageRange[0]} до {ageRange[1]}</Text>
            <Ionicons name={expandedSection === 'age' ? "chevron-up" : "chevron-down"} size={24} color="#fff" />
          </TouchableOpacity>
          {expandedSection === 'age' && (
            <View style={styles.sectionContent}>
              <View style={{ alignItems: 'center' }}>
                <MultiSlider
                  values={[ageRange[0], ageRange[1]]}
                  sliderLength={280}
                  onValuesChange={(values) => setAgeRange(values)}
                  min={5}
                  max={90}
                  step={1}
                  allowOverlap={false}
                  snapped
                  selectedStyle={{ backgroundColor: '#1A6B9B' }}
                  unselectedStyle={{ backgroundColor: '#fff' }}
                  markerStyle={{ backgroundColor: '#fff', height: 20, width: 20 }}
                />
              </View>
              <View style={styles.sliderRange}>
                <Text style={styles.rangeLimit}>5</Text>
                <Text style={styles.rangeLimit}>90</Text>
              </View>
            </View>
          )}
        </View>

        {/* Секция ПОЯС */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.accordionHeader} onPress={() => toggleSection('belt')}>
            <Text style={styles.headerText}>Пояс: {belt || 'Не выбран'}</Text>
            <Ionicons name={expandedSection === 'belt' ? "chevron-up" : "chevron-down"} size={24} color="#fff" />
          </TouchableOpacity>
          {expandedSection === 'belt' && (
            <View style={[styles.sectionContent, { maxHeight: 250 }]}>
              <ScrollView nestedScrollEnabled={true}>
                {FILTER_DATA.belts.map(item => renderRadioRow(item, belt, setBelt))}
              </ScrollView>
            </View>
          )}
        </View>

        {/* Секция ВЕС */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.accordionHeader} onPress={() => toggleSection('weight')}>
            <Text style={styles.headerText}>Вес: {weight || 'Любой'}</Text>
            <Ionicons name={expandedSection === 'weight' ? "chevron-up" : "chevron-down"} size={24} color="#fff" />
          </TouchableOpacity>
          {expandedSection === 'weight' && (
            <View style={styles.sectionContent}>
              {FILTER_DATA.weights.map(item => renderRadioRow(item, weight, setWeight))}
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyButtonText}>Применить</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#022B3E',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  navTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  resetText: {
    color: '#fff',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  section: {
    backgroundColor: '#084366',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: '#000',
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  sectionContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: '#1A6B9B',
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#1A6B9B',
  },
  rowText: {
    color: '#fff',
    fontSize: 16,
  },
  sliderLabel: {
    color: '#fff',
    marginBottom: 10,
  },
  sliderTrackPlaceholder: {
    height: 2,
    backgroundColor: '#fff',
    marginVertical: 15,
  },
  sliderThumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    position: 'absolute',
    top: -7,
    left: '20%',
  },
  sliderRange: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rangeLimit: {
    color: '#fff',
    fontSize: 12,
  },
  applyButton: {
    backgroundColor: '#0E4E75',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export const FILTER_DATA = {
  genders: ['Все', 'Женский', 'Мужской'],
  belts: ['10 гып', '9 гып', '8 гып', '7 гып', '6 гып', '5 гып', '4 гып', '3 гып', '2 гып', '1 гып', '1 дан', '2 дан', '3 дан', '4 дан', '5 дан', '6 дан', '7 дан', '8 дан', '9 дан'],
  weights: ['до 30 кг', '30-40 кг', '40-50 кг', '50-60 кг', '60-70 кг', 'Более 70 кг']
};