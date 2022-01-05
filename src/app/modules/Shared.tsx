import { MdFolder, MdInfo, MdPeopleAlt } from 'react-icons/md';
import AreaHeader from '@components/AreaHeader';
import ViewModeBtn, { changeViewMode } from '@components/ViewModeBtn';
import { useState } from 'react';
import { ViewMode } from '@custom-types/viewMode';
import SortBtn from '@components/SortBtn';
import List from '@components/List';

export default function Shared() {
    const [viewMode, setViewMode] = useState<ViewMode>('list');

    return (
        <div className="px-8 pb-8 overflow-hidden">
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
            <List>
                <List.Header className="hidden md:flex leading-[34px]">
                    <div className="px-2 flex-grow flex items-center">
                        Name
                        <SortBtn asc={true} className="text-lg"></SortBtn>
                    </div>
                    <div className="px-2 w-[170px] flex-shrink-0">
                        Last modified
                    </div>
                    <div className="px-2 w-[120px]">Owner</div>
                    <div className="px-2 w-[120px]">Size</div>
                </List.Header>
                <List.Body>
                    <List.Row>
                        <List.Col>
                            <MdFolder className="text-2xl"></MdFolder>
                        </List.Col>
                        <List.Col className="flex-grow">business</List.Col>
                        <List.Col className="w-[170px] hidden md:block">
                            2019/09/02
                        </List.Col>
                        <List.Col className="w-[120px] hidden md:block">
                            Me
                        </List.Col>
                        <List.Col className="w-[120px] hidden md:block">
                            1.33 GB
                        </List.Col>
                        <List.Col className="md:hidden">
                            <MdInfo className="text-xl my-[2px]"></MdInfo>
                        </List.Col>
                    </List.Row>
                    <List.Row>
                        <List.Col>
                            <MdFolder className="text-2xl"></MdFolder>
                        </List.Col>
                        <List.Col className="flex-grow">business</List.Col>
                        <List.Col className="w-[170px] hidden md:block">
                            2019/09/02
                        </List.Col>
                        <List.Col className="w-[120px] hidden md:block">
                            Me
                        </List.Col>
                        <List.Col className="w-[120px] hidden md:block">
                            1.33 GB
                        </List.Col>
                        <List.Col className="md:hidden">
                            <MdInfo className="text-xl my-[2px]"></MdInfo>
                        </List.Col>
                    </List.Row>
                    <List.Row>
                        <List.Col>
                            <MdFolder className="text-2xl"></MdFolder>
                        </List.Col>
                        <List.Col className="flex-grow">business</List.Col>
                        <List.Col className="w-[170px] hidden md:block">
                            2019/09/02
                        </List.Col>
                        <List.Col className="w-[120px] hidden md:block">
                            Me
                        </List.Col>
                        <List.Col className="w-[120px] hidden md:block">
                            1.33 GB
                        </List.Col>
                        <List.Col className="md:hidden">
                            <MdInfo className="text-xl my-[2px]"></MdInfo>
                        </List.Col>
                    </List.Row>
                </List.Body>
            </List>
        </div>
    );
}
