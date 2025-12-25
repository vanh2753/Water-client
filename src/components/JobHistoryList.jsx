import Table from 'react-bootstrap/Table';
import { getJobHistory } from '../api/job-api';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

const JobHistoryList = () => {
    const [jobData, setJobData] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    const fetchData = async (pageNum = 1) => {
        const res = await getJobHistory(pageNum)
        setJobData(res.DT)
        setHasMore(res.DT.length === 15) // nếu ít hơn 10 thì coi như hết
    }

    useEffect(() => {
        fetchData(page)
    }, [page])

    const renderStatus = (status) => {
        if (status === 'Mới') {
            return <span className="tag text-primary">{status}</span>;
        }
        if (status === 'Kiểm tra thành công' || status === 'Đã cập nhật hệ thống' || status === "Hoàn thiện hồ sơ") {
            return <span className="tag text-success">{status}</span>;
        }
        if (status === 'Chuyển thanh tra') {
            return <span className="tag text-danger">{status}</span>;
        }
        if (status === 'Chờ Thanh tra') {
            return <span className="tag text-warning">{status}</span>;
        }
        if (status === 'Đã thay thế') {
            return <span className="tag text-info">{status}</span>;
        }
        return <span className="tag">{status}</span>;
    }

    return (
        <div className='p-md-3'>
            <h3 className='text-center mt-3'>Lịch sử công việc</h3>
            <div className='table-responsive px-2'>
                <Table bordered hover className='w-100'>
                    <thead>
                        <tr className=''>
                            <th className='text-center'>Mã việc</th>
                            <th className='text-center'>Trạng thái</th>
                            <th>Bộ phận phụ trách</th>
                            <th>Nhân viên phụ trách</th>
                            <th className='text-center'>Thời gian</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobData.map((job, index) => (
                            <tr key={index} className="align-middle">
                                <td className='text-center'>{job.job_id}</td>
                                <td className='text-center'>{renderStatus(job.status)}</td>
                                <td>{job.task_type}</td>
                                <td>{job?.User?.full_name}</td>
                                <td>{new Date(job.createdAt).toLocaleString('vi-VN')}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            {/* Nút Prev/Next */}
            <div className="mt-3 d-flex justify-content-center">
                <Button
                    variant="primary"
                    className="me-2 px-3"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    Prev
                </Button>
                <Button
                    variant="primary"
                    className='px-3'
                    disabled={!hasMore}
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}

export default JobHistoryList
