import React, { useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  Rate,
  Form,
  Skeleton,
  notification,
  Popconfirm,
  message
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { listProducts } from "../../_actions/productActions";
import {  EllipsisOutlined,   ShoppingOutlined } from "@ant-design/icons";
import { addToCart } from "../../_actions/cartActions";
const { Meta } = Card;
const { Text } = Typography;
const posts = [1, 2, 3, 4, 5];







const openNotification = (message, description) => {
  notification.open({
    message: message,
    description: description,
  });
};
const renderSkeleton = posts.map((post, index) => {
  return (
    <Col key={index}>
      <Form layout="vertical">
        <Form.Item>
          <Skeleton.Input style={{ width: "200px", height: "150px" }} /> <br />
        </Form.Item>

        <Form.Item>
          <Skeleton.Input
            style={{ width: "150px", height: "1rem" }}
            active={true}
          />
        </Form.Item>
        <Form.Item>
          <Skeleton.Input
            style={{ width: "200px", height: "1rem" }}
            active={true}
          />
        </Form.Item>
      </Form>
    </Col>
  );
});



export default function CarouselItem(props) {
  const dispatch = useDispatch();
  const ProductList = useSelector((state) => state.productList);
  const { posts, loading, error } = ProductList;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productAddToCart = (productId) =>{
    if(!userInfo){
      message.warn('Redirecting to login page...')
      props.history.push('/login')
      
    }
    else
    dispatch(addToCart(productId, 1, userInfo.name, userInfo.phone));
  
  }
  const confirm = (id) => {
    message.info('Clicked on Yes.');
    productAddToCart(id)

  }



  useEffect(() => {
    dispatch(listProducts());

    return () => {};
  }, []);
  return (
    <div className="mobile__carousel" style={{ backgroundColor: "#F8F8F8" }}>
      {loading ? (
        <Row justify="space-around" align="middle">
          {renderSkeleton}
        </Row>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Row justify="space-around" align="middle" gutter={[0, 16]}>
          {posts.map((item) => (
            <Col key={item.id}>
              <Card
                style={{ width: "18rem", border: "0" }}
                cover={
                  <LazyLoadImage
                    src={item.image}
                    effect="blur"
                    alt="product-Image"
                    style={{ width: "inherit"}}
                  />
                }

                actions={[
                  <Popconfirm placement="top" title={'Add product to cart'}  okText="Yes" cancelText="No" onConfirm={()=>confirm(item.id)}>
                  <ShoppingOutlined key="cart"  />,
                </Popconfirm>,
                  <EllipsisOutlined key="ellipsis" 
                  onClick={() =>
                    openNotification(item.product_name, item.description)
                  }
                   />,
                ]}
              >
                <Link
                  to={`/product-detail/${item.id}/?category=${item.category}`}
                >
                  <Meta title={item.product_name} description={item.shop} />
                </Link>
                <Rate
                  name="size-small"
                  style={{ fontSize: "1rem", color: "#f9812a" }}
                  defaultValue={item.ratings}
                />
                <br />
                <Text style={{ color: "grey", fontSize: "1rem" }}>
                  <b>ksh {item.price}</b>
                </Text>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}