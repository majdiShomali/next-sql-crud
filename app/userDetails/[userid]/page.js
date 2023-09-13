import React from 'react'
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const getUsers = async (userId) => {
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_API_URL}/users/${userId}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error loading users: ", error);
  }
};
const userDetails = async({params}) => {
  const userId = params.userid
  const { user } =await getUsers(userId);
  return (
    <div>{user.name}</div>
  )
}

export default userDetails