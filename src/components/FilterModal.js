import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';

const OPTIONS = ['All', 'Easy', 'Moderate', 'Hard'];

export default function FilterModal({ visible, selected, onSelect, onClose }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose} // Android back button closes the modal
    >
      {/* Tapping the dark area closes the modal */}
      <Pressable style={styles.backdrop} onPress={onClose}>
        {/* This inner Pressable stops taps on the sheet from closing it */}
        <Pressable style={styles.sheet} onPress={() => {}}>
          <Text style={styles.title}>Filter by difficulty</Text>

          {OPTIONS.map((option) => {
            const active = option === selected;
            return (
              <Pressable
                key={option}
                onPress={() => onSelect(option)}
                style={[styles.option, active && styles.optionActive]}
              >
                <Text style={[styles.optionText, active && styles.optionTextActive]}>
                  {option}
                </Text>
              </Pressable>
            );
          })}

          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Close</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  option: {
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 8,
  },
  optionActive: { backgroundColor: '#2e7d32', borderColor: '#2e7d32' },
  optionText: { fontSize: 16, color: '#333' },
  optionTextActive: { color: 'white', fontWeight: '600' },
  closeButton: {
    marginTop: 8,
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#eee',
    alignItems: 'center',
  },
  closeText: { fontWeight: '600', color: '#333' },
});