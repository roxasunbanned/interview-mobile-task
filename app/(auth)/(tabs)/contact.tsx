import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Colors from '@/constants/Colors';

const Page = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={{height: 75,backgroundColor: Colors.secondary}}>
        <Text style={[{fontFamily: 'FoundersGroteskBold',justifyContent: 'center',fontSize: 24, color: Colors.primary, textAlign: 'center', padding: 20}]}>Live Chat</Text>
      </View>
      <ScrollView contentContainerStyle={[styles.chatContainer, {flex: 9}]}>
        {messages.map((message, index) => (
          <View key={index} style={styles.messageRow}>
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message"
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  chatContainer: {
    flexGrow: 1,
    flex: 9,
    justifyContent: 'flex-end',
    padding: 10,
  },
  messageRow: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#075e54',
    borderRadius: 5,
    alignSelf: 'flex-end',
    width: '60%',
  },
  messageText: {
    fontSize: 18,
    fontFamily: 'FoundersGrotesk',
    color: Colors.primary
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    height: 100,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    fontFamily: 'FoundersGrotesk',
    borderRadius: 5,
    marginRight: 10,
  },
});

export default Page;