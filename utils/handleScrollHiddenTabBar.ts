import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";

const handleScrollHiddenTabBar = ({
  event,
  setTabBarVisible,
}: {
  event: NativeSyntheticEvent<NativeScrollEvent>;
  setTabBarVisible: (visible: boolean) => void;
}) => {
  const position = event.nativeEvent.contentOffset.y;

  const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
  const contentHeight = event.nativeEvent.contentSize.height;
  if (position + scrollViewHeight >= contentHeight - contentHeight * 0.05) {
    setTabBarVisible(false);
  } else {
    setTabBarVisible(true);
  }
};

export default handleScrollHiddenTabBar;
