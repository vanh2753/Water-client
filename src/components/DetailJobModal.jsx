import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './detailModal.scss'
import { useState } from 'react';
import { IoMdInformationCircle } from "react-icons/io";
import { FaTachometerAlt } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { handleflushing, completeMeterReplacement, updatedInSystem, completeProjectDocument, } from '../api/job-api'
import RecordEditForm from './RecordEditForm';

const DetailJobModal = (props) => {

    const jobData = props.jobData
    const role = props.role
    const reloadJobList = props.reloadJobList
    const onHide = props.onHide

    const [serialNumber, setSerialNumber] = useState('');
    const [isEditing, setIsEditing] = useState(false);


    let currentDate = new Date(jobData?.updatedAt);
    let completionDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);

    const handleCloseEditModal = () => {
        setIsEditing(false); // reset edit mode
        onHide();            // đóng modal
    };

    const renderButtons = (role, task_type) => {
        if (role === 'QLM' && task_type === 'Ghi thu') {
            return (
                <div>
                    <Button variant="primary" onClick={() => handleFlushing('Kiểm tra thành công')} >Kiểm tra thành công</Button>
                    <Button variant="danger" onClick={() => handleFlushing('Chuyển thanh tra')} className='ms-2'>Chuyển thanh tra</Button>
                </div>
            );
        }

        if (role === 'TT' && task_type === 'Thanh tra') {
            return (
                <div className="d-flex align-items-end gap-2">
                    <div className="flex-grow-1">
                        <label>Serial đồng hồ mới</label>
                        <input
                            type="text"
                            className="form-control"
                            value={serialNumber}
                            onChange={(e) => setSerialNumber(e.target.value)}
                        />
                    </div>
                    <Button
                        variant="primary"
                        className="align-self-end"
                        onClick={() => handleCompleteMeterReplacement()}
                    >
                        Xác nhận
                    </Button>
                </div>
            );
        }

        if (role === 'KD' && task_type === 'Thanh tra') {
            return (
                <div>
                    <Button variant="primary" onClick={() => handleUpdatedInSystem()}>Cập nhật vào hệ thống</Button>
                </div>
            );
        }

        if (role === 'KT' && task_type === 'Kinh doanh') {
            return (
                <div>
                    <Button variant="primary" onClick={() => handleCompleteProjectDocument()} >Hoàn thiện hồ sơ</Button>
                </div>
            );
        }

        return null;

    }

    const renderMeterStatus = (jobData) => {
        {
            jobData.status === 'Đã thay thế'
                ? <div>Tình trạng đồng hồ: {jobData.NewMeter?.status}</div>
                : <div>Tình trạng đồng hồ: {jobData.OldMeter?.status}</div>
            { jobData.OldMeter?.status === 'Khác' && <div>Lý do cụ thể: {jobData.OldMeter?.note}</div> }
        }
        if (jobData.status === 'Đã thay thế') {
            return (
                <div>Tình trạng đồng hồ: {jobData.NewMeter?.status}</div>
            )
        }
        else {
            return (
                <>
                    <div>Tình trạng đồng hồ: {jobData.OldMeter?.status}</div>
                    {jobData.OldMeter?.status === 'Khác' && <div>Lý do cụ thể: {jobData.OldMeter?.note}</div>}
                </>
            )
        }

    }

    const handleFlushing = async (status) => {
        try {
            if (status === 'Chuyển thanh tra') {
                const res = await handleflushing(jobData.job_id, status)
                if (res.EC === 0) {
                    // Tắt modal
                    onHide();
                    // Reload danh sách công việc
                    reloadJobList();
                }
            }
            else {
                const res = await handleflushing(jobData.job_id, status)
                if (res.EC === 0) {
                    // Tắt modal
                    onHide();
                    // Reload danh sách công việc
                    reloadJobList();
                }
            }
        } catch (error) {
            console.log(error)
        }

    }

    const handleCompleteMeterReplacement = async () => {
        try {
            const serial_number = document.querySelector('input').value
            const res = await completeMeterReplacement(jobData.job_id, serial_number)
            if (res.EC === 0) {
                // Tắt modal
                onHide();
                // Reload danh sách công việc
                reloadJobList();
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdatedInSystem = async () => {
        try {
            const res = await updatedInSystem(jobData.job_id)
            if (res.EC === 0) {
                // Tắt modal
                onHide();
                // Reload danh sách công việc
                reloadJobList();
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleCompleteProjectDocument = async () => {
        try {
            const res = await completeProjectDocument(jobData.job_id)
            if (res.EC === 0) {
                // Tắt modal
                onHide();
                // Reload danh sách công việc
                reloadJobList();
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <div className='job-info'>
                        <div className='title '>
                            <IoMdInformationCircle className="icon" />
                            <span>Thông tin công việc</span>
                        </div>
                        <div >Mã công việc: {jobData.job_id}</div>
                        <div >Bộ phận phụ trách: {jobData.task_type}</div>
                        <div >Trạng thái: {jobData.status}</div>
                    </div>
                    <div className='gerneral-info gap-3 d-none d-md-flex'>
                        <div className='meter-info w-50'>
                            <div className='title'>
                                <FaTachometerAlt className="icon" />
                                <span>Thông tin đồng hồ</span>
                            </div>
                            {
                                jobData.emergency_replacement === true && <div className='text-danger'>** Trường hợp thay thế đột xuất</div>
                            }
                            {
                            jobData.status === 'Đã thay thế'
                            || jobData.status === 'Đã cập nhật hệ thống'
                            || jobData.status === 'Hoàn thiện hồ sơ'
                                ? (
                                <div>
                                    Serial đồng hồ thay thế: {jobData.NewMeter?.serial_number || 'Không tìm thấy'}
                                </div>
                                <div>
                                    Serial đồng hồ lỗi: {jobData.OldMeter?.serial_number}
                                </div>
                                )
                                : jobData.status === 'Chờ Thanh tra'
                                ? (
                                <div>
                                    Serial đồng hồ lỗi: {jobData.OldMeter?.serial_number}
                                </div>
                                )
                                : jobData.status === 'Mới'
                                ? (
                                <div>
                                    Serial đồng hồ lỗi: {jobData.OldMeter?.serial_number}
                                </div>
                                )
                                : (
                                <div>
                                    Serial đồng hồ hoạt động tốt: {jobData.OldMeter?.serial_number}
                                </div>
                                )
                            }

                            <div>Số đọc đồng hồ: {jobData.meter_book_number || 'Không có'}</div>
                            <div>Chỉ số đồng hồ: {jobData.meter_value || 'Không có'}</div>
                            <div>{renderMeterStatus(jobData)}</div>

                        </div>
                        <div className='customer-info w-50'>
                            <div className='title'>
                                <IoPersonSharp className="icon" />
                                <span>Thông tin khách hàng</span>
                            </div>
                            <div>Khách hàng: {jobData.customer_name}</div>
                            <div>Địa chỉ: {jobData.address}</div>
                        </div>
                    </div>
                    {/* Mobile */}
                    <div className='gerneral-info d-sm-flex flex-column gap-3 d-md-none '>
                        <div className='meter-info '>
                            <div className='title'>
                                <FaTachometerAlt className="icon" />
                                <span>Thông tin đồng hồ</span>
                            </div>
                            {
                                jobData.status === 'Đã thay thế'
                                    ? <div>Serial đồng hồ thay thế: {jobData.NewMeter?.serial_number}</div>
                                    : jobData.status === 'Chờ Thanh tra'
                                        ? <div>Serial đồng hồ lỗi: {jobData.OldMeter?.serial_number}</div>
                                        : jobData.status === 'Mới'
                                            ? <div>Serial đồng hồ lỗi: {jobData.OldMeter?.serial_number}</div>
                                            : <div>Serial đồng hồ hoạt động tốt: {jobData.OldMeter?.serial_number}</div>
                            }

                            <div>Số đọc đồng hồ: {jobData.meter_book_number || 'Không có'}</div>
                            <div>Chỉ số đồng hồ: {jobData.meter_value || 'Không có'}</div>
                            <div>{renderMeterStatus(jobData)}</div>
                        </div>
                        <div className='customer-info '>
                            <div className='title'>
                                <IoPersonSharp className="icon" />
                                <span>Thông tin khách hàng</span>
                            </div>
                            <div>Khách hàng: {jobData.customer_name}</div>
                            <div>Địa chỉ: {jobData.address}</div>
                        </div>
                    </div>
                    <div>Ngày tạo: {currentDate.toLocaleString('vi-VN', { hour12: false })}</div>
                    <div style={{ color: 'red' }}>Hạn hoàn thành: {completionDate.toLocaleString('vi-VN', { hour12: false })}</div>
                    {
                        isEditing && role === 'GT' && jobData.status === 'Mới' &&
                        <RecordEditForm
                            jobData={jobData}
                            onSave={() => {
                                reloadJobList();
                                handleCloseEditModal();
                            }}
                            onCancel={() => setIsEditing(false)}
                        />
                    }

                    {/* phần hiển thị detail như cũ */}
                    <div className='button-group d-flex justify-content-center'>
                        {role === 'GT' && jobData.status === 'Mới' && (
                            <Button onClick={() => setIsEditing(true)} className='btn btn-warning'>Sửa</Button>
                        )}
                        {renderButtons(role, jobData.task_type)}
                    </div>

                </Modal.Body>
            </Modal>
        </div>
    )
}

export default DetailJobModal