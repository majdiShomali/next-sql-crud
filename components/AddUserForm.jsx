"use client"

import { Button } from "@material-tailwind/react"
import { useState } from "react"
import { useRouter } from "next/navigation";

const NEXT_PUBLIC_API_URL=process.env.NEXT_PUBLIC_API_URL
const AddUserForm = ({limit}) => {
  const router = useRouter();

    const [userName,setUserName]=useState("")

    const handleSubmit = async(e)=>{
      e.preventDefault()
      
      try {
        const res = await fetch(`${NEXT_PUBLIC_API_URL}/users`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ userName }),
        });
  
        if (res.ok) {
          router.push(`/adduser?page=1&limit=${limit}`);
          router.refresh()
        } else {
          throw new Error("Failed to create a topic");
        }
      } catch (error) {
        console.log(error);
      }



    }
  return (
    <form onSubmit={handleSubmit}>
    <input required
     type="text"
     className="border-2 mr-2"
      onChange={(e)=>{setUserName(e.target.value)}}
      placeholder="User Name"
      />
     <Button type="submit">Add User</Button>
    </form>
  )
}

export default AddUserForm