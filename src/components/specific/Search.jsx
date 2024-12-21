import { Dialog, DialogTitle, InputAdornment, List, ListItem, ListItemText, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useInputValidation } from "6pp";
import {Search as SearchIcon} from '@mui/icons-material'
import UserItems from "../shared/UserItem";
import { samepleUsers } from "../../constants/sampleData";
import { useDispatch, useSelector } from "react-redux";
import { setIsSearch } from "../../store/reducers/misc";



const Search = () => {
  const {isSearch} = useSelector((state) => state.misc)
  const dispatch = useDispatch()
  const [users,setUsers] = useState(samepleUsers)
  const search = useInputValidation("");

  let isLoadingSendFriendRequest = false;
  const addFriendHandler = (id) => {
    console.log(id)
  }
  const searchCloseHandler = () => dispatch(setIsSearch(false))
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
