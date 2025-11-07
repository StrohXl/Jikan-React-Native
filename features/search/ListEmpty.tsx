import ListEmpty from "@/components/ui/ListEmpty";
import ColumnGapAnimeCardSkeleton from "@/components/ui/skeletons/ColumnGapAnimeCardSkeleton";
import React from "react";

const ListEmptyComponent = ({
  loading,
  cardWidth,
  columnGap,
}: {
  loading: boolean;
  columnGap: number;
  cardWidth: number;
}) => {
  return (
    <>
      {loading ? (
        <>
          <ColumnGapAnimeCardSkeleton
            cardWidth={cardWidth}
            columnGap={columnGap}
          />
        </>
      ) : (
        <ListEmpty
          colorIcon="#e5e7eb"
          title="No Results found"
          sizeIcon={100}
        />
      )}
    </>
  );
};

export default ListEmptyComponent;
