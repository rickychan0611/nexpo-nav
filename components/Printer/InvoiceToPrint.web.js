import React, { useContext, useState, useEffect } from "react";
import moment from "moment";

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
              GST#: 8083866650
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
                訂單號: {this.props.order.orderId}
              </div>
            </div>

            <div className="rightLine" style={{ flex: 1 }}>
              <div className="cell">
                {this.props.order.status}

             </div>
            </div>

            <div className="rightLine" style={{ flex: 1 }}>
              <div className="cell">
              未付款  {this.props.order.paymentStatus}
              </div>
            </div>

          </div>


          <div className="row">

            <div className="rightLine" style={{ flex: 2 }}>
              <div className="cell left">
                訂單時間: {moment(this.props.order.createAt.toDate()).format("YYYY-MM-DD h:mm A")}
              </div>
            </div>

            <div className="rightLine" style={{ flex: 1 }}>
              <div className="cell center">
                GST: {this.props.order.gst}
              </div>
            </div>

            <div className="rightLine" style={{ flex: 1 }}>
              <div className="cell center">
                實付: ${this.props.order.total_amt}
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
              {this.props.order.orderItems.map((orderItem) => {
                let item = orderItem.item
                return (
                  <tr className="bottomLine">
                    <td className="rightLine pad" style={{ width: "60%" }}>{item.chineseName} ({item.unit})</td>
                    <td className="rightLine center pad">{orderItem.quantity}</td>
                    <td className="rightLine center pad">{item.final_price}</td>
                    <td className="center pad">${(+item.final_price * +orderItem.quantity).toFixed(2)}</td>
                  </tr>
                )
              })}
              {this.props.order.orderItems.map((orderItem) => {
                let item = orderItem.item
                return (
                  <tr className="bottomLine">
                    <td className="rightLine pad" style={{ width: "60%" }}>{item.chineseName} ({item.unit})</td>
                    <td className="rightLine center pad">{orderItem.quantity}</td>
                    <td className="rightLine center pad">{item.final_price}</td>
                    <td className="center pad">${(+item.final_price * +orderItem.quantity).toFixed(2)}</td>
                  </tr>
                )
              })}
              {this.props.order.orderItems.map((orderItem) => {
                let item = orderItem.item
                return (
                  <tr className="bottomLine">
                    <td className="rightLine pad" style={{ width: "60%" }}>{item.chineseName} ({item.unit})</td>
                    <td className="rightLine center pad">{orderItem.quantity}</td>
                    <td className="rightLine center pad">{item.final_price}</td>
                    <td className="center pad">${(+item.final_price * +orderItem.quantity).toFixed(2)}</td>
                  </tr>
                )
              })}
              {this.props.order.orderItems.map((orderItem) => {
                let item = orderItem.item
                return (
                  <tr className="bottomLine">
                    <td className="rightLine pad" style={{ width: "60%" }}>{item.chineseName} ({item.unit})</td>
                    <td className="rightLine center pad">{orderItem.quantity}</td>
                    <td className="rightLine center pad">{item.final_price}</td>
                    <td className="center pad">${(+item.final_price * +orderItem.quantity).toFixed(2)}</td>
                  </tr>
                )
              })}
              {this.props.order.orderItems.map((orderItem) => {
                let item = orderItem.item
                return (
                  <tr className="bottomLine">
                    <td className="rightLine pad" style={{ width: "60%" }}>{item.chineseName} ({item.unit})</td>
                    <td className="rightLine center pad">{orderItem.quantity}</td>
                    <td className="rightLine center pad">{item.final_price}</td>
                    <td className="center pad">${(+item.final_price * +orderItem.quantity).toFixed(2)}</td>
                  </tr>
                )
              })}
              {this.props.order.orderItems.map((orderItem) => {
                let item = orderItem.item
                return (
                  <tr className="bottomLine">
                    <td className="rightLine pad" style={{ width: "60%" }}>{item.chineseName} ({item.unit})</td>
                    <td className="rightLine center pad">{orderItem.quantity}</td>
                    <td className="rightLine center pad">{item.final_price}</td>
                    <td className="center pad">${(+item.final_price * +orderItem.quantity).toFixed(2)}</td>
                  </tr>
                )
              })}
              {this.props.order.orderItems.map((orderItem) => {
                let item = orderItem.item
                return (
                  <tr className="bottomLine">
                    <td className="rightLine pad" style={{ width: "60%" }}>{item.chineseName} ({item.unit})</td>
                    <td className="rightLine center pad">{orderItem.quantity}</td>
                    <td className="rightLine center pad">{item.final_price}</td>
                    <td className="center pad">${(+item.final_price * +orderItem.quantity).toFixed(2)}</td>
                  </tr>
                )
              })}
              {this.props.order.orderItems.map((orderItem) => {
                let item = orderItem.item
                return (
                  <tr className="bottomLine">
                    <td className="rightLine pad" style={{ width: "60%" }}>{item.chineseName} ({item.unit})</td>
                    <td className="rightLine center pad">{orderItem.quantity}</td>
                    <td className="rightLine center pad">{item.final_price}</td>
                    <td className="center pad">${(+item.final_price * +orderItem.quantity).toFixed(2)}</td>
                  </tr>
                )
              })}
              {this.props.order.orderItems.map((orderItem) => {
                let item = orderItem.item
                return (
                  <tr className="bottomLine">
                    <td className="rightLine pad" style={{ width: "60%" }}>{item.chineseName} ({item.unit})</td>
                    <td className="rightLine center pad">{orderItem.quantity}</td>
                    <td className="rightLine center pad">{item.final_price}</td>
                    <td className="center pad">${(+item.final_price * +orderItem.quantity).toFixed(2)}</td>
                  </tr>
                )
              })}
              {this.props.order.orderItems.map((orderItem) => {
                let item = orderItem.item
                return (
                  <tr className="bottomLine">
                    <td className="rightLine pad" style={{ width: "60%" }}>{item.chineseName} ({item.unit})</td>
                    <td className="rightLine center pad">{orderItem.quantity}</td>
                    <td className="rightLine center pad">{item.final_price}</td>
                    <td className="center pad">${(+item.final_price * +orderItem.quantity).toFixed(2)}</td>
                  </tr>
                )
              })}
              <tr className="bottomLine">
                <td colspan="4" className="pad">備注：</td>
              </tr>
              <tr className="bottomLine">
                <td colspan="4" className="pad">配送信息：{this.props.order.shippingAddress.message}<br />
            用戶名：{this.props.order.shippingAddress.firstName} {this.props.order.shippingAddress.lastName}<br />
            聯系電話：{this.props.order.shippingAddress.phoneNumber}<br />
            運費：{this.props.order.shippingFee}<br />
            地址：<br/>
            {this.props.order.shippingAddress.address1} <br/>
            {this.props.order.shippingAddress.address2 && <> {this.props.order.shippingAddress.address2} <br/> </>}
            {this.props.order.shippingAddress.city}, {this.props.order.shippingAddress.province} <br/>
            {this.props.order.shippingAddress.postalCode}
            </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  };
};

export default ComponentToPrint;