import { StyleSheet } from 'react-native';

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