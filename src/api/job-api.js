import axios from "./axios";

const recordErrorMeter = async (serial_number, customer_name, address, meter_book_number, meter_value, meter_status, note) => {
    const res = await axios.post("/record-error-meter", { serial_number, customer_name, address, meter_book_number, meter_value, meter_status, note });
    return res.data;
}

const getJobList = async (page = 1) => {
    const res = await axios.get(`/get-job-list?page=${page}`)
    return res.data
}

const handleflushing = async (job_id, status) => {
    console.log('Status:', status);
    const res = await axios.post(`/handle-flushing/${job_id}`, { status })
    return res.data
}

const completeMeterReplacement = async (job_id, serial_number) => {
    try {
        const res = await axios.post(`/complete-meter-replacement/${job_id}`, { serial_number })
        return res.data
    } catch (error) {
        console.log('check errr', error)
    }
}

const updatedInSystem = async (job_id) => {
    const res = await axios.post(`/updated-in-system/${job_id}`, {})
    return res.data
}

const completeProjectDocument = async (job_id) => {
    const res = await axios.post(`/complete-project-document/${job_id}`, {})
    return res.data
}

const recordEmergencyReplacement = async (serial_number, new_serial, customer_name, address, meter_book_number, meter_value, meter_status, note) => {
    const res = await axios.post("/record-emergency-replacement", { serial_number, new_serial, customer_name, address, meter_book_number, meter_value, meter_status, note });
    return res.data
}

const getJobHistory = async (page = 1) => {
    const res = await axios.get(`/get-job-history?page=${page}`)
    return res.data
}

const getJobChartData = async () => {
    const res = await axios.get(`/get-job-chart-data`)
    return res.data
}

const updateJob = async (job_id, serial_number, customer_name, address, meter_book_number, meter_value, meter_status, note) => {
    const res = await axios.put(`/job/${job_id}`, { serial_number, customer_name, address, meter_book_number, meter_value, meter_status, note });
    return res.data
}

const downloadReport = async (month, year) => {
    const res = await axios.get(`/export-file`, {
        params: { month, year },
        responseType: "blob", // dùng để download file
    });
    return res.data;
};
export { recordErrorMeter, getJobList, handleflushing, completeMeterReplacement, updatedInSystem, completeProjectDocument, recordEmergencyReplacement, getJobHistory, getJobChartData, updateJob, downloadReport }