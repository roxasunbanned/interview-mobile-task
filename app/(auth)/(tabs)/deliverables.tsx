import { View, Text, StyleSheet, ScrollView, Image, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ProgressBar } from 'react-native-paper';
import { FontAwesome6 } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

const fileTypes = [
  {
    type: "PDF",
    image: require('@/assets/icons/pdf.png'),
  },
  {
    type: "JPEG",
    image: require('@/assets/icons/jpeg.png'),
  },
  {
    type: "PPT",
    image: require('@/assets/icons/ppt.png'),
  },
  {
    type: "DOCX",
    image: require('@/assets/icons/docx.png'),
  },
  {
    type: "TXT",
    image: require('@/assets/icons/txt.png'),
  }
];

const companies = ["Chemitec", "Etatron", "Exakta", "Brightwell"];

const generateRandomFileName = (type) => {
  const randomString = Math.random().toString(36).substring(7);
  return `${type}_${randomString}`;
};

const generateRandomDeliverables = (numDeliverables) => {
  const deliverables = [];
  for (let i = 0; i < numDeliverables; i++) {
    const randomFileType = fileTypes[Math.floor(Math.random() * fileTypes.length)];
    const randomCompany = companies[Math.floor(Math.random() * companies.length)];
    const randomFileName = generateRandomFileName(randomFileType.type);

    deliverables.push({
      ...randomFileType,
      company: randomCompany,
      name: randomFileName,
    });
  }
  return deliverables;
};

const Deliverables = () => {
  const [deliverableData, setDeliverableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const updatedDeliverableData = generateRandomDeliverables(100); // Generate 100 random deliverables
    setDeliverableData(updatedDeliverableData);
  }, []);

  const filteredDeliverables = deliverableData.filter(deliverable =>
    deliverable.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    deliverable.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    deliverable.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by file type, company, or file name"
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {filteredDeliverables.map((deliverable, index) => (
          <View key={index} style={styles.deliverableCard}>
            <View style={styles.deliverableHeader}>
              <Image source={deliverable.image} style={styles.deliverableImage} />
              <View style={{flex: 7}}>
                <Text style={styles.deliverableType}>{deliverable.name}</Text>
                <Text style={styles.companyName}>{deliverable.company}</Text>
                <Text style={styles.fileName}>{deliverable.type}</Text>
              </View>
              <FontAwesome6 name="download" size={32} color={Colors.secondary} style={{flex: 1, justifySelf: 'flex-end', alignSelf: 'center'}} />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  searchBar: {
    height: 40,
    borderColor: Colors.darkGray,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  deliverableCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  deliverableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deliverableImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
  },
  deliverableType: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'FoundersGroteskBold',
  },
  companyName: {
    fontSize: 14,
    color: Colors.darkGray,
    fontFamily: 'FoundersGrotesk',
  },
  fileName: {
    fontSize: 14,
    color: Colors.darkGray,
    fontFamily: 'FoundersGrotesk',
  },
  deliverableProgress: {
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    fontFamily: 'FoundersGroteskBold',
  },
});

export default Deliverables;