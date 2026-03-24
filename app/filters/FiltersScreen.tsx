import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { useRouter, Stack } from 'expo-router'; 

import { styles } from './FiltersScreen.styles';
import { FILTER_DATA } from './data';

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
        pathname: "/sportsman/SportsmanScreen", 
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