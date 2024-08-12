import { View, Text, StyleSheet, ScrollView, Image, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ProgressBar } from 'react-native-paper';
import Colors from '@/constants/Colors';

const initialProjectData = [
    { name: 'Chemitec', progress: 0, budget: 0, image: require('@/assets/logos/chemitec.jpg') },
    { name: 'Etatron', progress: 0, budget: 0, image: require('@/assets/logos/etatron.png') },
    { name: 'Exakta', progress: 0, budget: 0, image: require('@/assets/logos/exakta.png') },
    { name: 'Brightwell', progress: 0, budget: 0, image: require('@/assets/logos/brightwell.png') },
  ];

const generateRandomValues = () => {
  return initialProjectData.map(project => ({
    ...project,
    progress: Math.random(),
    budget: Math.random(),
  }));
};

const Projects = () => {
  const [projectData, setProjectData] = useState(initialProjectData);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const updatedProjectData = generateRandomValues();
    setProjectData(updatedProjectData);
  }, []);

  const filteredProjects = projectData.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Projects"
        placeholderTextColor={Colors.secondary} 
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {filteredProjects.map((project, index) => (
        <View key={index} style={styles.projectCard}>
          <View style={styles.projectHeader}>
            <Image source={project.image} style={styles.projectImage} />
            <Text style={styles.projectName}>{project.name}</Text>
          </View>
          <View style={styles.projectProgress}>
            <Text style={styles.label}>Completion</Text>
            <ProgressBar progress={project.progress} color="#6200ee" style={styles.progressBar} />
            <Text style={styles.progressText}>{Math.round(project.progress * 100)}%</Text>
            <Text style={styles.label}>Budget</Text>
            <ProgressBar progress={project.budget} color="#03dac6" style={styles.progressBar} />
            <Text style={styles.progressText}>{Math.round(project.budget * 100)}%</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: Colors.secondary,
  },
  projectCard: {
    backgroundColor: Colors.primary,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  projectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  projectImage: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  projectName: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'FoundersGroteskBold',
  },
  projectProgress: {
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'FoundersGroteskBold',
    marginTop: 10,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  progressText: {
    marginTop: 5,
    fontSize: 14,
    fontFamily: 'FoundersGrotesk',
    color: Colors.secondary,
  },
});

export default Projects;