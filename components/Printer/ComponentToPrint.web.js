import React, { useContext, useState, useEffect } from "react";

class ComponentToPrint extends React.Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th colspan="4">
              天天漁港(超市)送貨d到家 <br />
            Tin Tin Food Wholesale	<br />
            Unit 102 - 8828 Healther Street. Vancouver, BC, V6P 3S8
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="2"></td>
            <td>Tel: 604-558-1661</td>
            <td>GST: 8083866650</td>
          </tr>
          <tr>
            <td colspan="2">訂單時間: </td>
            <td colspan="2"> Payment: </td>
          </tr>
          <tr>
            <tr>
              <td colspan="4">訂單信息</td>
            </tr>
            <td>名稱</td>
            <td>數量</td>
            <td>單價</td>
            <td>總額</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td colspan="4">備注：</td>
          </tr>
          <tr>
            <td colspan="4">配送信息：<br />
            用戶名：<br />
            聯系電話：<br />
            運費：<br />
            地址：
            </td>
          </tr>
        </tbody>
      </table>
    );
  };
};

export default ComponentToPrint;