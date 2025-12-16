import { NextRequest } from "next/server";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";
import { sql, or, eq, SQL } from "drizzle-orm";
import { AdvocateQuery } from "@/types/advocate";


export async function POST(request: NextRequest) {
  let data = advocateData;
  let body: AdvocateQuery = {};
  let page = 1;
  let pageSize = 10;
  try {
    body = await request.json();
  } catch (error) {
    console.error("Failed to parse request body:", error);
  }

  if (body.page && body.page > 0) {
    page = body.page;
  }
  if (body.pageSize && body.pageSize > 0) {
    pageSize = body.pageSize;
  }

  const conditions: (SQL | undefined)[] = [];
  if (body.firstName) {
    conditions.push(eq(advocates.firstName, body.firstName));
  }

  if (body.lastName) {
    conditions.push(eq(advocates.lastName, body.lastName));
  }

  if (body.city) {
    conditions.push(eq(advocates.city, body.city));
  }

  if (body.degree) {
    conditions.push(eq(advocates.degree, body.degree));
  }

  if (body.yearsOfExperience !== undefined) {
    conditions.push(eq(advocates.yearsOfExperience, body.yearsOfExperience));
  }

  if (body.specialties && body.specialties.length > 0) {
    const specialtyConditions = body.specialties.map((specialty) =>
      sql`JSON_CONTAINS(${advocates.specialties}, ${JSON.stringify(specialty)}, '$')`
    );
    conditions.push(or(...specialtyConditions));
  }

  try {
    data = await db.select().from(advocates)
      .limit(pageSize)
      .offset((page - 1) * pageSize)
      .where(conditions);
  } catch (error) {
    console.error("Database query failed:", error);

  }

  return Response.json({ data, page, pageSize });
}
