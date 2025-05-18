import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import styles from "../styles/AddItemScreen";
import { Image, Animated, Easing } from "react-native";
import BouncyButton from "../components/BouncyButton";
import { getAuth, signInAnonymously } from "firebase/auth";
import { uploadPhoto } from "../firebase/uploadPhoto"; 
import { auth } from "../firebase/config"; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

import {
  useFonts,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_600SemiBold,
} from "@expo-google-fonts/rubik";

export default function AddItemScreen() {
  const [itemName, setItemName] = useState("");
  const [question, setQuestion] = useState("");
  const [photo, setPhoto] = useState(null);

  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_600SemiBold,
  });

  if (!fontsLoaded) return null;

  const handleSave = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!itemName || !userId) {
        alert("Please complete all fields and ensure you're signed in.");
        return;
      }
  
      //const photoURL = await uploadPhoto(photo);
      //console.log("✅ Photo uploaded:", photoURL);
  
      const userItemsRef = collection(db, "reassurance-items", userId, "items");
  
      await addDoc(userItemsRef, {
        itemName,
        question,
        aiResponse: null,
        createdAt: serverTimestamp(),
      });
  
      alert("✅ Item saved to Firestore!");
      setItemName("");
      setQuestion("");
      setPhoto(null);
    } catch (error) {
      console.error("❌ Save error:", error);
      alert("Something went wrong while saving.");
    }
  };

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
      setPhoto(imageUri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.heading, { fontFamily: "Rubik_600SemiBold" }]}>
        Add New Item
      </Text>

      <TextInput
        style={[styles.input, { fontFamily: "Rubik_400Regular" }]}
        placeholder="e.g. Stove off"
        value={itemName}
        onChangeText={setItemName}
      />
      {!photo && (
        <>
          <View style={styles.photoBox}>
            <FontAwesome
              name="camera"
              size={40}
              color="#ff8b5f"
              style={styles.iconShadow}
            />
          </View>
          <Text
            style={[styles.photoPrompt, { fontFamily: "Rubik_400Regular" }]}
          >
            Take a photo of what you want to verify
          </Text>
        </>
      )}
      {photo && (
        <View style={{ marginTop: 20, alignItems: "center" }}>
          <Text style={{ fontFamily: "Rubik_400Regular", marginBottom: 8 }}>
            📸 Preview:
          </Text>
          <Image
            source={{ uri: photo }}
            style={{ width: 200, height: 200, borderRadius: 10 }}
          />
        </View>
      )}

      <View style={styles.photoButtonRow}>
        <TouchableOpacity style={styles.takePhotoButton} onPress={openCamera}>
          <FontAwesome name="camera" size={20} color="#fff" />
          <Text
            style={[styles.photoBtnText, { fontFamily: "Rubik_500Medium" }]}
          >
            Take Photo
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.uploadPhotoButton}>
          <FontAwesome name="upload" size={20} color="#fff" />
          <Text
            style={[styles.photoBtnText, { fontFamily: "Rubik_500Medium" }]}
          >
            Upload Photo
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={[styles.input, { fontFamily: "Rubik_400Regular" }]}
        placeholder="Optional AI question (e.g. Is the stove off?)"
        value={question}
        onChangeText={setQuestion}
      />

      <BouncyButton style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </BouncyButton>
    </View>
  );
}
