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
            {sortedItems.length > 0 && <>Search results:</>}{" "}
            {sortedItems.length === 0 && <>No results</>}
          </b>
        </p>
        {sortedItems
          .filter(
            (item) => item.difficulty === localStorage.getItem("diffValue")
          )
          .filter(
            (item) => item.location === localStorage.getItem("locationValue")
          )
          .map((item) => (
            <Result key={item.id} currentRoute={item} />
          ))}
      </div>
    </div>
  );
}
