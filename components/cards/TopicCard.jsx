"use client";
import { Card } from "@material-tailwind/react";
import React from "react";
import EditProductForm from "../products/EditProductForm";
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';
//redux//
import { useSelector, useDispatch } from 'react-redux';
import {fetchTopicsItems} from "@/app/GlobalRedux/actions/getTopics"
import Link from "next/link";
//redux//
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const TopicCard = ({ topics }) => {
       //redux//
       const dispatch = useDispatch();
       //redux//
  const handleDelete = async (id)=>{

      const confirmed = confirm("Are you sure?");
  
      if (confirmed) {
        const res = await fetch(`${NEXT_PUBLIC_API_URL}/topics?id=${id}`, {
          method: "DELETE",
        });
  
        if (res.ok) {
          dispatch(fetchTopicsItems())
        }
      }

  }

  return (
    <>
      {topics?.map((topic) => {
        return (
          <>
           {/* <Link href={`/topics/${topic._id}`}> */}
         
          <Card key={topic._id}
          className="hover:scale-105 cursor-pointer"
           >
            <div className=" w-full flex justify-around">

            <Icon path={mdiDelete}  onClick={()=>handleDelete(topic._id)} color={"red"} size={1.5}/>
            <EditProductForm item={topic} />
            </div>
            <h1>{topic.description}</h1>
            <h1>{topic.title}</h1>
            <h1>{topic._id}</h1>
          </Card>
          {/* </Link> */}
          </>
        );
      })}
    </>
  );
};

export default TopicCard;
