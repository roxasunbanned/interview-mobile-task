import { StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
  mainContainer: {
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  titleHeader: {
    fontFamily: 'FoundersGrotesk',
    fontSize: 64,
    color: Colors.primary,
    textTransform: 'uppercase',
  },
  screenHeader: {
    fontFamily: 'FoundersGroteskBold',
    fontSize: 36,
    color: Colors.primary
  },
  welcomeText: {
    fontFamily: 'FoundersGrotesk',
    fontSize: 14,
    color: Colors.gray
  },
  text: {
    fontFamily: 'FoundersGrotesk',
  },
  header: {
    fontFamily: 'FoundersGrotesk',
    fontSize: 40,
    fontWeight: '700',
  },
  pillButton: {
    padding: 10,
    height: 60,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rounded: {
    width: 60,
    height: 60,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 3,
  },
  buttonText: {
    fontFamily: 'FoundersGrotesk',
    fontSize: 22,
    fontWeight: '500',
  },
  textLink: {
    fontFamily: 'FoundersGrotesk',
    color: Colors.link,
    fontSize: 18,
    fontWeight: '500',
  },
  descriptionText: {
    fontFamily: 'FoundersGrotesk',
    fontSize: 18,
    marginTop: 20,
    color: Colors.secondary,
  },
  pillButtonSmall: {
    paddingHorizontal: 20,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextSmall: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20,
    marginBottom: 10,
  },
  block: {
    marginHorizontal: 20,
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 16,
    gap: 20,
  },
});