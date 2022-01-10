import React, { useState } from 'react';
import {
    MdOutlineAccessTimeFilled,
    MdCloudUpload,
    MdInfo,
    MdFolder,
    MdInsertDriveFile,
} from 'react-icons/md';
import { ViewMode } from '@custom-types/viewMode';
import AreaHeader from '@components/AreaHeader';
import FileCard from '@components/FileCard';
import FolderCard from '@components/FolderCard';
import ViewModeBtn, { changeViewMode } from '@components/ViewModeBtn';
import SortBtn from '@components/SortBtn';
import List from '@components/List';
import {
    useMyObject,
    useRecentObject,
    useUpdateObject,
} from '../features/object';
import Breadcrumb from '@components/Breadcrumb';
import DragDrop from '@components/DragDrop';
import { CloudObject } from '@custom-types/object';

export default function Dashboard() {
    const [viewMode, setViewMode] = useState<ViewMode>('card');

    const [folderHierarchy, setFolderHierarchy] = useState('/');

    const updateObject = useUpdateObject();

    const folderPathAry = (
        folderHierarchy.endsWith('/')
            ? folderHierarchy.slice(0, -1)
            : folderHierarchy
    )
        .split('/')
        .filter(Boolean);

    const { myObjects, deleteObject } = useMyObject({ path: folderHierarchy });
    const myFolderList = myObjects.filter(item => item.type === 'folder');
    const myFileList = myObjects.filter(item => item.type !== 'folder');

    const { recentObject = [] } = useRecentObject();

    const dragObjectStart = (e: React.DragEvent, item: CloudObject) => {
        e.dataTransfer.setData('id', item.id);
    };

    const dropObject = (e: React.DragEvent, item: CloudObject) => {
        const targetId = e.dataTransfer.getData('id');
        updateObject(targetId, {
            path: (item.path === '/' ? '/' : item.path + '/') + item.name,
        });
    };

    return (
        <div className="px-8 py-8 overflow-hidden">
            <section>
                <AreaHeader
                    Icon={MdOutlineAccessTimeFilled}
                    title="Recent"
                ></AreaHeader>
                {recentObject.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {recentObject.map((item, index) => (
                            <div key={index}>
                                <FileCard
                                    type="file"
                                    name={item.name}
                                ></FileCard>
                            </div>
                        ))}
                    </div>
                ) : (
                    false
                )}
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
                                    onClick={() => {
                                        setFolderHierarchy(
                                            [
                                                '',
                                                ...folderPathAry.slice(
                                                    0,
                                                    index + 1
                                                ),
                                            ].join('/')
                                        );
                                    }}
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
                            <div className="grid gap-0 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                                {myFolderList.map(item => (
                                    <DragDrop
                                        key={item.id}
                                        dragOverClass={(isOver, dragging) =>
                                            isOver && !dragging
                                                ? 'bg-yellow-300/20 border-opacity-100'
                                                : 'border-opacity-0'
                                        }
                                        draggingClass={isDragging =>
                                            (isDragging && 'opacity-50') || ''
                                        }
                                        onDragStart={e =>
                                            dragObjectStart(e, item)
                                        }
                                        onDrop={e => dropObject(e, item)}
                                        className="p-1 border-2 border-yellow-400"
                                    >
                                        <FolderCard
                                            name={item.name}
                                            onDoubleClick={() =>
                                                setFolderHierarchy(
                                                    (item.path === '/'
                                                        ? '/'
                                                        : item.path + '/') +
                                                        item.name
                                                )
                                            }
                                        ></FolderCard>
                                    </DragDrop>
                                ))}
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="mb-4 font-bold">Files</p>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                                {myFileList.map(item => (
                                    <DragDrop
                                        key={item.id}
                                        draggingClass={isDragging =>
                                            (isDragging && 'opacity-50') || ''
                                        }
                                        onDragStart={e =>
                                            dragObjectStart(e, item)
                                        }
                                    >
                                        <FileCard
                                            type="file"
                                            name={item.name}
                                            onDelete={() => {
                                                deleteObject(item.id);
                                            }}
                                        ></FileCard>
                                    </DragDrop>
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
                            {myObjects.map(item => (
                                <List.Row
                                    key={item.id}
                                    onDoubleClick={() => {
                                        item.type === 'folder' &&
                                            setFolderHierarchy(
                                                (item.path === '/'
                                                    ? '/'
                                                    : item.path + '/') +
                                                    item.name
                                            );
                                    }}
                                >
                                    <List.Col
                                        alignCenter={true}
                                        className="text-xl"
                                    >
                                        {item.type === 'folder' ? (
                                            <MdFolder />
                                        ) : (
                                            <MdInsertDriveFile />
                                        )}
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
