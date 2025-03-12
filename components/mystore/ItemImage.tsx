import {
  Animated,
  StyleSheet,
  Text,
  View,
  type FlexStyle,
  type ViewStyle,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Image, type ImageStyle } from "expo-image";
import { supabase } from "@/lib/supabase";
import type { Tables } from "@/database.types";
import StyledText from "../StyledText";
import { theme } from "@/constants/Theme";

const ItemImage = ({
  userId,
  imageUrl,
  style,
  uriWidth,
  uriHeight,
  bucket,
  wrapperStyle,
}: {
  userId: string;
  imageUrl: string;
  style: ImageStyle;
  uriWidth?: number;
  uriHeight?: number;
  bucket: "products" | "services" | "posts";
  wrapperStyle?: ViewStyle;
}) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  useEffect(() => {
    if (imageUrl) {
      downloadImage(`${userId}/${imageUrl}`);
    }
  }, [imageUrl]);

  async function downloadImage(path: string) {
    try {
      const { data } = supabase.storage.from(bucket).getPublicUrl(path);
      console.log("image of ".concat(imageUri || ""), data);

      setImageUri(data.publicUrl);
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Error downloading image ${imageUrl}: `, error.message);
      }
    }
  }

  return (
    <View
      style={[
        wrapperStyle,
        {
          flex: 1,
          width: "100%",
          height: "100%",
          overflow: "hidden",
        },
      ]}
    >
      {imageUri && (
        <Image
          source={imageUri}
          style={[style, {}]}
          transition={1000}
          contentFit="cover"
        />
      )}
    </View>
  );
};

export default ItemImage;

const styles = StyleSheet.create({});
