import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  scrollContent: { padding: 20, paddingBottom: 40 },
  topNav: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 10,
    marginBottom: 20 
  },
  navTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  resetText: { color: '#fff', fontSize: 14, textDecorationLine: 'underline' },
  
  section: { 
    backgroundColor: '#084366', // Тёмно-синий как на макете
    borderRadius: 8, 
    marginBottom: 12,
    overflow: 'hidden',
    // Небольшая тень для объема
    elevation: 3,
    boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
    shadowOpacity: 0.2,
  },
  accordionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 16,
  },
  headerText: { color: '#fff', fontSize: 18, fontWeight: '500' },
  sectionContent: { 
    paddingHorizontal: 16, 
    paddingBottom: 16,
    backgroundColor: 'rgba(0,0,0,0.1)' // Визуально отделяем контент
  },
  
  checkboxRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  checkbox: { 
    width: 22, height: 22, borderWidth: 2, borderColor: '#1A6B9B', 
    borderRadius: 4, marginRight: 12, justifyContent: 'center', alignItems: 'center' 
  },
  checkboxChecked: { backgroundColor: '#1A6B9B' },
  rowText: { color: '#fff', fontSize: 16 },

  sliderLabel: { color: '#fff', marginBottom: 10 },
  sliderTrackPlaceholder: { height: 2, backgroundColor: '#fff', marginVertical: 15 },
  sliderThumb: { 
    width: 16, height: 16, borderRadius: 8, backgroundColor: '#fff', 
    position: 'absolute', top: -7, left: '20%' 
  },
  sliderRange: { flexDirection: 'row', justifyContent: 'space-between' },
  rangeLimit: { color: '#fff', fontSize: 12 },

  applyButton: { 
    backgroundColor: '#0E4E75', padding: 16, borderRadius: 30, 
    alignItems: 'center', marginTop: 20,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)'
  },
  applyButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});