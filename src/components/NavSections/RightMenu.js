import React, { useState } from "react";
import { Menu, Space, Badge, Modal, Col, Row, Typography, Image,message, Button } from "antd";
import Cookie from "js-cookie";
import {withRouter,Link, useHistory} from "react-router-dom"
import {
  LoginOutlined,
  MailOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import Avatar from "antd/lib/avatar/avatar";

const { Text, Title } = Typography;
const { SubMenu } = Menu;
const cartItems = Cookie.getJSON("cartItems");


function RightMenu(props) {
  const history = useHistory()
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [visible, setVisible] = useState(false);
  const PaymentList = useSelector((state) => state.paymentList);
  const { payments } = PaymentList;

  const showModal = () => {
    setVisible(true);
  };
  const logout = async() =>{
    if(!userInfo){
      console.log()
    }
    await Cookie.remove('userInfo')
    setTimeout((
      message.success('Logged out successfully')
    ),2000)
    history.goBack()
  }

  const handleOk = () => {
    setVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
  };

  if (!userInfo) {
    return (
      <Menu mode="horizontal" style={{paddingTop:"0.4rem"}}>
        <Menu.Item key="mail">
          <Link to="/login">
          <Button icon={<LoginOutlined style={{margin:"0px", fontSize:"1rem"}} />} style={{borderRadius:"50px"}}>Signin</Button>
            
          </Link>
        </Menu.Item>
        <Menu.Item key="app">
          <Link to="/register">
            <Button style={{borderRadius:"50px"}} icon={<UserAddOutlined style={{fontSize:"1rem", margin:"0px"}} />}>Signup</Button>
          </Link>
        </Menu.Item>
      </Menu>
    );
  } else {
    if (!cartItems) {
      return (
        <Space>
          <Menu mode="horizontal">
            <Menu.Item>
              <Badge count={0}>
                <ShoppingCartOutlined
                  onClick={showModal}
                  style={{ fontSize: "1.7rem"}}
                />
              </Badge>
            </Menu.Item>
            <SubMenu title={<Avatar src={userInfo.avatar} style={{width:"30px", height:"auto",marginBottom:"0.7rem"}} />}>
              {/* <Menu.Item style={{ paddingLeft: "85px", margin: "auto" }}>
                <img
                  src={userInfo.avatar}
                  alt="profile_pic"
                  style={{ width: "25px", borderRadius: "50px" }}
                />
              </Menu.Item> */}
              <Menu.Item>{userInfo.email}</Menu.Item>
              <Menu.Item onClick={()=>logout()}>Logout</Menu.Item>
            </SubMenu>
          </Menu>
          <Modal
            title="Basic Modal"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
          ></Modal>
        </Space>
      );
    } else {
      return (
        <Space>
          <Menu mode="horizontal">

            <Menu.Item>
              <Badge count={cartItems.length}>
                <ShoppingCartOutlined
                  onClick={showModal}
                  style={{ fontSize: "1.8rem", margin:"0" }}
                />
              </Badge>
              
            </Menu.Item>
            <Menu.Item>
              <Badge dot count={cartItems.length}>
                <MailOutlined
                  style={{ fontSize: "1.5rem", margin:"0" }}
                />
              </Badge>
              
            </Menu.Item>
            <Menu.Item>
              <SettingOutlined style={{fontSize:"1.5rem"}}/>

            </Menu.Item>
            <SubMenu title={<Avatar   src={userInfo.avatar} style={{marginBottom:"0.8rem", width:"30px", height:"inherit"}} />}>

              <Menu.Item>{userInfo.email}</Menu.Item>
              <Menu.Item style={{justifyContent:"space-around", display:"flex", margin:"0"}}>
                <Button style={{borderRadius:"50px"}}>
                  <Link to="/register">Manage account</Link>
                </Button>
              </Menu.Item>
              
              <Menu.Item style={{justifyContent:"space-around", display:"flex", margin:"0"}}>Logout</Menu.Item>
            </SubMenu>
          </Menu>
          <Modal
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            {cartItems.map((product) => (
              <Row justify="space-around" align="middle">
                <Col>
                  <Image
                    src={product.image}
                    alt="profile_pic"
                    style={{ width: "50px" }}
                  />
                </Col>
                <Col>
                  <Title level={3}>{product.qty}</Title>
                </Col>
                <Col key={product.product}>
                  <Text>{product.price}</Text>
                </Col>
              </Row>
            ))}
          </Modal>
        </Space>
      );
    }
  }
}

export default withRouter (RightMenu);
