import React from 'react'
import 'react-native-gesture-handler';

import { View, Text, StyleSheet } from 'react-native'
import { NavigationContainer  } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Link, useRouting } from 'expo-next-react-navigation'

const Stack = createStackNavigator();

// See the pages/folder for the next.js routes
// everything else is confined in this file :)

export function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen 🥳</Text>
      <Link style={{ color: 'green', fontSize: 20 }} routeName="Profile">
        Click me to open profile :)
      </Link>
    </View>
  )
}

export function Profile() {
  const { goBack } = useRouting()

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile! 🏋️‍♀️</Text>
      <Button text="👈 Go back" onPress={() => goBack()} />
    </View>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

/**
 *
 *
 *
 *
 *
 *
 * styles, button, etc
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    margin: 20,
  },
})

function Button({ text, onPress }: { text: string; onPress?: () => void }) {
  return (
    <Text
      style={{
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'black',
        color: 'white',
        margin: 20,
      }}
      onPress={onPress}
    >
      {text}
    </Text>
  )
}
