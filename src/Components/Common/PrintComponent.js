import { Button, message } from "antd";
import React from "react";
import { CSVLink } from "react-csv";
import { newTableStyles } from "./TableStyles";
import { companyDetail } from "../../Helpers/CompanyDetails";

const PrintComponent = ({
  addname,
  ProductList,
  ProductionList,
  headers,
  forCSV,
  forPrint,
  remainingProduction,
  ChalaniItemList,
  modalHeaders,
  tempPartyDetails,
}) => {
  //print handler
  //needs csvData, tableHead, fromTodate
  const printHandle = () => {
    if (!remainingProduction && !ChalaniItemList && !ProductionList) {
      var temp = addname();
    }

    // console.log("temp", temp);

    if (
      ProductList ||
      remainingProduction ||
      ProductionList ||
      ChalaniItemList !== 0 ||
      undefined
    ) {
      let newWindow = window.open();

      let newStyle = ``;

      newStyle = `<style>thead > tr> th:first-child, thead > tr> th:nth-child(2), tbody > tr > td:first-child,tbody > tr > td:nth-child(2){
      
       }tbody > tr:last-child{
    // background-color: #f0f0f2;
 
    }
    tbody > tr:last-child > td{
        // font-size: 12px;
        // font-weight: 500;
    }</style>`;

      if (tempPartyDetails) {
        var modalAdditionalHeader = `
       <p>Party Name:  ${tempPartyDetails.PartyName}</p>
          <p>Production Date: ${tempPartyDetails.EntryDate.slice(0, 10)}</p>
          <p>Delivery Date: ${tempPartyDetails.DeliveryDate.slice(0, 10)}</p>
        <h4 style="text-align:center;">Chalani Details<h4>
    `;
      }

      let refName = `
         <div style='text-align:center;'>
          <h1>${companyDetail.companyName}<h1>
          <h3>${companyDetail.companyAddress}, Phone:${
        companyDetail.companyPhoneNo
      }<h3>
           <h4>${
             ChalaniItemList || remainingProduction
               ? ""
               : companyDetail.reportName
           }<h4>
           <h4>${remainingProduction ? "Remaining Production Data" : ""}<h4>
      </div>

    
      `;
      let footer = `
      <div 
      style='display: flex;
      justify-content: space-between;
      margin-top: 50px;
      font-size: 14px;
      
      '
      >
      <p style='border-top:1px solid black; padding-top: 10px;'>Issued By</p>
      <p style='border-top:1px solid black; padding-top: 10px;'>Received By</p>
      <p style='border-top:1px solid black; padding-top: 10px;'>Approved By</p>
      </div>
      
      `;

      let tableBody = "";
      let tableHeadHtml = "<thead>";
      let columns = [];

      if (headers) {
        headers.forEach((ele) => {
          tableHeadHtml += `<th>${ele?.label}</th>`;
          columns.push(ele.key);
        });
        tableHeadHtml += "</thead>";
        if (temp) {
          let productListWithoutTime = temp.map((e) => {
            return { ...e, EntryDate: e.EntryDate.slice(0, 10) };
          });

          productListWithoutTime.forEach((ele) => {
            tableBody = tableBody + "<tr>";
            columns.forEach((cell) => {
              tableBody = tableBody + "<td>" + ele[cell] + "</td>";
            });
            tableBody = tableBody + "</tr>";
          });
        } else if (remainingProduction) {
          remainingProduction.forEach((ele) => {
            tableBody = tableBody + "<tr>";
            columns.forEach((cell) => {
              tableBody = tableBody + "<td>" + ele[cell] + "</td>";
            });
            tableBody = tableBody + "</tr>";
          });
        } else if (ProductionList) {
          let productionListWithoutTime = ProductionList.map((e) => {
            return {
              ...e,
              EntryDate: e.EntryDate.slice(0, 10),
              DeliveryDate: e.DeliveryDate.slice(0, 10),
            };
          });

          productionListWithoutTime.forEach((ele) => {
            tableBody = tableBody + "<tr>";
            columns.forEach((cell) => {
              tableBody = tableBody + "<td>" + ele[cell] + "</td>";
            });
            tableBody = tableBody + "</tr>";
          });
        }
        let allTable = `<table>${tableHeadHtml}${tableBody}</table>`;

        newWindow.document.body.innerHTML =
          newTableStyles + newStyle + refName + allTable;

        setTimeout(function () {
          newWindow.print();
          newWindow.close();
        }, 300);
      } else {
        modalHeaders.forEach((ele) => {
          tableHeadHtml += `<th>${ele?.label}</th>`;
          columns.push(ele.label);
        });
        tableHeadHtml += "</thead>";

        ChalaniItemList.forEach((ele) => {
          tableBody = tableBody + "<tr>";
          columns.forEach((cell) => {
            console.log(ele);
            tableBody = tableBody + "<td>" + ele[cell] + "</td>";
          });
          tableBody = tableBody + "</tr>";
        });

        let allTable = `<table>${tableHeadHtml}${tableBody}</table>`;

        newWindow.document.body.innerHTML =
          newTableStyles +
          newStyle +
          refName +
          modalAdditionalHeader +
          allTable +
          footer;

        setTimeout(function () {
          newWindow.print();
          newWindow.close();
        }, 300);
      }
    } else {
      message.info("select some data");
    }
  };

  return (
    <>
      {forPrint && (
        <Button
          type="primary"
          style={{ marginLeft: "16px", float: "right" }}
          onClick={printHandle}
        >
          Print
        </Button>
      )}

      {forCSV && (
        <Button type="primary" style={{ float: "right" }}>
          <CSVLink
            data={ProductList !== undefined ? ProductList : ""}
            filename={"ProductionData.csv"}
          >
            Export to CSV
          </CSVLink>
        </Button>
      )}
    </>
  );
};

export default PrintComponent;
