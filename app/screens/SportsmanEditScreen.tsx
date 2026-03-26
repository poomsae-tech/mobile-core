import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  Platform,
  SafeAreaView, ScrollView, StatusBar, Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { StyleSheet } from 'react-native';

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



const MAIN_BG = '#053552'; // Очень темный синий фон всей страницы
const SECTION_BG = '#084366'; // Синий фон раскрывающегося блока
const INPUT_BG = '#FFFFFF'; // БЕЛЫЙ фон полей ввода
const SELECTOR_BG = '#CCCCCC'; // СЕРЫЙ фон для селектора Пояс/Разряд

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: MAIN_BG 
  },
  scrollContent: { 
    padding: 20, 
    paddingBottom: 40 
  },
  
  // Header
  topNav: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 20 
  },
  navTitle: { 
    color: '#fff', 
    fontSize: 20, 
    fontWeight: 'bold',
    marginLeft: 15,
  },

  // Секции (Аккордеоны) - теперь как на макете
  section: { 
    marginBottom: 12,
  },
  accordionHeader: { 
    backgroundColor: SECTION_BG,
    borderRadius: 4, // Углы более острые на макете
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#1A6B9B',
    // Тень как на макете
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    elevation: 4,
  },
  headerText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '500' 
  },
  sectionContent: { 
    backgroundColor: 'rgba(255, 255, 255, 0.03)', // Едва заметный фон под контентом
    padding: 16,
    paddingTop: 10,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },

  // Поля формы (вертикальное расположение как на макете)
  formField: {
    marginBottom: 15,
  },
  fieldLabel: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
    fontWeight: '500',
  },

  // БЕЛОЕ ПОЛЕ ВВОДА (TextInput и Календарь)
  input: {
    backgroundColor: INPUT_BG,
    borderRadius: 2, // Почти квадратные
    height: 38,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#000',
    borderWidth: 1,
    borderColor: '#ccc',
    boxShadow: 'inset 0px 1px 2px rgba(0,0,0,0.1)', // Внутренняя тень
  },
  
  // Контейнер даты (чтобы вписать иконку календаря внутрь белого поля)
  dateInputWrapper: {
    backgroundColor: INPUT_BG,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  dateInputNative: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 0,
    boxShadow: 'none',
  },
  calendarIcon: {
    paddingHorizontal: 10,
  },

  // ПОЛ (Радиокнопки)
  radioRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginVertical: 6 
  },
  radioSquare: { // Как на макете - они квадратные!
    width: 18, 
    height: 18, 
    borderWidth: 2, 
    borderColor: '#1A6B9B', 
    borderRadius: 2, 
    marginRight: 10, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  radioChecked: { 
    backgroundColor: '#1A6B9B' 
  },
  rowText: { 
    color: '#fff', 
    fontSize: 16 
  },

  // СЕЛЕКТОР ПОЯСА/РАЗРЯДА (Gyyp/Dan) - Серый объемный блок
  selectorContainer: {
    backgroundColor: SELECTOR_BG,
    borderRadius: 4,
    height: 48, // На макете оно выше
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    // Тень и объем
    borderWidth: 1,
    borderColor: '#999',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    elevation: 3,
  },
  selectorText: {
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
  },
  selectorPlaceholder: {
    fontSize: 18,
    color: '#555',
  },

  // КНОПКА СОХРАНИТЬ (Внутри секции)
  saveButtonInline: { 
    backgroundColor: '#08304C', // Очень темный синий
    paddingVertical: 12, 
    paddingHorizontal: 30,
    borderRadius: 25, 
    alignItems: 'center', 
    marginTop: 10,
    alignSelf: 'center', // Центрируем кнопку
    borderWidth: 1, 
    borderColor: '#1A6B9B',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
  saveButtonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },

  // Модалка поясов (Цвета как на макете)
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    padding: 30,
  },
  modalContent: {
    backgroundColor: '#0E4E75',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#1A6B9B',
    overflow: 'hidden',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 15,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderBottomWidth: 1,
    borderColor: '#1A6B9B',
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 0.5,
    borderColor: '#1A6B9B',
  },
  modalItemText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  modalCloseButton: {
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modalCloseText: {
    color: '#FF4141',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export interface AthleteFormData {
  fullName: string;
  birthDate: string; // Строка для маски ручного ввода
  gender: 'Мужской' | 'Женский' | null;
  weight: string;
  beltOrRank: string | null;
  insuranceNumber: string;
  insuranceExpiry: string; // Строка
  certificateNumber: string;
}

export const INITIAL_FORM_STATE: AthleteFormData = {
  fullName: '',
  birthDate: '',
  gender: null,
  weight: '',
  beltOrRank: null,
  insuranceNumber: '',
  insuranceExpiry: '',
  certificateNumber: '',
};

// Список поясов, который мы будем использовать
export const BELTS = [
  '10 гып', '9 гып', '8 гып', '7 гып', '6 гып', '5 гып', '4 гып', '3 гып', '2 гып', '1 гып',
  '1 дан', '2 дан', '3 дан', '4 дан', '5 дан', '6 дан', '7 дан', '8 дан', '9 дан'
];