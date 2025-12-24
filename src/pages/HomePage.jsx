import LoginForm from "../components/LoginForm"
import { useSelector, useDispatch } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"
import './homepage.scss'
import { AiOutlineMenu } from "react-icons/ai";
import { Logout } from "../redux/slices/userSlice";
import defaultAvatar from '../assets/images/default-avatar.png'
import logoCom from '../assets/images/logo.png'
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from "react";
const HomePage = () => {
    const user = useSelector(state => state.user)
    const userInfo = user.userInfo
    const isAuthenticated = user.isAuthenticated
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const handleClose = () => setShowOffcanvas(false);
    const handleShow = () => setShowOffcanvas(true);

    const handleLogout = () => {
        handleClose()
        localStorage.removeItem('access_token')
        dispatch(Logout())
        navigate('/')
    }

    const menuItems = (
        <>
            <div className="features-list-title d-flex align-items-center gap-2">
                <AiOutlineMenu />
                <span>Menu chức năng</span>
            </div>
            <div className="menu-item" onClick={() => { navigate("/jobs"); handleClose(); }}>Danh sách công việc</div>
            {
                userInfo.role === 'GT' &&
                <div className="menu-item" onClick={() => { navigate("/errors"); handleClose(); }}>Ghi nhận đồng hồ lỗi</div>

            }
            {
                userInfo.role === 'TT' &&
                <div className="menu-item" onClick={() => { navigate("/emergency-replacement"); handleClose(); }}>Thay thế đột xuất</div>
            }
            {/* <div className="menu-item" onClick={() => { navigate("/notifications"); handleClose(); }}>Thông báo</div> */}
            <div className="menu-item" onClick={() => { navigate("/job-history"); handleClose(); }}>Lịch sử công việc</div>
            <div className="menu-item" onClick={() => { navigate("/chart"); handleClose(); }}>Thống kê</div>
        </>
    );
    return (
        <>
            {!isAuthenticated ? (
                <LoginForm />
            ) :
                (
                    <div className="container-fluid row g-0">
                        <div className="sidebar d-none d-md-block col-md-2">
                            <div className="row align-items-center" style={{ height: '150px' }}>
                                <div className=" user-info col-12 col-md-4 d-flex justify-content-center" style={{ backgroundColor: '#1e293b' }}>
                                    <img
                                        src={defaultAvatar}
                                        className=" img-fluid rounded-circle"
                                        alt="avatar"
                                        style={{ maxWidth: '80px' }}
                                    />
                                </div>
                                <div className="user-name col-md-8 text-start ">
                                    <div>Nhân viên: {userInfo.full_name}</div>
                                    <div>Vị trí: {userInfo.role}</div>
                                    <button className="btn btn-danger" onClick={handleLogout}>Đăng xuất</button>
                                </div>
                            </div>
                            <div className="features-list mt-3 ps-3">
                                {menuItems}
                            </div>
                        </div>
                        <div className="component-container col-md-10 col-sm-12">
                            <div style={{ backgroundColor: '#2B579A', height: '150px' }} className="d-flex justify-content-center align-items-center w-100">
                                {/* Nút menu cho mobile */}
                                <div className="d-md-none me-3" >
                                    <Button style={{ backgroundColor: '#2B579A', border: 'none', boxShadow: '' }} onClick={handleShow}>
                                        <AiOutlineMenu size={20} />
                                    </Button>
                                </div>
                                <div
                                    style={{
                                        height: "100px",
                                        backgroundColor: "#fff",
                                    }}
                                >
                                    <img
                                        src={logoCom}
                                        alt="Logo"
                                        style={{ width: "100%", height: "100%", objectFit: "contain", backgroundColor: '#2B579A' }}
                                    />
                                </div>
                                <div className="d-flex flex-column">
                                    <h2 className="text-center text-white ms-3  ">HỆ THỐNG QUẢN LÝ ĐỒNG HỒ NƯỚC</h2>
                                    <h4 className="text-center text-white">Đội KDNS Bắc Thăng Long</h4>
                                </div>
                            </div>
                            <Outlet />
                        </div>
                    </div>
                )
            }
            {/* Offcanvas cho mobile */}
            <Offcanvas show={showOffcanvas} onHide={handleClose} className="d-md-none" >
                <Offcanvas.Header closeButton>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="mb-3 d-flex flex-column align-items-center">
                        <img
                            src={defaultAvatar}
                            className="img-fluid rounded-circle mb-2"
                            alt="avatar"
                            style={{ maxWidth: '80px' }}
                        />
                        <div>Nhân viên: {userInfo.full_name}</div>
                        <div>Vị trí: {userInfo.role}</div>
                        <button className="btn btn-danger mt-2" onClick={handleLogout}>Đăng xuất</button>
                    </div>
                    {menuItems}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default HomePage