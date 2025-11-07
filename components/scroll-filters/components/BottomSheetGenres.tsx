import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import { BottomSheetHandle } from "@/components/bottom-sheet/types";
import Tag from "@/components/ui/tag";
import { useContextSearch } from "@/features/search/hooks/contextSearch";
import React from "react";
import { ScrollView, View } from "react-native";

const BottomSheetGenres = ({
  refBottomSheetGenres,
  refScrollView,
}: {
  refBottomSheetGenres: React.RefObject<BottomSheetHandle | null>;
  refScrollView: React.RefObject<ScrollView | null>;
}) => {
  const { genres, setGenres } = useContextSearch();

  const addGenre = (id: number) => {
    refScrollView.current?.scrollTo({ x: 0, y: 0, animated: false });
    refBottomSheetGenres.current?.closeSheet();
    const value = `${id}`;
    setGenres((prevGenres) => ({
      ...prevGenres,
      value,
      status: genres.value === value && genres.status ? false : true,
    }));
  };
  return (
    <BottomSheet
      title={genres.title}
      activeHeight={genres.height}
      ref={refBottomSheetGenres}
    >
      <View className="flex-row gap-2 " style={{ flexWrap: "wrap" }}>
        {genres.values.map((item) => (
          <View key={item.name}>
            <Tag
              onPress={() => addGenre(item.mal_id)}
              title={item.name}
              status={true}
              showIcon={true}
              nameIcon={
                genres.value === `${item.mal_id}` && genres.status
                  ? "check"
                  : "add"
              }
              sizeIcon={20}
              colorIcon={
                genres.value === `${item.mal_id}` && genres.status
                  ? "#16a34a"
                  : "#fff"
              }
            />
          </View>
        ))}
      </View>
    </BottomSheet>
  );
};

export default BottomSheetGenres;
