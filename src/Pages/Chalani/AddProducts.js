import { Select, Button, InputNumber, Input, Form } from 'antd';
import React from 'react';
import styled from 'styled-components';

const { Option } = Select;
const AddProduct = (props) => {
const handleSubmit = (e) => {
  props.onSubmit({
    key: e.ProductionName,
    productionName: e.ProductionName,
    productionQuantity: e.ProductionQuantity,
  })
}
const dummydata = [
  {
    name: "Dark Forest",
    price: '20',
    id: 1,
  },
  {
    name: "Red valvet",
    price: '110',
    id: 2,
  },
  {
    name: "White Forest",
    price: '200',
    id: 3,
  },
  {
    name: "Butter Scothc Cake",
    price: '2500',
    id: 4,
  },
  {
    name: "Banana Vake",
    price: '2500',
    id: 5,
  }
]




    return (
      
       <Addproduct>
          <h2>Add Products:</h2>
          <Form 
           labelCol={{
            span: 3,
          }}
          wrapperCol={{
            span: 10,
          }}
          onFinish={handleSubmit}
          // onValuesChange={(e)=>{
          //   handleProductChange(e);
          //   handleQuantityChange(e);
          // }}
          >
            <Form.Item
             name="ProductionName"
             label="Product"
             id="productionName"
             
             rules={[
              {
                required: true,
              },
            ]}>
            <Select
              showSearch
              filterOption={(input, option) => {
                return (
                  option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                  option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                );
              }}
             
              // value={product}
            >
              {
                dummydata.map(e => (
                  <Option title={e.name} value={e.id} key={e.id}>{e.name}</Option>
                ))
              }
            </Select>
          </Form.Item>
            <Form.Item
             name="ProductionQuantity"
             label="Quantity"
             id="productionQuantity"
             rules={[
              {
                required: true,
              },
            ]}
            >
                <InputNumber
                min={1}
              />
            </Form.Item>
            <Form.Item style={{marginLeft:'90px'}}>
                <Button type='primary' style={{marginTop:'15px'}} htmlType='submit'>Add</Button>
            </Form.Item>

            
        </Form>
       </Addproduct>
    )
}

export default AddProduct;

const Addproduct = styled.div`
margin-bottom: 2%;
border: 2px solid white;
border-radius: 8px;
box-shadow: -5px 5px 23px -2px rgba(0,0,0,0.3);
-webkit-box-shadow: -5px 5px 23px -2px rgba(0,0,0,0.3);
-moz-box-shadow: -5px 5px 23px -2px rgba(0,0,0,0.3);
/* padding: 1%; */
padding: 8px;
// ::after{
//   content:"";
//   display: block;
//   height: 1.5px;
//   background: #c8cacb;
//   width: 100%;
//   position: relative;
//   margin-left:auto;
//   margin-right: auto;
//}
`