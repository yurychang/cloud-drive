import { MdOutlineAccessTimeFilled, MdCloudUpload } from 'react-icons/md';
import AreaHeader from '@components/AreaHeader';
import FileCard from '@components/FileCard';
import FolderCard from '@components/FolderCard';
import ViewModeBtn, { changeViewMode } from '@components/ViewModeBtn';
import { useState } from 'react';
import { ViewMode } from '@custom-types/view-mode';
import { Col, Container, Row } from 'react-bootstrap';

export default function Dashboard() {
    const [viewMode, setViewMode] = useState<ViewMode>('card');

    return (
        <Container className="px-8 pb-8 overflow-hidden">
            <section>
                <div className="my-5">
                    <AreaHeader
                        Icon={MdOutlineAccessTimeFilled}
                        title="Recent"
                    ></AreaHeader>
                </div>
                <Row xs={2} md={3} lg={4} xl={5} className="gy-4">
                    <Col>
                        <FileCard
                            type="file"
                            name="sdf adfas asdfsaas sdfasf"
                        ></FileCard>
                    </Col>
                    <Col>
                        <FileCard
                            type="file"
                            name="sdf adfas asdfsaas sdfasf"
                        ></FileCard>
                    </Col>
                    <Col>
                        <FileCard
                            type="file"
                            name="sdf adfas asdfsaas sdfasf"
                        ></FileCard>
                    </Col>
                    <Col>
                        <FileCard
                            type="file"
                            name="sdf adfas asdfsaas sdfasf"
                        ></FileCard>
                    </Col>
                </Row>
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
                    <Row xs={2} md={3} lg={4} xl={5} className="gy-4">
                        <Col>
                            <FolderCard name="sdf adfas asdfsaas sdfasf"></FolderCard>
                        </Col>
                        <Col>
                            <FolderCard name="sdf adfas asdfsaas sdfasf"></FolderCard>
                        </Col>
                        <Col>
                            <FolderCard name="sdf adfas asdfsaas sdfasf"></FolderCard>
                        </Col>
                        <Col>
                            <FolderCard name="sdf adfas asdfsaas sdfasf"></FolderCard>
                        </Col>
                        <Col>
                            <FolderCard name="sdf adfas asdfsaas sdfasf"></FolderCard>
                        </Col>
                        <Col>
                            <FolderCard name="sdf adfas asdfsaas sdfasf"></FolderCard>
                        </Col>
                    </Row>
                </div>
                <div>
                    <p className="my-4 font-bold">Files</p>
                    <Row xs={2} md={3} lg={4} xl={5} className="gy-4">
                        <Col>
                            <FileCard
                                type="file"
                                name="sdf adfas asdfsaas sdfasf"
                            ></FileCard>
                        </Col>
                        <Col>
                            <FileCard
                                type="file"
                                name="sdf adfas asdfsaas sdfasf"
                            ></FileCard>
                        </Col>
                        <Col>
                            <FileCard
                                type="file"
                                name="sdf adfas asdfsaas sdfasf"
                            ></FileCard>
                        </Col>
                        <Col>
                            <FileCard
                                type="file"
                                name="sdf adfas asdfsaas sdfasf"
                            ></FileCard>
                        </Col>
                        <Col>
                            <FileCard
                                type="file"
                                name="sdf adfas asdfsaas sdfasf"
                            ></FileCard>
                        </Col>
                    </Row>
                </div>
            </section>
        </Container>
    );
}
