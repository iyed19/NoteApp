import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, ToastAndroid, Platform, Alert, Text } from 'react-native';

export default function Input({ onAddNote }) {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteText, setNoteText] = useState('');

  const handleAdd = () => {
    if (noteTitle.trim() && noteText.trim()) {
      onAddNote({ title: noteTitle, text: noteText });
      setNoteTitle('');
      setNoteText('');
    } else {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Please fill both fields!', ToastAndroid.SHORT);
      } else {
        Alert.alert('Validation Error', 'Please fill both fields!');
      }
    }
  };

  const CustomAddButton = ({ onPress }) => (
    <TouchableOpacity style={styles.addButton} onPress={onPress}>
      <Text style={styles.addButtonText}>Add</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.titleInput}
        placeholder="Enter title"
        value={noteTitle}
        onChangeText={setNoteTitle}
      />
      <TextInput
        style={styles.noteInput}
        placeholder="Enter note"
        value={noteText}
        onChangeText={setNoteText}
        multiline
      />
      <CustomAddButton onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  titleInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    fontSize: 17,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    height: 100,
    marginBottom: 10,
    textAlignVertical: 'top',
    width: '100%',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#0d6efd',
    borderRadius: 10,
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 100,
    marginTop: 10,
    marginBottom: 20,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
