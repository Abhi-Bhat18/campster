import React from 'react'
import { ToggleTheme } from '../navbar/ToggleTheme'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IconBellRinging } from '@tabler/icons-react'
import { Input } from '../ui/input'

const TopBar = () => {
    return (
        <div className='w-full sticky top-0 border-b-[1px] border-secondary p-5 flex justify-between items-center'>
            <div>
                <Input type='text' className='w-80' placeholder='Search for projects, campaigns...' />
            </div>
            <div className='flex space-x-5 items-center'>
                <IconBellRinging />
                <ToggleTheme />
                <div className='flex items-center space-x-2'>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                        <p>Abhishek Bhat</p>
                        <p>Manager</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopBar