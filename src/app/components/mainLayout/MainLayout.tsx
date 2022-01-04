import { matchPath, Outlet, NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import LogoWord from '../../../logo.svg';
import {
    MdMenu,
    MdCloudUpload,
    MdPeopleAlt,
    MdStar,
    MdStorage,
} from 'react-icons/md';
import { useState } from 'react';
import { PathPattern } from 'react-router';
import { IconType } from 'react-icons';
import './MainLayout.css';

const navList: (PathPattern<string> & { title: string; icon: IconType })[] = [
    {
        title: 'My Drive',
        icon: MdCloudUpload,
        path: '/',
        end: true,
    },
    {
        title: 'Shared with me',
        icon: MdPeopleAlt,
        path: '/shared',
        end: false,
    },
    {
        title: 'Starred',
        icon: MdStar,
        path: '/starred',
        end: false,
    },
];

export default function MainLayout() {
    const location = useLocation();
    const [isSideNavShow, setIsSideNavShow] = useState(false);

    const sideNavClasses = classNames(
        {
            '-translate-x-full': !isSideNavShow,
        },
        'absolute',
        'z-20',
        'left-0',
        'top-0',
        'h-screen',
        'transition-transform',
        'bg-white',
        'shadow',
        'md:relative',
        'md:translate-x-0'
    );

    const backdropClasses = classNames(
        {
            'opacity-50': isSideNavShow,
            'opacity-0': !isSideNavShow,
            visible: isSideNavShow,
            invisible: !isSideNavShow,
        },
        'absolute',
        'z-10',
        'inset-0',
        'bg-gray-200',
        'transition-opacity',
        'md:hidden'
    );

    const toggleSideNav = () => {
        setIsSideNavShow(!isSideNavShow);
    };

    const matchNavItem = (pattern: string | PathPattern<string>) =>
        matchPath(pattern, location.pathname);

    return (
        <div className="relative min-h-screen pt-[56px] md:pt-0 md:flex">
            <div className={backdropClasses} onClick={toggleSideNav}></div>
            <div className={sideNavClasses}>
                <div className="flex flex-col w-[230px] h-full py-8">
                    <div className="flex justify-center px-6">
                        <LogoWord className="mb-7 w-[100px]" />
                    </div>
                    <ul>
                        {navList.map((item, index) => (
                            <li key={index}>
                                <NavLink
                                    to={item.path}
                                    onClick={() => setIsSideNavShow(false)}
                                    className={({ isActive }) =>
                                        classNames(
                                            'flex items-center px-6 py-3 font-bold transition-colors',
                                            {
                                                'bg-yellow-400': isActive,
                                                'hover:bg-yellow-400/50':
                                                    !isActive,
                                            }
                                        )
                                    }
                                >
                                    <item.icon className="mr-3 text-xl"></item.icon>
                                    <span>{item.title}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <div className="flex-grow"></div>
                    <div className="flex px-6">
                        <div className=" flex justify-center mr-2 h-[24px] w-[24px]">
                            <MdStorage className="text-lg mt-[2px]"></MdStorage>
                        </div>
                        <div className="flex-grow">
                            <p className="font-bold mb-1">Storage</p>
                            <div className="h-[5px] bg-gray-200 mb-2">
                                <div className="h-full w-[50%] bg-yellow-400"></div>
                            </div>
                            <p className="text-gray-400 text-xs">
                                7.9 GB of 15 GB used
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <header className="absolute top-0 left-0 right-0 flex items-center h-[56px] bg-gray-200 md:hidden">
                <button className="px-[16px]" onClick={toggleSideNav}>
                    <MdMenu className="text-2xl"></MdMenu>
                </button>
                <span className="font-bold">
                    {navList.find((item) => matchNavItem(item))?.title}
                </span>
            </header>
            <main className="main-layout-content">
                <Outlet></Outlet>
            </main>
        </div>
    );
}
