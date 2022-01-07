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
import { getMyObjectApi } from '../api';
import { useMyObject } from '../features/object';
import Breadcrumb from '@components/Breadcrumb';

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

    const [folderHierarchy, setFolderHierarchy] = useState('/');
    const folderPathAry = (
        folderHierarchy.endsWith('/')
            ? folderHierarchy.slice(0, -1)
            : folderHierarchy
    )
        .split('/')
        .filter(Boolean);

    const { myObject = [] } = useMyObject({ path: folderHierarchy });
    const myFolderList = myObject.filter((item) => item.type === 'folder');
    const myFileList = myObject.filter((item) => item.type !== 'folder');

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
                </div>
            </section>
            <section className="mt-5">
                <AreaHeader
                    Icon={MdCloudUpload}
                    title={
                        <Breadcrumb>
                            <Breadcrumb.Item
                                as="button"
                                className="font-bold"
                                onClick={() => setFolderHierarchy('/')}
                            >
                                My Drive
                            </Breadcrumb.Item>
                            {folderPathAry.map((item, index) => (
                                <Breadcrumb.Item
                                    key={index}
                                    as="button"
                                    className="font-bold"
                                    onClick={() =>
                                        setFolderHierarchy(
                                            folderPathAry
                                                .slice(0, index + 1)
                                                .join('/')
                                        )
                                    }
                                >
                                    {item}
                                </Breadcrumb.Item>
                            ))}
                        </Breadcrumb>
                    }
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
                                            onDoubleClick={() =>
                                                setFolderHierarchy(
                                                    item.path + '/' + item.name
                                                )
                                            }
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
                            {myObject.map((item) => (
                                <List.Row
                                    key={item.id}
                                    onDoubleClick={() => {
                                        item.type === 'folder' &&
                                            setFolderHierarchy(
                                                item.path + '/' + item.name
                                            );
                                    }}
                                >
                                    <List.Col
                                        alignCenter={true}
                                        className="text-xl"
                                    >
                                        <MdFolder></MdFolder>
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
                                    <List.Col
                                        alignCenter={true}
                                        className="text-xl md:hidden"
                                    >
                                        <MdInfo></MdInfo>
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
