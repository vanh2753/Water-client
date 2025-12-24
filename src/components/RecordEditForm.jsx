import { useState, useEffect } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { updateJob } from '../api/job-api'; // API update

const RecordEditForm = ({ jobData, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        serial_number: '',
        customer_name: '',
        address: '',
        meter_book_number: '',
        meter_value: '',
        meter_status: '',
        note: '',
    });

    // Load dữ liệu mặc định từ jobData
    useEffect(() => {
        if (jobData) {
            setFormData({
                serial_number: jobData.OldMeter?.serial_number || jobData.NewMeter?.serial_number || '',
                customer_name: jobData.customer_name || '',
                address: jobData.address || '',
                meter_book_number: jobData.meter_book_number || '',
                meter_value: jobData.meter_value || '',
                meter_status: jobData.status === 'Đã thay thế'
                    ? jobData.NewMeter?.status || ''
                    : jobData.OldMeter?.status || '',
                note: jobData.OldMeter?.status === 'Khác' ? jobData.OldMeter?.note || '' : '',
            });
        }
    }, [jobData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { serial_number, customer_name, address, meter_book_number, meter_value, meter_status, note } = formData;
            const res = await updateJob(
                jobData.job_id,
                serial_number, customer_name, address, meter_book_number, meter_value, meter_status, note
            );
            if (res.EC === 0) {
                onSave(); // callback reload + close modal
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="d-flex justify-content-center mt-3">
            <Card style={{ maxWidth: '600px', width: '100%' }} className="p-3 shadow-sm">
                <Card.Title className="text-center">Chỉnh sửa công việc</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="serial_number">
                        <Form.Label>*Serial đồng hồ</Form.Label>
                        <Form.Control
                            type="text"
                            name="serial_number"
                            value={formData.serial_number}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="customer_name">
                        <Form.Label>*Họ và tên khách hàng</Form.Label>
                        <Form.Control
                            type="text"
                            name="customer_name"
                            value={formData.customer_name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="address">
                        <Form.Label>*Địa chỉ</Form.Label>
                        <Form.Control
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="meter_book_number">
                        <Form.Label>Số đọc</Form.Label>
                        <Form.Control
                            type="text"
                            name="meter_book_number"
                            value={formData.meter_book_number}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="meter_value">
                        <Form.Label>Chỉ số đồng hồ</Form.Label>
                        <Form.Control
                            type="text"
                            name="meter_value"
                            value={formData.meter_value}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="meter_status">
                        <Form.Label>*Tình trạng đồng hồ</Form.Label>
                        <Form.Select
                            name="meter_status"
                            value={formData.meter_status}
                            onChange={handleChange}
                            required
                        >
                            <option value="">-- Chọn tình trạng --</option>
                            <option value="Chạy nhanh">Chạy nhanh</option>
                            <option value="Chạy chậm">Chạy chậm</option>
                            <option value="Kẹt đồng hồ">Kẹt đồng hồ</option>
                            <option value="Vỡ mặt">Vỡ mặt</option>
                            <option value="Mất cắp">Mất cắp</option>
                            <option value="Khác">Khác</option>
                        </Form.Select>
                    </Form.Group>

                    {formData.meter_status === "Khác" && (
                        <Form.Group className="mb-3" controlId="note">
                            <Form.Label>Ghi chú tình trạng</Form.Label>
                            <Form.Control
                                type="text"
                                name="note"
                                value={formData.note}
                                onChange={handleChange}
                                placeholder="Nhập chi tiết tình trạng đồng hồ"
                            />
                        </Form.Group>
                    )}

                    <div className="d-flex justify-content-center gap-2">
                        <Button type="submit" variant="primary">
                            Cập nhật
                        </Button>
                        <Button variant="secondary" onClick={onCancel}>
                            Hủy
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default RecordEditForm;
