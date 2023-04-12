import React from "react";
import Result from '../Molecules/Result';

export default function Results({items}) {
  return (
    <div>
    <div className="shadow-lg rounded-md bg-slate-200 w-full mt-6 h-full px-4 py-2">
      <p className="mb-4 text-xl"><b>5 Results</b></p>
      <Result/>
      <Result/>
      <Result/>
      <Result/>
      <Result/>
    </div>
    </div>
  );
}
