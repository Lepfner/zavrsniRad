import React from "react";
import Result from "../Molecules/Result";

export default function Results({ items }) {
  const sortArrayOfObjects = (arr, propertyName, order = "ascending") => {
    const sortedArr = arr.sort((a, b) => {
      if (a[propertyName] < b[propertyName]) {
        return -1;
      }
      if (a[propertyName] > b[propertyName]) {
        return 1;
      }
      return 0;
    });
    if (order === "descending") {
      return sortedArr.reverse();
    }
    return sortedArr;
  };

  const sortedItems = sortArrayOfObjects(items, "stars", "descending");

  return (
    <div>
      <div className="shadow-lg rounded-md bg-slate-200 w-full mt-6 h-full px-4 py-2">
        <p className="mb-4 text-xl">
          <b>
            {sortedItems.length} {sortedItems.length === 1 && <>Result</>}{" "}
            {sortedItems.length !== 1 && <>Results</>}
          </b>
        </p>
        {sortedItems.map((item) => (
          <Result item={item} />
        ))}
        <Result />
        <Result />
        <Result />
        <Result />
        <Result />
      </div>
    </div>
  );
}
