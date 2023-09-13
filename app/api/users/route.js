// route.js
import { NextResponse } from "next/server";
import { getDatabase, closeDatabase } from "@/libs/db";

export async function GET(request) {
  const currentPage = parseInt(request.nextUrl.searchParams.get("page"));
  const limit = parseInt(request.nextUrl.searchParams.get("limit"));
  let db;
  try {
     db = getDatabase();

    const offset = (currentPage - 1) * limit;

    const query = `
      SELECT * FROM users
      LIMIT $1
      OFFSET $2
    `;

    const users = await db.any(query, [limit, offset]);

    const countQuery = "SELECT COUNT(*) FROM users";
    const { count } = await db.one(countQuery);

    return NextResponse.json({ users, count });
  } catch (error) {
    if (db) {
      closeDatabase(); 
    }
    console.error("Error fetching users:", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }finally {
    if (db) {
      closeDatabase(); 
    }
  }
}


export async function POST(request) {
  let db;
  try {
     db = getDatabase();
    const { userName } = await request.json();
    const newUser = await db.one(
      "INSERT INTO users(name) VALUES($1) RETURNING *",
      userName
    );
    return NextResponse.json({ newUser }, { status: 201 });
  } catch (error) {
    console.error("Error adding user:", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }  finally {
    if (db) {
      closeDatabase(); 
    }
  }
}
