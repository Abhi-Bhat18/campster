import React from "react";
import { Skeleton } from "../ui/skeleton";

interface Props {
  columns: number;
}

const TableLoading: React.FC<Props> = ({ columns }) => {
  const width = 100 / columns;

  const Columns = Array.from({ length: columns }, (_, i) => {
    return <Skeleton key={i} className="h-6" style={{ width: `${width}%` }} />;
  });

  return (
    <div className="space-y-2 w-full">
      {Array.from({ length: 10 }, (_, i) => (
        <div className="space-x-2 flex items-center" key={i}>
          {Columns}
        </div>
      ))}
    </div>
  );
};

export default TableLoading;
