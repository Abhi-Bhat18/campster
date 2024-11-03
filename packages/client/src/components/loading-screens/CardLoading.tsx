import React from "react";
import { Skeleton } from "../ui/skeleton";

interface Props {
  rows: number;
}

const CardLoading: React.FC<Props> = ({ rows }) => {
  const width = 100 / rows;

  const Rows = Array.from({ length: 2 }, (_, i) => {});

  return (
    <div className="bg-card p-5 rounded-md space-y-5">
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="flex w-full space-x-5">
          <Skeleton className="basis-1/3 h-5" />
          <Skeleton className="h-5 basis-2/3" />
        </div>
      ))}
    </div>
  );
};

export default CardLoading;
