import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from './Components/Input';

export default function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    loadNotes();
  }, []);

  useEffect(() => {
    saveNotes();
  }, [notes]);

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      }
    } catch (error) {
      console.error('Failed to load notes:', error);
    }
  };

  const saveNotes = async () => {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(notes));
    } catch (error) {
      console.error('Failed to save notes:', error);
    }
  };

  const addNote = (note) => {
    setNotes((prevNotes) => [...prevNotes, note]);
  };

  const deleteNote = (index) => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () =>
            setNotes((prevNotes) => prevNotes.filter((_, i) => i !== index)),
        },
      ]
    );
  };

  const CustomDeleteButton = ({ onPress }) => (
    <TouchableOpacity style={styles.deleteButton} onPress={onPress}>
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Note App</Text>

      <KeyboardAvoidingView style={styles.inputContainer} behavior="height">
        <Input onAddNote={addNote} />
      </KeyboardAvoidingView>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {notes.map((item, index) => (
          <View key={index} style={styles.noteItem}>
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text style={styles.noteText}>{item.text}</Text>
            <CustomDeleteButton onPress={() => deleteNote(index)} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  scrollContainer: {
    flexGrow: 1, // Allows FlatList to take remaining space
    paddingBottom: 100, // Space at the bottom for inputs
  },
  noteItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
  },
  noteTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 20,
  },
  noteText: {
    marginBottom: 5,
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    borderRadius: 10,
    width: 120,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 100,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 20, // Space between input section and the list
  },
});
