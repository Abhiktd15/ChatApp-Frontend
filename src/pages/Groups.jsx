import React, { lazy, Suspense, useEffect, useState } from "react";
import {  useNavigate,useSearchParams } from "react-router-dom";
import {
  Backdrop,
  Box,
  Button,
  Dialog,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { matBlack } from "../constants/color";
import AvatarCard from '../components/shared/AvatarCard'
import {Link} from '../components/styles/StyledComponents'
import { samepleChats, samepleUsers } from "../constants/sampleData";
import UserItems from "../components/shared/UserItem";
const ConfirmDeleteDialog = lazy(()=> import('../components/dialogs/ConfirmDeleteDialog'))
const AddMemberDialog = lazy(()=> import('../components/dialogs/AddMemberDialog'))


const Groups = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const chatId = useSearchParams()[0].get('groups')
  const [groupName,setGroupName] = useState("") 
  const [groupNameUpdatedValue,setGroupNameUpdatedValue] = useState("")
  const [confirmDeleteDialog,setConfirmDeleteDialog] = useState(false)

  const [isEdit,setIsEdit] = useState(false);
  const isAddMember = false;

  const navigateBack = () => {
    navigate("/");
  };
  const handleMobile = () => {
    // open or close menu
    setIsMobileMenuOpen((prev) => !prev);
  };
  const handleMobileClose = () => {
    setIsMobileMenuOpen(false);
  };

  const updateGroupName = () => {
    setIsEdit(false);
    console.log('updateGroupName')
  }
  useEffect(() => {
    if(chatId){
      setGroupName(`Group name ${chatId}`)
      setGroupNameUpdatedValue("Group name")
    }
    return () => {
      setGroupName("")
      setGroupNameUpdatedValue("")
      setIsEdit(false)
    }
  },[chatId])

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true)
  }
  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false)
  }
  const openAddMember= () =>{
    
  }
  const deleteHandler = () => {
    closeConfirmDeleteHandler()
    console.log("deleteHandler")
  }

  const removeMemberHandler = (id) => {
    console.log("removeMemberHandler",id)
  }

  const IconBtns = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
          position: "fixed",
          right: "2rem",
          top: "2rem",
        }}
      >
        <IconButton onClick={handleMobile}>
          <MenuIcon />
        </IconButton>
      </Box>
      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            backgroundColor: matBlack,
            color: "white",
            //hover
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.7)",
              color: "white",
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );
  const GroupName = (
    <>
      <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} spacing={"1rem"} padding={"3rem"}>
        {isEdit ? 
          <>
            <TextField value={groupNameUpdatedValue} onChange={e => setGroupNameUpdatedValue(e.target.value)}/>
            <IconButton onClick={updateGroupName}>
              <DoneIcon/>
            </IconButton>
          </>
            :
          <>
            <Typography variant="h4">{groupName}</Typography>
            <IconButton onClick ={() => setIsEdit(true)}>
              <EditIcon/>
            </IconButton>
          </>
        }
      </Stack>
    </>
  )
  const ButtonGroup = (
      <Stack
        direction={{
          sm:"row",
          xs:"column-reverse"
        }}
        spacing={"2rem"}
        p={{
          sm:"1rem",
          xs:"0",
          md:"1rem 4rem"
        }}
      >
        <Button size="large" color="error" startIcon={<DeleteIcon/>} onClick={openConfirmDeleteHandler}>Delete Group</Button>
        <Button size="large" variant="contained" startIcon={<AddIcon/>} onClick={openAddMember}>Add Member</Button>
      </Stack>
)
  return (
    <Grid container height={"100vh"}>
      <Grid
        item
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
        bgcolor={"bisque"}
        sm={4}
        
      >
        <GroupList myGroups={samepleChats} chatId={chatId}/>
      </Grid>

      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          padding: "1rem 5rem",
          alignItems: "center",
        }}
      >
        {IconBtns}

        {/* //GroupName. */}
        {groupName && 
          <>
            {GroupName}
            <Typography margin={"2rem"} alignSelf={"flex-start"} variant="body1">Members</Typography>
            <Stack 
              maxWidth={"45rem"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={{
                sm:"1rem",
                xs:"0",
                md:"1rem 4rem"
              }}
              spacing={"2rem"}
              height={'50vh'}
              overflow={"auto"}
            >
              {/* Members */}
              {
                samepleUsers.map((i) => (
                  <UserItems user={i} isAdded key={i._id} styling={{
                      boxShadow :"0 0 0.5rem rgba(0,0,0,0.2)",
                      padding:"1rem 2rem",
                      borderRadius :"1rem"
                    }} 
                    handler={removeMemberHandler}
                  />
                ))
              }
            </Stack>
            {ButtonGroup}
          </>
        }
      </Grid>
        {/* Add Member dialog */}
        {isAddMember && 
          <Suspense fallback={<Backdrop open/>}>
            <AddMemberDialog/>
          </Suspense>
        }

      {/* DeletDIalog */}
        {
          confirmDeleteDialog && <>
            <Suspense fallback={<Backdrop open/>}>
              <ConfirmDeleteDialog open={confirmDeleteDialog} handleClose={closeConfirmDeleteHandler} deleteHandler={deleteHandler}/>
            </Suspense>
          </>
        }


      {/* Mobile Dropdown Menu */}
      <Drawer
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
      >
        <GroupList myGroups={samepleChats} chatId={chatId} w={"50vw"} />
      </Drawer>
    </Grid>
  );
};

const GroupList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack width={w} sx={{
    height:'100vh',
    overflow: 'auto',
  }}>
    {myGroups.length > 0 ? (
      myGroups.map((group) => <GroupListItem group={group} chatId={chatId} key={group._id} />)
    ) : (
      <Typography textAlign={"center"} padding="1rem">
        NO Groups
      </Typography>
    )}
  </Stack>
);
const GroupListItem = ({ group, chatId }) => {
  const { name, avatar, _id } = group;
  return <Link to={`?groups=${_id}`} onClick={e => {
    if(chatId === _id) e.preventDefault();
    
  }}>
    <Stack
      direction={"row"}
      spacing={"1rem"}
      alignItems={"center"}
    >
      <AvatarCard avatar={avatar}/>
      <Typography>{name}</Typography>
    </Stack>
  </Link>
};

export default Groups;