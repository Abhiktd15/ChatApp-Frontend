import { Button, Dialog, DialogTitle, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { samepleUsers} from '../../constants/sampleData'
import UserItems from '../shared/UserItem'

const AddMemberDialog = ({addMember,isLoadingAddMember,chatId}) => {
  const [members,setMembers] = useState(samepleUsers)
  const [selectedMembers,setSelectedMembers] = useState([])

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) => prev.includes(id) ? prev.filter((currElement) => currElement !== id) : [...prev,id])
  };
  

  const addMemberSubmitHandler = () => {
    closeHandler()
  }
  const closeHandler = () => {
    setSelectedMembers([])
    setMembers([]);
  }
  return (
    <Dialog open onClose={closeHandler}>
      <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
        <Stack spacing={"1rem"}>
          {
            members.length>0 ? members.map((user) => (
              <UserItems key={user._id} user={user} handler={selectMemberHandler} isAdded={selectedMembers.includes(user._id)}/>
            )):
            <Typography textAlign={"center"} p>No Friends</Typography>
          }
        </Stack>
        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-evenly"}>
          <Button onClick={closeHandler} color='error'>Cancel</Button>
          <Button onClick={addMemberSubmitHandler} disabled={isLoadingAddMember} variant='contained'>Add Member</Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default AddMemberDialog