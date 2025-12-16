
import { AdvocateResponse } from "@/types/advocate";
import { AdvocateSearch } from "./_components/AdvocateSearch";

export default async function Home() {

  const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:${process.env.PORT ?? 3000}`;
   const response = await fetch(new URL('/api/advocates', baseUrl), { 
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
        })
  const data =(await response.json()) as AdvocateResponse;

  return (
    <AdvocateSearch advocates={data} />
  );
}
