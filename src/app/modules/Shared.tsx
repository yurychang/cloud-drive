import {
    MdArrowDownward,
    MdFolder,
    MdInfo,
    MdOutlineStarOutline,
    MdPeopleAlt,
} from 'react-icons/md';
import AreaHeader from '@components/AreaHeader';
import FileCard from '@components/FileCard';
import FolderCard from '@components/FolderCard';
import ViewModeBtn, { changeViewMode } from '@components/ViewModeBtn';
import { useState } from 'react';
import { ViewMode } from '@custom-types/view-mode';
import { Container } from 'react-bootstrap';
import IconBtn from '@components/IconBtn';
import SortBtn from '@components/SortBtn';

export default function Shared() {
    const [viewMode, setViewMode] = useState<ViewMode>('list');

    return (
        <Container className="px-8 pb-8 overflow-hidden">
            <section>
                <div className="flex my-5">
                    <AreaHeader
                        Icon={MdPeopleAlt}
                        title="Shared with me"
                    ></AreaHeader>
                    <div className="flex-grow"></div>
                    <ViewModeBtn
                        mode={viewMode}
                        onClick={() => setViewMode(changeViewMode(viewMode))}
                    ></ViewModeBtn>
                </div>
            </section>
            <div>
                <div className="hidden md:block">
                    <div className="flex p-3 font-bold leading-[34px]">
                        <div className="w-[40px]"></div>
                        <div className="px-2 flex-grow flex items-center">
                            Name
                            <SortBtn asc={true} className="text-lg"></SortBtn>
                        </div>
                        <div className="px-2 w-[170px] flex-shrink-0">
                            Last modified
                        </div>
                        <div className="px-2 w-[120px]">Owner</div>
                        <div className="px-2 w-[120px]">Size</div>
                    </div>
                </div>
                <div className="py-1">
                    <div className="flex items-center p-3 bg-white rounded">
                        <div className="px-2 flex-shrink-0">
                            <MdFolder className="text-2xl"></MdFolder>
                        </div>
                        <div className="px-2 flex-grow truncate">business</div>
                        <div className="hidden md:block px-2 w-[170px] flex-shrink-0">
                            2019/09/02
                        </div>
                        <div className="hidden md:block px-2 w-[120px] truncate">
                            Me
                        </div>
                        <div className="hidden md:block px-2 w-[120px] truncate">
                            1.33 GB
                        </div>
                        <MdInfo className="text-xl md:hidden"></MdInfo>
                    </div>
                </div>
                <div className="py-1">
                    <div className="flex p-3 bg-white rounded">
                        <div className="px-2 flex-shrink-0">
                            <MdFolder className="text-2xl"></MdFolder>
                        </div>
                        <div className="px-2 flex-grow truncate">business</div>
                        <div className="hidden md:block px-2 w-[170px] flex-shrink-0">
                            2019/09/02
                        </div>
                        <div className="hidden md:block px-2 w-[120px] truncate">
                            Me
                        </div>
                        <div className="hidden md:block px-2 w-[120px] truncate">
                            1.33 GB
                        </div>
                        <MdInfo className="text-xl md:hidden"></MdInfo>
                    </div>
                </div>
                <div className="py-1">
                    <div className="flex p-3 bg-white rounded">
                        <div className="px-2 flex-shrink-0">
                            <MdFolder className="text-2xl"></MdFolder>
                        </div>
                        <div className="px-2 flex-grow truncate">business</div>
                        <div className="hidden md:block px-2 w-[170px] flex-shrink-0">
                            2019/09/02
                        </div>
                        <div className="hidden md:block px-2 w-[120px] truncate">
                            Me
                        </div>
                        <div className="hidden md:block px-2 w-[120px] truncate">
                            1.33 GB
                        </div>
                        <MdInfo className="text-xl md:hidden"></MdInfo>
                    </div>
                </div>
            </div>
        </Container>
    );
}
