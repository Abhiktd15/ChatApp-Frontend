import {
  Button,
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { samepleUsers } from "../../constants/sampleData";
import UserItems from "../shared/UserItem";
import { useInputValidation } from "6pp";

const NewGroup = () => {
  const groupName = useInputValidation("")
  
  const [members,setMembers] = useState(samepleUsers)
  const [selectedMembers,setSelectedMembers] = useState([])

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) => prev.includes(id) ? prev.filter((currElement) => currElement !== id) : [...prev,id])
  };
  const submitHandler = () => {

  }
  const closeHandler = () => {

  }

  return (
    <Dialog open onClose={closeHandler}>
      <Stack
        p={{
          xs: "1rem",
          sm: "3rem",
        }}
        width={"25rem"}
        spacing={'2rem'}
      >
        <DialogTitle variant="h4" textAlign={"center"}>New Group</DialogTitle>
        <TextField 
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
        />
        <Typography variant="body1">members</Typography>
        <Stack>
          {samepleUsers.map((i) => (
            <UserItems user={i} key={i._id} handler={selectMemberHandler} isAdded={selectedMembers.includes(i._id)} />
          ))}
        </Stack>

        <Stack direction={"row"} justifyContent={"space-between"}>
          <Button variant="contained" color="error" size="large"  >Cancel</Button>
          <Button variant="contained" size="large" onClick={submitHandler}>Create</Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
