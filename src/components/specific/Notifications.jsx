import { Avatar, Button, Dialog, DialogTitle, ListItem, Skeleton, Stack, Typography } from '@mui/material'
import React from 'react'
import { sampleNotifications } from '../../constants/sampleData'
import { useAcceptFriendRequestMutation, useGetNotificationsQuery } from '../../store/api/api'
import { useErrors } from '../../hooks/hook'
import { useDispatch, useSelector } from 'react-redux'
import { setIsNotification } from '../../store/reducers/misc'
import toast from 'react-hot-toast'

const Notifications = () => {
  const dispatch = useDispatch()
  const {isNotification} = useSelector((state) => state.misc)
  
  const {isLoading,data,error,isError} = useGetNotificationsQuery()
  const [acceptRequest] = useAcceptFriendRequestMutation()

  const friendRequestHandler = async ({_id,accept}) => {
    dispatch(setIsNotification(false))
    try {
      const res  = await acceptRequest({requestId:_id,accept})
      if(res.data?.success){
        console.log("Use SOcket here ")
        toast.success(res.data.message)
      }
      else{
        toast.error(res.data?.error || "Something went wrong")
      }
    } catch (error) {
      toast.error("Something went wrong")
      console.log(error);
      
    }
  }
  const onCloseHandler = () => dispatch(setIsNotification(false))
  useErrors([{error,isError}])

  return (
    <Dialog open={isNotification} onClose={onCloseHandler}>
      <Stack 
        p={{
          xs:"1rem",sm:"2rem"
        }}
        maxWidth={"25rem"}
      >
        <DialogTitle>
          Notifications
        </DialogTitle>
        {
          isLoading ? <Skeleton/>:<>
            {
              data?.requests?.length>0 ? 
              ( data?.requests?.map(({sender,_id}) => <NotificationItem key={_id} sender={sender} _id={_id} handler={friendRequestHandler} />)) 
                :
              <Typography textAlign={"center"}>0 Notifications</Typography>
            }
          </>
        }
      </Stack>
    </Dialog>
  )
}

const NotificationItem = ({sender,_id,handler}) => {
  const {name,avatar} = sender;
  return(
    <ListItem>
            <Stack
                direction={"row"}
                alignItems={"center"}
                spacing={"1rem"}
                width={"100%"}
            >
                <Avatar/>
                <Typography
                    variant='body1'
                    sx={{
                        flexGrow:1,
                        display:"-webkit-box",
                        WebkitLineClamp:1,
                        WebkitBoxOrient:"vertical",
                        overflow:"hidden",
                        textOverflow:"ellipsis",
                        width:"100%",
                    }}
                >
                    {`${name} sent you a friend request.}`}
                </Typography>

                <Stack direction={{
                  xs:"column",
                  sm:"row"
                }}>
                  <Button onClick={() => handler({_id,accept:true})}>Accept</Button>
                  <Button color='error' onClick={() => handler({_id,accept:false})}>Reject</Button>
                </Stack>
            </Stack>
        </ListItem>
  )
}


export default Notifications
