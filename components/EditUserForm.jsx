"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState, useEffect, useContext } from "react";
import Icon from "@mdi/react";
import { mdiImageEdit } from "@mdi/js";
import {
  // Card,
  Input,
  // Checkbox,
  Button,
  // Textarea,
  // Typography,
} from "@material-tailwind/react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: " solid #f2f2f2",
  boxShadow: 3,
  p: 4,
};
const EditUserForm = ({ item }) => {
  const ApiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = useState("");


useEffect(()=>{
  setName(item.name)
},[item])

  const showSuccessAlert = (message) => {
    Swal.fire({
      title: message,
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${ApiUrl}/users/${item.userid}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name}),
      });

      if (!res.ok) {
        throw new Error("Failed to update topic");
      }
      // router.push(`/adduser?page=1&limit=${limit}`);
      router.refresh()
      handleClose();
      showSuccessAlert("Done")
    } catch (error) {
      console.log(error);
    }
  };

  return (

    <>
         <Icon
        onClick={handleOpen}
        color={"blue"}
        size={1.5}
        path={mdiImageEdit}

      />
  
    <div className="">


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit} className="  ">
            <div className="mb-4 flex flex-col gap-6">
              <Input
                size="lg"
                type="text"
                name="name"
                label="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
   
            </div>

            <br></br>
            <div className="flex justify-between">
              <Button
                type="submit"
                className=" w-28 border-solid border-[#E8AA42] border-2 text-[#E8AA42] hover:bg-[#E8AA42] hover:text-[#ffffff]"
                variant="text"
              >
                Edit
              </Button>
              <Button
                className=" w-28 border-solid border-[#7C9070] border-2 text-[#7C9070] hover:bg-[#7C9070] hover:text-[#ffffff]"
                variant="text"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
    </>
  );
};

export default EditUserForm;
