import React from "react";
import { TouchableOpacity } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { IconSymbol } from "./icon-symbol";
import IconTrophy from "./IconTrophy";
import { NameMaterialIcons } from "./models/name-material-icons";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const TabBarIcon = ({
  title,
  icon,
  focused,
  onPress,
}: {
  title: string;
  icon: NameMaterialIcons;
  focused: boolean;
  onPress?: () => void;
}) => {
  return (
    <AnimatedTouchableOpacity
      layout={LinearTransition.springify().mass(0.5)}
      onPress={onPress}
      className={`flex-row text-gray-700 items-center justify-center gap-2  ${focused && "bg-gray-200"} rounded-full overflow-hidden`}
      style={{ borderRadius: 100, paddingVertical: 8, paddingHorizontal: 12 }}
    >
      {icon === "10k" ? (
        <IconTrophy size={24} color={focused ? "#1f2937" : "#6b7280"} />
      ) : (
        <IconSymbol name={icon} color={focused ? "#1f2937" : "#6b7280"} />
      )}
      {focused && (
        <Animated.Text
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}
          className="capitalize text-[#1f2937] font-bold"
        >
          {title}
        </Animated.Text>
      )}
    </AnimatedTouchableOpacity>
  );
};

export default TabBarIcon;
