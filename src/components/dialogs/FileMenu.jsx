import { Menu } from '@mui/material'
import React from 'react'

const FileMenu = ({anchorE1}) => {
    return (
        <Menu open={false}  anchorEl={anchorE1}>
            <div style={{width:"10rem"}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing, sed do eiusmod tempor incididunt ut labore et, consectetur adip
            </div>
        </Menu>
    )
}

export default FileMenu