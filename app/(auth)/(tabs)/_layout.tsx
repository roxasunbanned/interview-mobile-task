import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Colors from '@/constants/Colors'

const Page = () => {
  return (
    <Tabs screenOptions={{ 
        tabBarStyle: {
            backgroundColor: Colors.secondary,
            paddingVertical:0,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarActiveBackgroundColor: Colors.primary,
     }}>
        <Tabs.Screen name="dashboard" options={{
            title: 'Dashboard',
            headerTitleStyle: {
                fontFamily: "FoundersGrotesk"
            },
            headerShown: false,
            tabBarLabel: ({focused}) => (
                <Text style={[focused ? styles.active : styles.inactive]}>Dashboard</Text>
            ),
            tabBarIcon: ({focused}) => (
                <FontAwesome name="home" size={24} style={{
                    color: focused ? Colors.secondary : Colors.primary }} />
            ),
        }}/>
        <Tabs.Screen name="projects" options={
            {
                title: 'Projects',
                headerTitleStyle: {
                    fontFamily: "FoundersGrotesk"
                },
                headerShown: false,
                tabBarLabel: ({focused}) => (
                    <Text style={[focused ? styles.active : styles.inactive]}>Projects</Text>
                ),
                tabBarIcon: ({focused}) => (
                    <FontAwesome6 name="bars-progress" size={24} style={{
                        color: focused ? Colors.secondary : Colors.primary }} />
                ),
            }
        }/>
        <Tabs.Screen name="deliverables" options={
            {
                title: 'Downloads',
                headerTitleStyle: {
                    fontFamily: "FoundersGrotesk"
                },
                headerShown: false,
                tabBarLabel: ({focused}) => (
                    <Text style={[focused ? styles.active : styles.inactive]}>Downloads</Text>
                ),
                tabBarIcon: ({focused}) => (
                    <FontAwesome name="download" size={24} style={{
                        color: focused ? Colors.secondary : Colors.primary }} />
                ),
            }
        }/>
        <Tabs.Screen name="trends" options={
            {
                title: 'Trends',
                headerTitleStyle: {
                    fontFamily: "FoundersGrotesk"
                },
                headerShown: false,
                tabBarLabel: ({focused}) => (
                    <Text style={[focused ? styles.active : styles.inactive]}>Trends</Text>
                ),
                tabBarIcon: ({focused}) => (
                    <FontAwesome name="line-chart" size={24} style={{
                        color: focused ? Colors.secondary : Colors.primary }} />
                ),
            }
        }/>
        <Tabs.Screen name="contact" options={
            {
                title: 'Contact',
                headerTitleStyle: {
                    fontFamily: "FoundersGrotesk"
                },
                headerShown: false,
                tabBarLabel: ({focused}) => (
                    <Text style={[focused ? styles.active : styles.inactive]}>Contact   </Text>
                ),
                tabBarIcon: ({focused}) => (
                    <FontAwesome name="comment" size={24} style={{
                        color: focused ? Colors.secondary : Colors.primary }} />
                ),
            }
        }/>
    </Tabs>
  )
}

const styles = {
    tabNav: {
      background: Colors.secondary,
    },
    active: {
        color: Colors.secondary,
        fontFamily: "FoundersGrotesk",
    },
    inactive: {
        color: Colors.primary,
        fontFamily: "FoundersGrotesk",
    }
  };
export default Page