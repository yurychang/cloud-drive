import { useEffect, useState } from 'react';
import {
    MdOutlineAccessTimeFilled,
    MdCloudUpload,
    MdInfo,
    MdFolder,
} from 'react-icons/md';
import { ViewMode } from '@custom-types/viewMode';
import AreaHeader from '@components/AreaHeader';
import FileCard from '@components/FileCard';
import FolderCard from '@components/FolderCard';
import ViewModeBtn, { changeViewMode } from '@components/ViewModeBtn';
import SortBtn from '@components/SortBtn';
import { CloudObject } from '@custom-types/object';
import List from '@components/List';

const myDriveApi: CloudObject[] = Array.from({ length: 12 }, (v, k) => ({
    id: k,
    type: k % 2 === 0 ? 'folder' : 'file',
    name: k % 2 === 0 ? `Folder ${k}` : `file ${k}`,
    starred: k % 2 === 0,
    size: Math.floor(Math.random() * 1000) / 10,
    owner: 'me',
    updateTime: new Date().toISOString(),
    path: '',
}));

export default function Dashboard() {
    const [viewMode, setViewMode] = useState<ViewMode>('card');
    const [myDriveData, setMyDriveData] = useState<CloudObject[]>([]);
    const myFolderList = myDriveData.filter((item) => item.type === 'folder');
    const myFileList = myDriveData.filter((item) => item.type !== 'folder');

    useEffect(() => {
        setMyDriveData(myDriveApi);
    }, [myDriveData]);

    return (
        <div className="px-8 py-8 overflow-hidden">
            <section>
                <AreaHeader
                    Icon={MdOutlineAccessTimeFilled}
                    title="Recent"
                ></AreaHeader>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    <div>
                        <FileCard
                            type="file"
                            name="sdf adfas asdfsaas sdfasf"
                        ></FileCard>
                    </div>
                    <div>
                        <FileCard
                            type="file"
                            name="sdf adfas asdfsaas sdfasf"
                        ></FileCard>
                    </div>
                    <div>
                        <FileCard
                            type="file"
                            name="sdf adfas asdfsaas sdfasf"
                        ></FileCard>
                    </div>
                    <div>
                        <FileCard
                            type="file"
                            name="sdf adfas asdfsaas sdfasf"
                        ></FileCard>
                    </div>
                </div>
            </section>
            <section className="mt-5">
                <AreaHeader
                    Icon={MdCloudUpload}
                    title="My Drive"
                    tools={
                        <ViewModeBtn
                            mode={viewMode}
                            onClick={() =>
                                setViewMode(changeViewMode(viewMode))
                            }
                        ></ViewModeBtn>
                    }
                ></AreaHeader>
                {viewMode === 'card' ? (
                    <>
                        <div>
                            <p className="mb-4 font-bold">Folders</p>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                                {myFolderList.map((item) => (
                                    <div key={item.id}>
                                        <FolderCard
                                            name={item.name}
                                        ></FolderCard>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="mb-4 font-bold">Files</p>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                                {myFileList.map((item) => (
                                    <div key={item.id}>
                                        <FileCard
                                            type="file"
                                            name={item.name}
                                        ></FileCard>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <List>
                        <List.Header className="hidden md:flex leading-[34px]">
                            <List.Col className="flex-grow flex items-center">
                                Name
                                <SortBtn
                                    asc={true}
                                    className="text-lg"
                                ></SortBtn>
                            </List.Col>
                            <List.Col className="w-[190px] flex-shrink-0">
                                Last modified
                            </List.Col>
                            <List.Col className="w-[120px]">Owner</List.Col>
                            <List.Col className="w-[120px]">Size</List.Col>
                        </List.Header>
                        <List.Body>
                            {myDriveData.map((item) => (
                                <List.Row key={item.id}>
                                    <List.Col className="relative before:block before:w-6">
                                        <MdFolder className="absolute top-1/2 -translate-y-1/2 text-2xl"></MdFolder>
                                    </List.Col>
                                    <List.Col className="flex-grow">
                                        {item.name}
                                    </List.Col>
                                    <List.Col className="w-[190px] hidden truncate md:block">
                                        {item.updateTime}
                                    </List.Col>
                                    <List.Col className="w-[120px] hidden md:block">
                                        {item.owner}
                                    </List.Col>
                                    <List.Col className="w-[120px] hidden md:block">
                                        {item.size} GB
                                    </List.Col>
                                    <List.Col className="md:hidden">
                                        <MdInfo className="text-xl my-[2px]"></MdInfo>
                                    </List.Col>
                                </List.Row>
                            ))}
                        </List.Body>
                    </List>
                )}
            </section>
        </div>
    );
}
