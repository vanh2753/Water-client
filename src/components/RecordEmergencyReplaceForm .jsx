import { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { recordEmergencyReplacement } from '../api/job-api';

const RecordEmergencyReplaceForm = () => {
    const [formData, setFormData] = useState({
        serial_number: '',
        meter_status: '',
        note: '',
        customer_name: '',
        address: '',
        meter_book_number: '',
        meter_value: '',
        new_serial: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { serial_number, new_serial, customer_name, address, meter_book_number, meter_value, meter_status, note } = formData;
            const res = await recordEmergencyReplacement(serial_number, new_serial, customer_name, address, meter_book_number, meter_value, meter_status, note);
            if (res.EC === 0) {
                setFormData({
                    serial_number: '',
                    meter_status: '',
                    note: '',
                    customer_name: '',
                    address: '',
                    meter_book_number: '',
                    meter_value: '',
                    new_serial: '',
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="d-flex justify-content-center mt-5 ">
            <Card style={{ maxWidth: '600px', width: '100%' }} className="p-3 shadow-sm mx-2">
                <Card.Title className="text-center">Thay thế đồng hồ đột xuất</Card.Title>
                <Form onSubmit={handleSubmit}>

                    {/* Serial cũ */}
                    <Form.Group className="mb-3" controlId="serial_number">
                        <Form.Label>*Serial đồng hồ cũ</Form.Label>
                        <Form.Control
                            type="text"
                            name="serial_number"
                            value={formData.serial_number}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    {/* Tình trạng + Note đặt ngay dưới Serial cũ */}
                    <Form.Group className="mb-3" controlId="meter_status">
                        <Form.Label>*Tình trạng đồng hồ cũ</Form.Label>
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
                                placeholder="Nhập chi tiết tình trạng đồng hồ cũ"
                            />
                        </Form.Group>
                    )}

                    {/* Các thông tin khách hàng */}
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

                    {/* Serial mới để cuối cùng */}
                    <Form.Group className="mb-3" controlId="new_serial">
                        <Form.Label>*Serial đồng hồ mới</Form.Label>
                        <Form.Control
                            type="text"
                            name="new_serial"
                            value={formData.new_serial}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-center">
                        <Button type="submit" variant="primary" className="px-4 py-2">
                            Ghi nhận thay thế
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default RecordEmergencyReplaceForm;
