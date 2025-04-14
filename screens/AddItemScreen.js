import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';

export default function AddItemScreen() {
  const [itemName, setItemName] = useState("");
  const [question, setQuestion] = useState("");

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  
    if (permissionResult.granted === false) {
      alert("Camera access is required!");
      return;
    }
  
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
    });
  
    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      console.log("Image URI:", imageUri);
      // setImage(imageUri) or save it to state
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add New Item</Text>

      <TextInput
        style={styles.input}
        placeholder="e.g. Stove off"
        value={itemName}
        onChangeText={setItemName}
      />

      <View style={styles.photoBox}>
        <FontAwesome
          name="camera"
          size={40}
          color="#ff8b5f"
          style={styles.iconShadow}
        />
        <Text style={styles.photoPrompt}>
          Take a photo of what you want to verify
        </Text>

        <View style={styles.photoButtonRow}>
          <TouchableOpacity style={styles.elevatedButtonPurple} onPress={openCamera}>
            <FontAwesome name="camera" size={20} color="#fff" />
            <Text style={styles.photoBtnText}>Take Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.elevatedButtonYellow}>
            <FontAwesome name="upload" size={20} color="#2c3e50" />
            <Text style={[styles.photoBtnText, { color: "#2c3e50" }]}>
              Upload Photo
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Optional AI question (e.g. Is the stove off?)"
        value={question}
        onChangeText={setQuestion}
      />

      <TouchableOpacity style={styles.elevatedButtonGreen}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff5ee",
    padding: 20,
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  photoBox: {
    backgroundColor: "#f2effc",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  photoPrompt: {
    marginTop: 12,
    fontSize: 16,
    color: "#5e5e66",
    textAlign: "center",
  },
  photoButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 10,
  },
  elevatedButtonPurple: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7f61c5",
    borderRadius: 12,
    paddingVertical: 12,
    flex: 1,
  
    borderBottomWidth: 4,
    borderBottomColor: "#5b4ca3", // darker purple for depth
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
  
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  elevatedButtonYellow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fdda57", // bright top color
    borderRadius: 12,
    paddingVertical: 12,
    flex: 1,
  
    // Simulated bottom border
    borderBottomWidth: 4,
    borderBottomColor: "#2c3e50", 
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,// dark color for depth
  
    // Optional shadow to add realism
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4
  },
  elevatedButtonGreen: {
    backgroundColor: "#60d394",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  
    borderBottomWidth: 4,
    borderBottomColor: "#3da56a", // darker green
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
  
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  photoBtnText: {
    fontWeight: "600",
    marginLeft: 8,
    fontSize: 15,
    color: "#fff",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});