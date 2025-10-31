import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const IconTrophy = ({ color, size = 24 }: { color: string; size?: number }) => {
  return (
    <MaterialCommunityIcons
      name="trophy-variant-outline"
      size={size}
      color={color}
    />
  );
};

export default IconTrophy;
