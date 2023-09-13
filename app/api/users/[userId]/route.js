// route.js
import { NextResponse } from "next/server";
import { getDatabase, closeDatabase } from "@/libs/db"; // Adjust the import path accordingly

export async function GET(request, { params }) {
  const { userId } = params
  try {
    const db = getDatabase(); 
    
    const query = 'SELECT * FROM users WHERE userid = $1';
    const user = await db.oneOrNone(query, userId);
    if (user) {
      return NextResponse.json({ user });
    } else {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ message: error }, { status: 500 });
  } finally {
    closeDatabase(); 
  }
}

export async function PUT(request, { params }) {

try {
  const db = getDatabase(); 

  const { userId } = params;
  const { name: name} = await request.json();

  const checkQuery = 'SELECT * FROM users WHERE userid = $1';
  const existingUser = await db.oneOrNone(checkQuery, userId);

  if (!existingUser) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }


  const updateQuery = 'UPDATE users SET name = $1 WHERE userid = $2';
 const user= await db.none(updateQuery, [name, userId]);
 return NextResponse.json({ user });
} catch (error) {
  console.error("Error fetching user:", error);
  return NextResponse.json({ message: error }, { status: 500 });
}finally {
  closeDatabase(); 
}



}

