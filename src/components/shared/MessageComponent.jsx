import { Box, Typography } from '@mui/material';
import React, { memo } from 'react'
import { lightBlue } from '../../constants/color';
import moment from 'moment';
import { fileFormat } from '../../lib/features';
import RenderAttachment from './RenderAttachment';

const MessageComponent = ({message,user}) => {
    const {sender,content,attachments=[],createdAt} = message;
    const sameSender = sender?._id === user?._id;
    const timeAgo = moment(createdAt).fromNow();
    return (
        <div style={{
            alignSelf: sameSender? 'flex-end':'flex-start',
            maxWidth:"50%"
        }}>
            {
                    !sameSender && 
                    <Typography color={lightBlue} fontWeight={'600'} variant='body2' px={"1rem"}>
                        {sender.name}
                    </Typography>
                }
            <div
                style={{
                    backgroundColor:sameSender?'#25D366':"#808080",
                    color:"white",
                    fontWeight:"bold",
                    fontSize:"1rem",
                    borderRadius:"15px",
                    padding:"0.5rem 0.5rem 1rem 0.5rem ",
                    width:"fit-content",
                    position:'relative'
                }}
            >
                
                {content && <Typography>
                        {content}
                    </Typography>
                }
                {/* Attachments  */}
                {
                    attachments.length>0 && attachments.map((attachment,index) => {
                        const url = attachment.url
                        const file = fileFormat(url)
                        return (
                            <Box key={index}>
                                <a href={url} target='_blank' download style={{color:'black'}}>
                                    {RenderAttachment(file,url)}
                                </a>
                            </Box>
                        )
                    })
                }
                <Typography variant='caption' position={'absolute'} right={'0.5rem'} bottom={"0.1rem"} color={"text.secondary"}>{timeAgo}</Typography>
            </div>
        </div>
    )
}
const MessageComp = memo(MessageComponent)
export default MessageComp