import { Card, CardContent, Typography } from '@material-ui/core'
import React, {forwardRef} from 'react'
import './Message.css'


// forwardRef is an example of higher order function

const Message = forwardRef(({ message, userName }, ref) => {

    const isUser = userName === message.username

    return (
        <div ref={ref} className={`message ${isUser && 'message__user'}`}>
            <Card className={isUser ? 'message__userCard' : 'message__guestCard'}>
                <CardContent>
                    <Typography color='textPrimary' variant='h5' component='h2'>
                        {!isUser && `${message.username || "Unknown"}: `} {message.message}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
})

export default Message
