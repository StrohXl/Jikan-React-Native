import { useContextSearch } from "@/features/search/hooks/contextSearch";
import React, { createRef, useRef } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { BottomSheetHandle } from "../bottom-sheet/types";
import { IconSymbol } from "../ui/icon-symbol";
import TagSkeleton from "../ui/skeletons/TagSkeleton";
import Tag from "../ui/tag";
import BottomSheetFilters from "./components/BottomSheetFilters";
import BottomSheetFiltersArray from "./components/BottomSheetFiltersArray";
import BottomSheetGenres from "./components/BottomSheetGenres";
import { getTitleGenres, getTitleValues } from "./utils/getTitleValues";
import { openBottomSheetRefs } from "./utils/openBottomSheetRefs";

const ScrollFilters = () => {
  const { filters, loadingData, genres } = useContextSearch();

  const refScrollView = useRef<ScrollView>(null);
  const refBottomSheetFilters = useRef<BottomSheetHandle | null>(null);
  const refBottomSheetGenres = useRef<BottomSheetHandle | null>(null);
  const refBottomSheetFilterArray = filters.map(() =>
    createRef<BottomSheetHandle>()
  );

  const paramOpenBottomSheetRefs = {
    refBottomSheetFilterArray,
    filters,
    refBottomSheetFilters,
  };

  return (
    <>
      <BottomSheetFilters
        refBottomSheetGenres={refBottomSheetGenres}
        refBottomSheetFilterArray={refBottomSheetFilterArray}
        refBottomSheetFilters={refBottomSheetFilters}
      />
      <BottomSheetFiltersArray
        refBottomSheetFilterArray={refBottomSheetFilterArray}
        refScrollView={refScrollView}
      />
      {genres.values.length > 0 && (
        <BottomSheetGenres
          refScrollView={refScrollView}
          refBottomSheetGenres={refBottomSheetGenres}
        />
      )}

      <ScrollView
        ref={refScrollView}
        showsHorizontalScrollIndicator={false}
        className="mt-4"
        contentContainerStyle={{ gap: 10 }}
        horizontal={true}
        scrollEnabled={loadingData ? false : true}
      >
        {loadingData ? (
          <>
            <TagSkeleton />
            <TagSkeleton />
            <TagSkeleton />
            <TagSkeleton />
            <TagSkeleton />
            <TagSkeleton />
          </>
        ) : (
          <>
            <TouchableOpacity
              className="py-1 px-1"
              onPress={() => refBottomSheetFilters.current?.openSheet()}
            >
              <IconSymbol name="tune" />
            </TouchableOpacity>
            {filters.map(
              (item, index) =>
                item.status && (
                  <Tag
                    status={item.status}
                    title={getTitleValues({ filters, index })}
                    key={item.title}
                    showIcon={true}
                    nameIcon="arrow-drop-down"
                    onPress={() =>
                      openBottomSheetRefs({
                        params: { ...paramOpenBottomSheetRefs, index },
                      })
                    }
                  />
                )
            )}
            {genres.values.length > 0 && genres.status && (
              <Tag
                status={genres.status}
                title={getTitleGenres({ genres })}
                showIcon={true}
                nameIcon="arrow-drop-down"
                styleIcon={{ width: 17 }}
                onPress={() => refBottomSheetGenres.current?.openSheet()}
              />
            )}
            <View style={{ width: 1, backgroundColor: "#9ca3af" }}></View>

            {filters.map(
              (item, index) =>
                !item.status && (
                  <Tag
                    status={item.status}
                    title={item.title}
                    key={item.title}
                    showIcon={true}
                    nameIcon="arrow-drop-down"
                    styleIcon={{ width: 17 }}
                    onPress={() =>
                      openBottomSheetRefs({
                        params: { ...paramOpenBottomSheetRefs, index },
                      })
                    }
                  />
                )
            )}
            {genres.values.length > 0 && !genres.status && (
              <Tag
                status={genres.status}
                title={genres.title}
                showIcon={true}
                nameIcon="arrow-drop-down"
                styleIcon={{ width: 17 }}
                onPress={() => refBottomSheetGenres.current?.openSheet()}
              />
            )}
          </>
        )}
      </ScrollView>
    </>
  );
};

export default ScrollFilters;
