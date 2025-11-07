import { useContextSearch } from "@/features/search/hooks/contextSearch";
import React, { createRef, useRef, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import BottomSheet from "../bottom-sheet/BottomSheet";
import { BottomSheetHandle } from "../bottom-sheet/types";
import { IconSymbol } from "../ui/icon-symbol";
import TagSkeleton from "../ui/skeletons/TagSkeleton";
import Tag from "../ui/tag";
import BottomSheetGenres from "./components/BottomSheetGenres";
import ContentChildrenFiltersMap from "./components/ContentChildrenFiltersBottomSheet";
import ContentFiltersBottomSheet from "./components/ContentFiltersBottomSheet";
import { getTitleValues } from "./utils/getTitleValues";
import { openBottomSheetRefs } from "./utils/openBottomSheetRefs";

const ScrollFilters = () => {
  const { filters, setFilters, loadingData, genres } = useContextSearch();

  const [titleBottomSheet, setTitleBottomSheet] = useState("");

  const refScrollView = useRef<ScrollView>(null);
  const refBottomSheetFilters = useRef<BottomSheetHandle | null>(null);
  const refBottomSheetGenres = useRef<BottomSheetHandle | null>(null);
  const bottomSheetRefs = filters.map(() => createRef<BottomSheetHandle>());

  const paramOpenBottomSheetRefs = {
    bottomSheetRefs,
    filters,
    refBottomSheetFilters,
    setTitleBottomSheet,
  };

  const paramContentChildrenFilterBottomSheet = {
    filters,
    setFilters,
    refScrollView,
    bottomSheetRefs,
  };

  return (
    <>
      <BottomSheet
        title={"Filters"}
        activeHeight={400}
        ref={refBottomSheetFilters}
      >
        {filters.map((item, index) => (
          <ContentFiltersBottomSheet
            key={item.title}
            item={item}
            paramsOpenBottomSheetRefs={{ ...paramOpenBottomSheetRefs, index }}
          />
        ))}
      </BottomSheet>
      {filters.map((item, index) => {
        return (
          <BottomSheet
            key={item.title}
            title={titleBottomSheet}
            activeHeight={item.height}
            ref={bottomSheetRefs[index]}
          >
            <ContentChildrenFiltersMap
              params={{
                ...paramContentChildrenFilterBottomSheet,
                index,
                item,
              }}
            />
          </BottomSheet>
        );
      })}
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
            {filters.filter((item) => item.status).length > 0 && (
              <TouchableOpacity
                className="py-1 px-1"
                onPress={() => refBottomSheetFilters.current?.openSheet()}
              >
                <IconSymbol name="tune" color={"#fff"} />
              </TouchableOpacity>
            )}
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
                title={genres.value}
                showIcon={true}
                nameIcon="arrow-drop-down"
                styleIcon={{ width: 17 }}
                onPress={() => refBottomSheetGenres.current?.openSheet()}
              />
            )}
            {filters.find((item) => item.status) && (
              <View style={{ width: 1, backgroundColor: "#9ca3af" }}></View>
            )}
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
