import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="home"
        options={{
          headerTitleAlign: "center",
          headerTitle: "Cat Mood",
          headerTransparent: true,
          headerTitleStyle: { color: "#FFCC00" },
          // headerBackVisible: false
        }}
      />
      <Stack.Screen
        name="addEmocao"
        options={{
          headerTitleAlign: "center",
          headerTitle: "Cat Mood",
          headerTransparent: true,
          headerTitleStyle: { color: "#FFCC00" },
          // headerBackVisible: false
        }}
      />
    </Stack>
  );
}
