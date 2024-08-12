import { View, Text, Image, StyleSheet, ScrollView, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import Colors from '@/constants/Colors';

const titles = [
  "Breaking News: Market Hits All-Time High",
  "Tech Giants Release New Gadgets",
  "Health Tips for a Better Life",
  "Travel Destinations You Must Visit",
  "The Future of Artificial Intelligence"
];

const excerpts = [
  "The stock market reached an all-time high today, with major indices showing significant gains...",
  "Today, several tech giants unveiled their latest gadgets, promising to revolutionize the industry...",
  "Here are some essential health tips to help you lead a healthier and more fulfilling life...",
  "Discover the top travel destinations that should be on your bucket list...",
  "Artificial Intelligence is rapidly evolving, and here's what you need to know about its future..."
];

const images = [
  "https://picsum.photos/400/100",
  "https://picsum.photos/400/100",
  "https://picsum.photos/400/100",
  "https://picsum.photos/400/100",
  "https://picsum.photos/400/190",
];

const Page = () => {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const generatedArticles = generateArticles(10); // Generate 10 random articles
    setArticles(generatedArticles);
  }, []);

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search articles..."
        placeholderTextColor={Colors.secondary} 
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <ScrollView contentContainerStyle={styles.articlesContainer}>
        {filteredArticles.map((article, index) => (
          <View key={index} style={styles.article}>
            <Image source={{ uri: article.image }} style={styles.image} />
            <Text style={styles.title}>{article.title}</Text>
            <Text style={styles.excerpt}>{article.excerpt}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const generateArticles = (count) => {
  const articles = [];
  for (let i = 0; i < count; i++) {
    const title = titles[Math.floor(Math.random() * titles.length)];
    const excerpt = excerpts[Math.floor(Math.random() * excerpts.length)];
    const image = images[Math.floor(Math.random() * images.length)];
    articles.push({ title, excerpt, image });
  }
  return articles;
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  articlesContainer: {
    marginTop: 10,
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 100,
  },
  searchBar: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 12,
    marginBottom: 20,
    width: '100%',  
    color: Colors.secondary,
  },
  article: {
    width: '100%',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontFamily: 'FoundersGroteskBold',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  excerpt: {
    fontSize: 14,
    fontFamily: 'FoundersGrotesk',
    color: '#555',
  },
});

export default Page;