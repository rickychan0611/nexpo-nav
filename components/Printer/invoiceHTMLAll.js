import React, { useRef, useContext, useEffect, useState } from "react";

import moment from 'moment';


const invoiceHTML = (allOrders) => {
  return `
    <!DOCTYPE html>
    <html>
    <body>
    <style>

    @media all {
    .page-break {
        display: none;
    }
    }
    
    @media print {
    html, body {
        height: initial !important;
        overflow: initial !important;
        -webkit-print-color-adjust: exact;
        font-size: 16px;
    }
    }
    
    @media print {
    .page-break {
        margin-top: 1rem;
        display: block;
        page-break-before: auto;
    }
    }
    
    @page {
    size: auto;
    margin: 20mm;
    }

    .table {
        width: 100%;
        text-align: center;
        border: 1px solid black;
        font-size: 16px;
    }

    .row {
        /* padding: 15px; */
        width: 100%;
        border-bottom: 1px solid black;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
    }

    .cell {
    margin: 10px;
    font-size: 16px;
    }

    .pad {
    padding: 7px;
    font-size: 16px;
    }

    .bottomLine {
    border-bottom: 1px solid black;
    font-size: 16px;
    }

    .rightLine {
    border-right: 1px solid black;
    font-size: 16px;
    }

    .left {
        text-align: left;
        font-size: 16px;
    }
    .center {
        text-align: center;
        font-size: 16px;
    }
    .grey {
        background-color: rgb(238, 238, 238);
    }
</style>

${allOrders.map((order, index) => {
    return (
      `
        <header>Item: ${index + 1} - Order ${order.orderId} ${"start----->"}</header>
        <div class="table">

          <div class="row grey">
            <div class="cell" style="flex: 1;">
              訂單信息
            </div>
          </div>


          <div class="row">

            <div class="rightLine" style="flex: 2;">
              <div class="cell left">
                訂單號: ${order.orderId}
              </div>
            </div>

            <div class="rightLine" style="flex: 1;">
              <div class="cell">
                ${order.status}

              </div>
            </div>

            <div class="rightLine" style="flex: 1;">
              <div class="cell">
                未付款  ${order.paymentStatus}
              </div>
            </div>

          </div>


          <div class="row">

            <div class="rightLine" style="flex: 2;">
              <div class="cell left">
                訂單時間: ${moment(order.createAt.toDate()).format("YYYY-MM-DD h:mm A")}
              </div>
            </div>

            <div class="rightLine" style="flex: 1;">
              <div class="cell center">
                GST: ${order.gst}
              </div>
            </div>

            <div class="rightLine" style="flex: 1;">
              <div class="cell center">
                實付: ${"$" + order.totalAmt}
              </div>
            </div>

          </div>

          <table style="width: 100%; border-collapse: collapse; ">
            <tbody>
              <tr class="bottomLine grey pad">
                <td class="rightLine pad" style="width: 60%, font-size: 16px;">名稱</td>
                <td class="rightLine center pad">數量</td>
                <td class="rightLine center pad">單價</td>
                <td class="center pad">總額</td>
              </tr>
              ${order.orderItems.map((orderItem) => {
                let item = orderItem.item
                return (
                  `<tr class="bottomLine pad">
                        <td class="rightLine pad left" style="width:60%;">${item.chineseName} (${item.unit})</td>
                        <td class="rightLine center pad">${orderItem.quantity}</td>
                        <td class="rightLine center pad">${item.final_price}</td>
                        <td class="center pad">${"$" + (+item.final_price * +orderItem.quantity).toFixed(2)}</td>
                    </tr>`
                )
              })}
              <tr class="bottomLine left">
                <td colspan="4" class="pad">備注：</td>
              </tr>
              <tr class="bottomLine left">
                <td colspan="4" class="pad">配送信息：${order.shippingAddress.message}<br />
                用戶名：${order.shippingAddress.firstName} ${order.shippingAddress.lastName}<br />
                聯系電話：${order.shippingAddress.phoneNumber}<br />
                運費：${order.shippingFee}<br />
                地址：
                ${order.shippingAddress.address1},&nbsp;
                ${order.shippingAddress.address2 && <>${order.shippingAddress.address2},&nbsp;</>}
                ${order.shippingAddress.city}, ${order.shippingAddress.province} ,&nbsp;
                ${order.shippingAddress.postalCode}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <footer className="page-break">${"<----- end "}Item: ${index + 1} - Order ${order.orderId}</footer>
      `
    )
  })}
        </body>
    </html>
     `
}

export default invoiceHTML;