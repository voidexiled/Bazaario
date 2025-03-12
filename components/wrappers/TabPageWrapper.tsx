import { RefreshControl, StyleSheet, Text, View } from "react-native";
import React, { type ReactNode } from "react";
import styled from "styled-components/native";
import { wp, hp } from "@/helpers/common";
import { theme } from "@/constants/Theme";
const TabPageWrapper = ({
  children,
  refreshControl,
  refreshing,
  onRefresh,
}: {
  children: ReactNode;
  refreshControl: boolean;
  refreshing: boolean;
  onRefresh: () => void;
}) => {
  return (
    <WrapperView
      {...(refreshControl && {
        refreshControl: (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        ),
      })}
    >
      {children}
    </WrapperView>
  );
};

export default TabPageWrapper;

const WrapperView = styled.ScrollView`
  flex: 1;
  background-color: ${theme.colors.dark.base.background_active};
  padding: ${hp(3)}px ${wp(4)}px;
  height: 100%;
  width: 100%;
`;
