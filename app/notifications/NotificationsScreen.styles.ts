import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#053552',
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Центрируем заголовок
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    zIndex: 10,
  },
  navTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  
  // Секция Аккордеона
  section: {
    backgroundColor: '#084366',
    borderRadius: 4,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1A6B9B',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4 },
      android: { elevation: 6 },
      web: { boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }
    }),
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  countText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginRight: 10,
  },
  sectionContent: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },

  // Карточка уведомления
  notificationCard: {
    backgroundColor: 'rgba(5, 53, 82, 0.6)', // Более темный фон внутри
    borderRadius: 4,
    padding: 16,
    marginBottom: 10,
    borderLeftWidth: 0, // Мы используем индикатор-кружок, как на макете
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  indicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  indicatorFine: { backgroundColor: '#FF0000' },
  indicatorWarning: { backgroundColor: '#FFD700' },
  indicatorInfo: { backgroundColor: '#0055FF' },
  
  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  cardEvent: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardRow: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 4,
    opacity: 0.9,
  },
  amountText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  timeText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginTop: 8,
  },
});