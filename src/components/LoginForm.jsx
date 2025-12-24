import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/user-api';
import { Login } from '../redux/slices/userSlice';
import logoCom from '../assets/images/logo.png'
import bgrImg from '../assets/images/bgr-login.png'

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (values) => {
        try {
            const res = await login(values.email, values.password);
            if (res.EC === 0) {
                localStorage.setItem('access_token', res.DT.access_token);
                dispatch(Login(res.DT));
                navigate('/');
            } else {
                alert(res.EM);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="d-flex flex-column align-items-center vh-100 px-3" style={{ backgroundImage: `url(${bgrImg})`, backgroundSize: 'cover' }}>
            {/* Slogan công ty */}

            <div
                style={{
                    height: "200px",
                }}
                className='mt-3 mb-3'
            >
                <img
                    src={logoCom}
                    alt="Logo"
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
            </div>
            <div className="mb-4 text-center">
                <div
                    style={{
                        fontStyle: 'italic',
                        color: '#FFFFFF',
                        fontSize: '32px',
                        fontWeight: 'bold',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
                    }}
                >
                    HAWACOM vì chất lượng cuộc sống
                </div>
            </div>

            {/* Form đăng nhập */}
            <Form
                className="p-4 border rounded "
                name="basic"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}
                style={{
                    maxWidth: 600, width: '100%', background: '#f7f7f7ff', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
                }}
                initialValues={{ remember: true }}
                onFinish={handleLogin}
                autoComplete="off"

            >
                <h3 className="text-center mb-4">Đăng nhập</h3>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[{ required: true, message: 'Vui lòng nhập password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item label={null} className="text-center" wrapperCol={{ offset: 0, span: 24 }} style={{ textAlign: 'center' }}>
                    <Button type="primary" htmlType="submit">
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>
        </div >
    );
};

export default LoginForm;
