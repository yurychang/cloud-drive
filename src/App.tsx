import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '@components/mainLayout/MainLayout';
import Dashboard from '@modules/Dashboard';
import Shared from '@modules/Shared';
import { SWRConfig } from 'swr';

function App() {
    return (
        <SWRConfig value={{ provider: () => new Map() }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route path="/" element={<Dashboard />}></Route>
                        <Route path="/shared" element={<Shared />}></Route>
                        <Route
                            path="*"
                            element={<div>Page not found</div>}
                        ></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </SWRConfig>
    );
}

export default App;
