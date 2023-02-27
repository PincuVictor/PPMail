import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as RiIcons from 'react-icons/ri'

export const SidebarData = [
    {
        title: 'Compose',
        path: '/compose',
        icon:<AiIcons.AiOutlinePlus />,
        cName: 'nav-text'
    },

    {
        title: 'Inbox',
        path: '/inbox',
        icon:<FaIcons.FaInbox />,
        cName: 'nav-text'
    },
    
    {
        title: 'Favourites',
        path: '/favourites',
        icon:<AiIcons.AiOutlineStar />,
        cName: 'nav-text'
    },
    
    {
        title: 'Sent',
        path: '/sent',
        icon:<FaIcons.FaRegPaperPlane />,
        cName: 'nav-text'
    },
    
    {
        title: 'Drafts',
        path: '/drafts',
        icon:<RiIcons.RiDraftLine />,
        cName: 'nav-text'
    },
    
    {
        title: 'Trash Bin',
        path: '/trash',
        icon:<FaIcons.FaTrashAlt />,
        cName: 'nav-text'
    },
    
]