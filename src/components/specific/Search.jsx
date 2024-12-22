import { useInputValidation } from "6pp";
import { Search as SearchIcon } from '@mui/icons-material';
import { Dialog, DialogTitle, InputAdornment, List, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation } from "../../hooks/hook";
import { useLazySearchUserQuery, useSendFriendRequestMutation } from "../../store/api/api";
import { setIsSearch } from "../../store/reducers/misc";
import UserItems from "../shared/UserItem";



const Search = () => {
  const {isSearch} = useSelector((state) => state.misc)
  const dispatch = useDispatch()

  const [searchUser] = useLazySearchUserQuery()
  const [sendFriendRequest,isLoadingSendFriendRequest] = useAsyncMutation(useSendFriendRequestMutation)

  const [users,setUsers] = useState([])
  const search = useInputValidation("");

  const addFriendHandler = async (id) => {
    await sendFriendRequest("Sending Friend Request...",{userId:id})
  }
  const searchCloseHandler = () => dispatch(setIsSearch(false))

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value).then(({data}) => setUsers(data.users)).catch((err) => console.log(err))
    },500)
    return ()  => {
      clearTimeout(timeOutId)
    }
  }, [search.value])
  return (
    <Dialog open={isSearch} onClose={searchCloseHandler}>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"} >Find People</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment:(
              <InputAdornment position="start">
                <SearchIcon/>
              </InputAdornment>
            )
          }}
        ></TextField>
        <List>
          {users.map((user) => (
            <UserItems
              user={user}
              key={user._id}
              handler={addFriendHandler}
              handlerIsLoading={isLoadingSendFriendRequest}
              />
          ))}
        </List>


      </Stack>
    </Dialog>
  );
};

export default Search;
