"use client";

import { Advocate } from "@/types/advocate";

interface IAdvocateCardProps {
    advocate: Advocate
    innerRef?: (node?: Element | null | undefined) => void
}
export function AdvocateCard(props: IAdvocateCardProps) {
  return (
    <>
        <div ref={props.innerRef}>
            {props.advocate.firstName}
        </div>
        <div>{props.advocate.lastName}</div>
        <div>{props.advocate.city}</div>
        <div>{props.advocate.degree}</div>
        <div>
            {props.advocate.specialties.map((s) => (
            <div>{s}</div>
            ))}
        </div>
        <span>{props.advocate.yearsOfExperience}</span>
        <span>{props.advocate.phoneNumber}</span>
    </>
    )
}
