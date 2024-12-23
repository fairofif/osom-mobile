import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../screens/Dashboard";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Start from "../screens/StartScreen";
import { useAuth } from "../context/AuthContext";
import SplashScreen from "../screens/SplashScreen";
import Character from "../screens/Character";
import InGame from "../screens/InGame";
import Profile from "../screens/Profile";
import Leaderboard from "../screens/Leaderboard";
// import { Icon } from "react-native-vector-icons/Icon";

const Stack = createNativeStackNavigator();

// const Tab = createBottomTabNavigator();

// const TabNavigator = () => {
//     return (
//         <Tab.Navigator
//             screenOptions={{
//                 tabBarStyle: { height: 60, paddingBottong: 10 }
//             }}
//         >
//             <Tab.Screen
//                 name="Dashboard"
//                 component={Dashboard}
//                 options={{
//                     title: "Dashboard",
//                     headerShown: false,
//                     tabBarIcon: ({ color, size }) => (
//                         <Icon name="home" color={color} size={size} />
//                     ),
//                 }}
//             />
//         </Tab.Navigator>
//     )
// }

export default function AppNavigator() {
  const auth = useAuth();

  return (
    <Stack.Navigator>
      {auth.user ? (
        <>
          {/* <Stack.Screen
                        name="Main"
                        component={TabNavigator}
                        options={{ title: "Main", headerShown: false }}
                    /> */}
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Character"
            component={Character}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Leaderboard"
            component={Leaderboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="InGame"
            component={InGame}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Start"
            component={Start}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
