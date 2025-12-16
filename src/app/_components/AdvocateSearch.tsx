"use client";

import useFetchAdvocates from "@/hooks/useFetchAdvocates";
import { Advocate, AdvocateResponse } from "@/types/advocate";
import { ChangeEvent, useEffect, useState } from "react";
import { AdvocateList } from "./AdvocateList";

interface IAdvocateSearchProps {
    advocates: AdvocateResponse
}
export function AdvocateSearch(props: IAdvocateSearchProps) {
  const [advocates, setAdvocates] = useState<Advocate[]>(props.advocates.data);

  const { ref, hasNextPage, pages, setFilters } = useFetchAdvocates(props.advocates.page);

  useEffect(() => {
    if (pages && pages.length > 0) {
      setAdvocates(prev => [...prev, ...pages.flatMap(p => p.data)])
    }
  }, [pages])

  
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setFilters({
      firstName: searchTerm,
      lastName: searchTerm,
      city: searchTerm,
      degree: searchTerm,
      //specialties: [searchTerm],
    });
  };

  return (
    <div>
      <div className="fixed top-0 z-1 bg-white">
      <h1 className="mt-10">Solace Advocates</h1>

      <div className="mt-2 inline-block bg-slate-500 p-6">
        <label htmlFor="search-input">Search:</label>
        <input id='search-input' className="border border-black ml-2" onChange={onChange} />
        <button className="border-2 ml-5 px-4" onClick={() => setFilters({})}>Reset Search</button>
      </div>

      <div className="mt-2 grid grid-cols-7 gap-4">
        <h3>First Name</h3>
        <h3>Last Name</h3>
        <h3>City</h3>
        <h3>Degree</h3>
        <h3>Specialties</h3>
        <h3>Years of Experience</h3>
        <h3>Phone Number</h3>
      </div>
      </div>

      <div className="mt-80">
        <AdvocateList advocates={advocates} hasNextPage={hasNextPage} innerRef={ref} />
      </div>
    </div>
  );
}
