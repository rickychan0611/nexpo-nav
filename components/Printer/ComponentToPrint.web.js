import React, { useContext, useState, useEffect } from "react";

class ComponentToPrint extends React.Component {
  render() {
    return (
      <>
        <div className="table">

          <div className="row" style={{ borderBottom: 0, margin: 15 }}>
            天天漁港(超市)送貨到家 <br /><br />
            Tin Tin Food Wholesale	<br />
            Unit 102 - 8828 Healther Street. Vancouver, BC, V6P 3S8
        </div>

          <div className="row">
            <div className="cell" style={{ flex: 1 }}>
              Tel: 604-558-1661
            </div>
            <div className="cell" style={{ flex: 1 }}>
              GST: 8083866650
            </div>
          </div>

          <div className="row">
            <div className="cell" style={{ flex: 1 }}>
              訂單信息
            </div>
          </div>


          <div className="row">

            <div className="rightLine" style={{ flex: 2 }}>
              <div className="cell left">
                訂單號: sdfasdfasdfasfsdfsdfsdf
             </div>
            </div>

            <div className="rightLine" style={{ flex: 1 }}>
              <div className="cell">
                未付款
             </div>
            </div>

            <div className="rightLine" style={{ flex: 1 }}>
              <div className="cell">
                等待接單
             </div>
            </div>

          </div>


          <div className="row">

            <div className="rightLine" style={{ flex: 2 }}>
              <div className="cell left">
                訂單時間:
              </div>
            </div>

            <div className="rightLine" style={{ flex: 1 }}>
              <div className="cell center">
                GST: 
                </div>
            </div>

            <div className="rightLine" style={{ flex: 1 }}>
              <div className="cell center">
                實付: (未付款)
                </div>
            </div>

          </div>

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr className="bottomLine grey" style={{ border: "1px solid black" }}>
                <td className="rightLine pad" style={{ width: "60%" }}>名稱</td>
                <td className="rightLine center pad">數量</td>
                <td className="rightLine center pad">單價</td>
                <td className="center">總額</td>
              </tr>
              <tr className="bottomLine">
                <td className="rightLine pad" style={{ width: "60%" }}>名稱</td>
                <td className="rightLine center pad" >數量</td>
                <td className="rightLine center pad">單價</td>
                <td className="center pad">總額</td>
              </tr>
              <tr className="bottomLine">
                <td colspan="4"  className="pad">備注：</td>
              </tr>
              <tr className="bottomLine">
                <td colspan="4"  className="pad">配送信息：<br />
            用戶名：<br />
            聯系電話：<br />
            運費：<br />
            地址：
            </td>
              </tr>
            </tbody>
          </table>


        </div>
        {/* <table> */}
        {/* <tbody>
          <tr className="row">
            <td>
              天天漁港(超市)送貨到家 <br />
            Tin Tin Food Wholesale	<br />
            Unit 102 - 8828 Healther Street. Vancouver, BC, V6P 3S8
            </td>
          </tr>

          <tr className="row">
            <td className="rightLine">Tel: 604-558-1661</td>
            {/* <td >GST: 8083866650</td> */}
        {/* </tr> */}

        {/* <tr className="bottomLine">
            <td colspan="4" className="rightLine">訂單號: </td>
            <td colspan="4" className="rightLine">未付款: </td>
            <td colspan="4" className="rightLine">等待接單: </td>

          </tr>

          <tr className="bottomLine">
            <td colspan="6"className="rightLine">訂單時間: </td>
            <td colspan="6"> 實付: (未付款) </td>
          </tr>
          </tr>
          <tr className="bottomLine">
            <td colspan="12" className="center">訂單信息</td>
          </tr>
          <tr className="bottomLine grey">
            <td colspan="6" className="rightLine">名稱</td>
            <td colspan="2" className="rightLine center">數量</td>
            <td colspan="2" className="rightLine center">單價</td>
            <td colspan="2" className="center">總額</td>
          </tr>
          <tr className="bottomLine">
            <td colspan="9" className="rightLine"></td>
            <td colspan="1" className="rightLine center"></td>
            <td colspan="1" className="rightLine center"></td>
            <td colspan="1" className="center"></td>
          </tr>
          <tr className="bottomLine">
            <td colspan="12">備注：</td>
          </tr>
          <tr className="bottomLine">
            <td colspan="12">配送信息：<br />
            用戶名：<br />
            聯系電話：<br />
            運費：<br />
            地址：
            </td>
          </tr> */}
        {/* </tbody>
      </table> */}
      </>
    );
  };
};

export default ComponentToPrint;