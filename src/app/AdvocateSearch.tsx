"use client";

import useFetchAdvocates from "@/hooks/useFetchAdvocates";
import { Advocate, AdvocateResponse } from "@/types/advocate";
import { ChangeEvent, useEffect, useState } from "react";

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
      specialties: [searchTerm],
    });
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term"></span>
        </p>
        <input style={{ border: "1px solid black" }} onChange={onChange} />
        <button onClick={() => setFilters({})}>Reset Search</button>
      </div>
      <br />
      <br />
      <table ref={ref}>
        <thead>
          <th>First Name</th>
          <th>Last Name</th>
          <th>City</th>
          <th>Degree</th>
          <th>Specialties</th>
          <th>Years of Experience</th>
          <th>Phone Number</th>
        </thead>
        <tbody>
          {advocates?.map((advocate, index) => {
            return (
              <tr ref={advocates.length - index < 3 && hasNextPage ? ref : undefined}>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s) => (
                    <div>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
            })}
        </tbody>
      </table>
    </main>
  );
}
