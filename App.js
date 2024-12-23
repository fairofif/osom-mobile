import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import AppNavigator from './src/navigation/AppNavigator'
import { AuthProvider } from "./src/context/AuthContext"
import Dashboard from "./src/screens/Dashboard"
import Profile from "./src/screens/Profile"

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Profile />
      </NavigationContainer>
    </AuthProvider>
  )
}
