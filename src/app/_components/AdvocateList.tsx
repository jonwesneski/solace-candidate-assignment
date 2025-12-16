"use client";

import { Advocate } from "@/types/advocate";
import { AdvocateCard } from "./AdvocateCard";

interface IAdvocateListProps {
    advocates: Advocate[]
    innerRef: (node?: Element | null | undefined) => void
    hasNextPage: boolean
}
export function AdvocateList(props: IAdvocateListProps) {

  return (
    <div className="grid grid-cols-7 gap-4">
        {props.advocates?.map((advocate, index) => {
        return (
            <AdvocateCard 
               advocate={advocate} 
               innerRef={
                props.advocates.length - index < 3 && props.hasNextPage
                 ? props.innerRef
                 : undefined}
            />
        );
        })}
    </div>
  );
}
