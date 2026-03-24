import { StyleSheet } from 'react-native';

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