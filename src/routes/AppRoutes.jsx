import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from '../pages/HomePage'
import JobList from '../components/JobList'
import RecordMeterForm from '../components/RecordMeterForm'
import JobHistoryList from "../components/JobHistoryList";
import JobChart from "../components/JobChart";
import RecordEmergencyReplaceForm from "../components/RecordEmergencyReplaceForm ";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} >
                    <Route index element={<JobList />} />
                    <Route path="jobs" element={<JobList />} />
                    <Route path="errors" element={<RecordMeterForm />} />
                    <Route path='job-history' element={<JobHistoryList />} />
                    <Route path='chart' element={<JobChart />} />
                    <Route path='emergency-replacement' element={<RecordEmergencyReplaceForm />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes