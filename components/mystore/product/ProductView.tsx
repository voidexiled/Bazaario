import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import type { Tables } from "@/database.types";
import { theme } from "@/constants/Theme";
import StyledText from "@/components/StyledText";
import { useRouter } from "expo-router";
import {
  ArrowRight01Icon,
  Money01Icon,
  StarIcon,
} from "hugeicons-react-native";
import { hp, wp } from "@/helpers/common";
import ItemImage from "@/components/mystore/ItemImage";
import RatePreview from "../RatePreview";
import TagsScroll from "../TagsScroll";
import { useQuery } from "@tanstack/react-query";
import { getTagsByArrayId } from "@/api/tags";

const ProductView = ({
  product,
}: {
  product: Tables<"products"> & {
    product_images: Tables<"product_images">[];
    product_reviews: Tables<"product_reviews">[];
  };
}) => {
  const router = useRouter();
  const [scale] = useState(new Animated.Value(1));
  const [tags, setTags] = useState<Tables<"tags">[]>([]);

  const {
    data: dataTags,
    error: errorTags,
    isLoading: isLoadingTags,
  } = useQuery({
    queryKey: ["tags", product.id],
    queryFn: () => getTagsByArrayId(product.category),

    retry: true,
  });

  useEffect(() => {
    if (dataTags) {
      setTags(dataTags);
    }
  }, [dataTags]);

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };
  const handleOnPress = () => {
    router.push(`/(products)/product_details/${product.id}`);
  };
  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <View style={styles.container}>
        <Pressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={handleOnPress}
          style={styles.topRow}
        >
          <View style={styles.topRowNameContainer}>
            <StyledText
              style={{
                fontSize: hp(2.3),
                color: theme.colors.dark.base.text,
                fontWeight: "bold",
              }}
            >
              {product.name}
            </StyledText>
          </View>
          <Animated.View
            style={[
              { transform: [{ scale }] },
              {
                position: "absolute",
                right: wp(2),
                top: hp(1),
                alignItems: "center",
                justifyContent: "center",
                padding: 5,
                borderRadius: theme.border.radius.sm,
                borderCurve: "continuous",
              },
            ]}
          >
            <ArrowRight01Icon
              color={theme.colors.dark.base.secondary_text}
              size={hp(3)}
            />
          </Animated.View>
        </Pressable>

        <View style={styles.imagesRow}>
          <ItemImage
            bucket="products"
            key={product.product_images[0].id}
            userId={product.user_uuid}
            imageUrl={product.product_images[0].image_url}
            style={{
              width: "100%",
              height: hp(28),
              opacity: 0.7,
            }}
          />
        </View>
        <View style={styles.info}>
          <View style={{ width: "100%", height: hp(8), flexDirection: "row" }}>
            <ScrollView
              style={{ width: "100%" }}
              contentContainerStyle={{
                paddingHorizontal: wp(4.5),
              }}
              nestedScrollEnabled
            >
              <StyledText
                style={{
                  color: theme.colors.dark.base.secondary_text,
                  fontSize: hp(1.8),
                }}
              >
                {product.description}
              </StyledText>
            </ScrollView>
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              height: hp(3),
              marginTop: hp(1),
            }}
          >
            <TagsScroll tags={tags} />
          </View>
        </View>
        <View style={styles.stadistics}>
          <RatePreview rates={product.product_reviews} showCount />

          <StyledText
            style={{
              color: theme.colors.dark.base.text,
              fontSize: hp(2.3),
              fontWeight: "bold",
            }}
          >
            {`\$${product.price.toFixed(2)} MXN`}
          </StyledText>
        </View>
      </View>
    </Animated.View>
  );
};

export default ProductView;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: hp(28 + 6 + 6 + 14),
    alignItems: "center",
    borderRadius: theme.border.radius.xs,
    borderCurve: "continuous",
    marginVertical: 10,
    backgroundColor: theme.colors.dark.base.background,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
    alignItems: "center",
    width: "100%",
    height: hp(6),
    paddingHorizontal: wp(4.5),
    backgroundColor: theme.colors.dark.base.background_low_opacity,

    gap: 35,
  },
  topRowNameContainer: {
    position: "relative",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  info: {
    height: hp(14),
    width: "100%",
    paddingVertical: hp(1),
  },
  imagesRow: {
    width: "100%",
    height: hp(28),
    backgroundColor: theme.colors.dark.base.background_low_opacity,
    overflow: "hidden",
    //padding: 15,
  },
  stadistics: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: hp(6),
    paddingHorizontal: wp(4.5),
    gap: 5,
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 3,
    paddingHorizontal: 15,
  },
});
