
import styled from "styled-components";
import AddProduct from './AddProducts';
import { useState } from "react";
import EachItem from "./Item";
import { Button, Col, Row } from "antd";
import { DatePicker, Form, Input } from 'antd';
import { UpdateChalanItem, UpdateDeliveryChalani } from "../../Services/appServices/ProductionService";
import { generateUrlEncodedData } from '../../Services/utils/generateUrlEncodedData'
import { newTableStyles } from "../../Components/Common/TableStyles";


const ItemList = () => {


  const [chalaniData, setChalaniData] = useState([]);
  const [items, setItems] = useState([]);
  const [partyData, setPartyData] = useState([]);
  const [headData, setHeadData] = useState([]);



  // const ChalanData = ()=>{

  //   // setAllChalaniData(tempData)

  // }

  const handleAllData = (e) => {
    // console.log(items);
    let Party = {
      "DCId": 1,
      "PartyId": 2,
      "PartyName": e.PartyName,
      "PartyAddress": e.PartyAddress,
      "UserId": 5,
      "EntryDate": "2022-07-06T11:27:55.5756515+05:45",
      "DeliveryDate": "2022-07-06T11:27:55.5756515+05:45",
      "Remarks": e.remarks,
      "IssuedBy": 9,
      "ReceivedBy": 10,
      "ApprovedBy": 11,
      "IsActive": true
    }
    setPartyData(Party);
    let chalaniNo = 0;
    UpdateDeliveryChalani(generateUrlEncodedData(partyData), (res) => {
      console.log(res);
      chalaniNo = res.CreatedId;


      for (let i = 0; i < items.length; i++) {

        let ChalanItems = {
          "CId": 0,
          "ChalaniNo": chalaniNo,
          "ItemId": 3,
          "Quantity": 4.1,
          "Remarks": "sample string 5",
          "IsActive": true

        }
        console.log(ChalanItems);
        //  console.log(ChalanItems);
        //  setChalaniData(ChalanItems);
        UpdateChalanItem(generateUrlEncodedData(ChalanItems), (res) => {
          console.log(res);
        })
      }

    })

  }
  const addItems = item => {
    const newItems = [...items, item]
    setItems(newItems);
  }
  const removeProduct = id => {
    const remove = [...items].filter(item => item.productionName !== id)
    setItems(remove);
  }

  console.log(items);
  // ======Print function=====//
  // const headersData = () => {
  //   if (tableData.length !== 0) {
  //     let tableKeys = Object.keys(tableData[0]);
  //     let data = []
  //     tableKeys.forEach(ele => {
  //       data.push({
  //         title: ele,
  //         dataIndex: ele,
  //         key: ele,
  //       })
  //     })

  //     setHeadData(data);
  //   }
  // }
  const headers = [
    { label: 'UserId', key: 'id' },
    { label: 'PId', key: 'PId' },

  ]

  const printHandle = () => {

    let newWindow = window.open()

    let newStyle = ``

    newStyle = `<style>thead > tr> th:first-child, thead > tr> th:nth-child(2), tbody > tr > td:first-child,tbody > tr > td:nth-child(2){
      display: none;
     }tbody > tr:last-child{
  background-color: #f0f0f2;
  }
  tbody > tr:last-child > td{
      font-size: 12px;
      font-weight: 500;
  }</style>`

    let refName = `
    <div style='text-align:center;'>
        <h1>Baker's Den Pvt.ltd<h1>
        <h3>Naxal, Bhatbhateni, Kathmandu, Phone: 01-4416560<h3>
        <p>Party Name: party name </p>
        <p>Date: 2022/01/34</p>
        <p>Delivery Date: 2022/01/35</p>
    </div>
  
    `;

    let tableBody = '';
    let tableHeadHtml = '<thead>';
    let columns = [];

    headers.forEach(ele => {
      tableHeadHtml += `<th>${ele?.label}</th>`;
      columns.push(ele.label);
    })
    tableHeadHtml += '</thead>';

    items.forEach(ele => {
      tableBody = tableBody + '<tr>'
      columns.forEach(cell => {
        tableBody = tableBody + '<td>' + ele[cell] + '</td>'
      })
      tableBody = tableBody + '</tr>'
    })

    let allTable = `<table>${tableHeadHtml}${tableBody}</table>`

    newWindow.document.body.innerHTML = newTableStyles + newStyle + refName + allTable

    setTimeout(function () {
      newWindow.print();
      newWindow.close();
    }, 300);
  }


  // console.log(headData)

  return (
    <>
      <Row>
        <Col span={12}>
          <AddProduct onSubmit={addItems} />
          <AddedProducts>
            <h2>Added Products:</h2>
            <EachItem items={items} removeProduct={removeProduct} />
          </AddedProducts>
        </Col>
        <Col span={12}>
          <FormStyled>
            <Form
              name="basic"
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 18,
              }}
              initialValues={{
                remember: true,
              }}
              autoComplete="off"
              onFinish={handleAllData}
            >
              <h2 style={{ textAlign: 'center' }}>Party Details:</h2>
              <Form.Item
                label="Party Name"
                name="PartyName"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Party Name!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Party Address"
                name="PartyAddress"
                rules={[
                  {
                    required: true,
                    message: 'Please input Party Address!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Entry Date"
                name="EntryDate"
                rules={[
                  {
                    required: true,
                    message: 'Please input Entry Date!',
                  },
                ]}
              >
                <DatePicker />
              </Form.Item>
              <Form.Item
                label="Remarks"
                name="Remarks"
                rules={[
                  {
                    required: true,
                    message: 'Please input Remarks!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item style={{ margin: '20px 110px' }}>
                <Button type='primary' htmlType="submit">Save And Print</Button>
              </Form.Item>

            </Form>
          </FormStyled>
        </Col>
      </Row>
      <Itemlist>

      </Itemlist>


    </>
  )

}

export default ItemList;




const Itemlist = styled.div`
margin-top: 2%;
width: 60%;
margin-left: 2%;
`

// {
//   "_Chalan": {
//     "DCId": 1,
//     "PartyId": 2,
//     "PartyName": "sample string 3",
//     "PartyAddress": "sample string 4",
//     "UserId": 5,
//     "EntryDate": "2022-07-05T17:23:58.1651819+05:45",
//     "DeliveryDate": "2022-07-05T17:23:58.1651819+05:45",
//     "Remarks": "sample string 8",
//     "IssuedBy": 9,
//     "ReceivedBy": 10,
//     "ApprovedBy": 11,
//     "IsActive": true
//   },
//   "_chalanItemDetails": [
//     {
//       "CId": 1,
//       "ChalaniNo": 2,
//       "ItemId": 3,
//       "Quantity": 4.1,
//       "Remarks": "sample string 5",
//       "IsActive": true
//     },
//     {
//       "CId": 1,
//       "ChalaniNo": 2,
//       "ItemId": 3,
//       "Quantity": 4.1,
//       "Remarks": "sample string 5",
//       "IsActive": true
//     }
//   ]
// }
const FormStyled = styled.div`
/* margin: 2% 2%; */
margin-left: 2%;
padding:2% 8%;
height: 350px;
border-left: 2px solid #c8cacb;
border: 2px solid white;
border-radius: 8px;
box-shadow: -1px 1px 6px 2px rgba(186,186,186,0.75);
-webkit-box-shadow: -1px 1px 6px 2px rgba(186,186,186,0.75);
-moz-box-shadow: -1px 1px 6px 2px rgba(186,186,186,0.75);
`
const AddedProducts = styled.div`
border: 2px solid white;
border-radius: 8px;
box-shadow: -1px 1px 6px 2px rgba(186,186,186,0.75);
-webkit-box-shadow: -1px 1px 6px 2px rgba(186,186,186,0.75);
-moz-box-shadow: -1px 1px 6px 2px rgba(186,186,186,0.75);
`