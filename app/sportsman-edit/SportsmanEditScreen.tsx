import React, { useState } from 'react';
import { 
  SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, 
  View, TextInput, Platform, Modal, FlatList 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Stack, useLocalSearchParams } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';

import { styles } from './SportsmanEditScreen.styles';
import { AthleteFormData, INITIAL_FORM_STATE, BELTS } from './constants';

export default function SportsmanEditScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const isNew = !id;
  
  const [expandedSection, setExpandedSection] = useState<string | null>('main');
  const [formData, setFormData] = useState<AthleteFormData>(INITIAL_FORM_STATE);
  
  // Состояния для пикеров
  const [activeDatePicker, setActiveDatePicker] = useState<keyof AthleteFormData | null>(null);
  const [showBeltModal, setShowBeltModal] = useState(false);

  // Универсальное обновление поля
  const updateField = (key: keyof AthleteFormData, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  // Маска для ручного ввода даты (ДД.ММ.ГГГГ)
  const handleDateInput = (text: string, key: keyof AthleteFormData) => {
    const cleaned = text.replace(/\D/g, '');
    let masked = cleaned;
    if (cleaned.length > 2) masked = `${cleaned.slice(0, 2)}.${cleaned.slice(2)}`;
    if (cleaned.length > 4) masked = `${cleaned.slice(0, 2)}.${cleaned.slice(2, 4)}.${cleaned.slice(4, 8)}`;
    updateField(key, masked);
  };

  const handleSave = () => {
    console.log('Сохранение:', formData);
    alert('Спортсмен сохранен!');
    router.back();
  };

  // --- Внутренний компонент: Обычный инпут ---
  const FormField = ({ label, placeholder, value, keyName, ...props }: any) => (
    <View style={styles.formField}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={(text) => updateField(keyName, text)}
        {...props}
      />
    </View>
  );

  // --- Внутренний компонент: Поле даты (Инпут + Иконка) ---
  const DateField = ({ label, value, keyName }: any) => (
    <View style={styles.formField}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.dateInputWrapper}>
        <TextInput
          style={[styles.input, styles.dateInputNative]}
          placeholder="ДД.ММ.ГГГГ"
          placeholderTextColor="#999"
          value={value}
          onChangeText={(text) => handleDateInput(text, keyName)}
          keyboardType="numeric"
          maxLength={10}
        />
        <TouchableOpacity onPress={() => setActiveDatePicker(keyName)} style={styles.calendarIcon}>
          <Ionicons name="calendar-outline" size={20} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );


  const RadioOption = ({ label, isSelected, onPress }: any) => (
    <TouchableOpacity style={styles.radioRow} onPress={onPress}>
      <View style={[styles.radioSquare, isSelected && styles.radioChecked]}>
        {isSelected && <Ionicons name="checkmark" size={14} color="#fff" />}
      </View>
      <Text style={styles.rowText}>{label}</Text>
    </TouchableOpacity>
  );


  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.topNav}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle-outline" size={32} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>
          {isNew ? 'Добавление Спорстмена' : 'Редактирование Спорстмена'}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* ОСНОВНАЯ ИНФОРМАЦИЯ */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.accordionHeader} onPress={() => setExpandedSection(expandedSection === 'main' ? null : 'main')}>
            <Text style={styles.headerText}>Основная Информация</Text>
            <Ionicons name={expandedSection === 'main' ? "chevron-up" : "chevron-down"} size={20} color="#fff" />
          </TouchableOpacity>
          
          {expandedSection === 'main' && (
            <View style={styles.sectionContent}>
              <FormField 
                label="ФИО:" 
                placeholder="Иванов Иван Иванович" 
                value={formData.fullName}
                keyName="fullName"
              />
              <DateField 
                label="Дата рождения:" 
                value={formData.birthDate}
                keyName="birthDate"
              />
              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Пол:</Text>
                <RadioOption label="Мужской" isSelected={formData.gender === 'Мужской'} onPress={() => updateField('gender', 'Мужской')} />
                <RadioOption label="Женский" isSelected={formData.gender === 'Женский'} onPress={() => updateField('gender', 'Женский')} />
              </View>
              {isNew && (
                <TouchableOpacity style={styles.saveButtonInline} onPress={handleSave}>
                  <Text style={styles.saveButtonText}>Сохранить</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>

        {/* СПОРТИВНЫЕ ДАННЫЕ */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.accordionHeader} onPress={() => setExpandedSection(expandedSection === 'sports' ? null : 'sports')}>
            <Text style={styles.headerText}>Спортивные данные</Text>
            <Ionicons name={expandedSection === 'sports' ? "chevron-up" : "chevron-down"} size={20} color="#fff" />
          </TouchableOpacity>
          
          {expandedSection === 'sports' && (
            <View style={styles.sectionContent}>
              <FormField 
                label="Вес:" 
                placeholder="кг" 
                value={formData.weight}
                keyName="weight"
                keyboardType="numeric"
              />
              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Пояс/Разряд:</Text>
                {/* Как на макете - серый блок Гип/Дан */}
                <TouchableOpacity style={styles.selectorContainer} onPress={() => setShowBeltModal(true)}>
                    <Text style={formData.beltOrRank ? styles.selectorText : styles.selectorPlaceholder}>
                      {formData.beltOrRank || 'Гып/Дан'}
                    </Text>
                    <Ionicons name="chevron-down" size={24} color="#666" />
                </TouchableOpacity>
              </View>
              {isNew && (
                <TouchableOpacity style={styles.saveButtonInline} onPress={handleSave}>
                  <Text style={styles.saveButtonText}>Сохранить</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>

        {/* ДОКУМЕНТЫ */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.accordionHeader} onPress={() => setExpandedSection(expandedSection === 'docs' ? null : 'docs')}>
            <Text style={styles.headerText}>Документы</Text>
            <Ionicons name={expandedSection === 'docs' ? "chevron-up" : "chevron-down"} size={20} color="#fff" />
          </TouchableOpacity>
          
          {expandedSection === 'docs' && (
            <View style={styles.sectionContent}>
              <FormField label="Номер страховки:" value={formData.insuranceNumber} keyName="insuranceNumber" />
              <DateField label="Срок действия:" value={formData.insuranceExpiry} keyName="insuranceExpiry" />
              <FormField label="Номер сертификата:" value={formData.certificateNumber} keyName="certificateNumber" />
              {isNew && (
                <TouchableOpacity style={styles.saveButtonInline} onPress={handleSave}>
                  <Text style={styles.saveButtonText}>Сохранить</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>

      </ScrollView>

      {/* МОДАЛЬНОЕ ОКНО ДЛЯ ПОЯСОВ (Modal) */}
      <Modal visible={showBeltModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Выберите пояс</Text>
            <FlatList
              data={BELTS}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.modalItem} 
                  onPress={() => {
                    updateField('beltOrRank', item);
                    setShowBeltModal(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setShowBeltModal(false)} style={styles.modalCloseButton}>
              <Text style={styles.modalCloseText}>Отмена</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* дата */}
      {activeDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, date) => {
            setActiveDatePicker(null);
            if (date) {
              handleDateInput(date.toLocaleDateString('ru-RU').replace(/\./g, ''), activeDatePicker);
            }
          }}
        />
      )}

    </SafeAreaView>
  );
}