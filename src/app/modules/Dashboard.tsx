import { MdOutlineAccessTimeFilled, MdCloudUpload } from 'react-icons/md';
import AreaHeader from '@components/AreaHeader';
import FileCard from '@components/FileCard';
import FolderCard from '@components/FolderCard';
import ViewModeBtn, { changeViewMode } from '@components/ViewModeBtn';
import { useState } from 'react';
import { ViewMode } from '@custom-types/view-mode';

export default function Dashboard() {
    const [viewMode, setViewMode] = useState<ViewMode>('card');

    return (
        <div className="px-8 pb-8 overflow-hidden">
            <section>
                <div className="my-5">
                    <AreaHeader
                        Icon={MdOutlineAccessTimeFilled}
                        title="Recent"
                    ></AreaHeader>
                </div>
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
            <section>
                <div className="flex my-5">
                    <AreaHeader
                        Icon={MdCloudUpload}
                        title="My Drive"
                    ></AreaHeader>
                    <div className="flex-grow"></div>
                    <ViewModeBtn
                        mode={viewMode}
                        onClick={() => setViewMode(changeViewMode(viewMode))}
                    ></ViewModeBtn>
                </div>
                <div>
                    <p className="my-4 font-bold">Folders</p>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        <div>
                            <FolderCard name="sdf adfas asdfsaas sdfasf"></FolderCard>
                        </div>
                        <div>
                            <FolderCard name="sdf adfas asdfsaas sdfasf"></FolderCard>
                        </div>
                        <div>
                            <FolderCard name="sdf adfas asdfsaas sdfasf"></FolderCard>
                        </div>
                        <div>
                            <FolderCard name="sdf adfas asdfsaas sdfasf"></FolderCard>
                        </div>
                        <div>
                            <FolderCard name="sdf adfas asdfsaas sdfasf"></FolderCard>
                        </div>
                        <div>
                            <FolderCard name="sdf adfas asdfsaas sdfasf"></FolderCard>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="my-4 font-bold">Files</p>
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
                        <div>
                            <FileCard
                                type="file"
                                name="sdf adfas asdfsaas sdfasf"
                            ></FileCard>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
