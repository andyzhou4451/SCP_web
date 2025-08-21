export interface ShippingInfoVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 订单号
   */
  orderNo: number;

  /**
   * 物流公司
   */
  deliverCompany: string;

  /**
   * 物流单号
   */
  deliverNo: string;

  /**
   * 发货时间
   */
  shippingTime: string;

  /**
   * SKU ID
   */
  skuId: string | number;

  /**
   * 商品名称
   */
  skuName: string;

  /**
   * 商品规格
   */
  skuAttr: string;

  /**
   * 商品售后数量
   */
  skuNum: string;

  /**
   * 收货人
   */
  receiverName: string;

  /**
   * 收货电话
   */
  receiverPhone: string;

  /**
   * 收货地址
   */
  receiverAddress: string;

  /**
   * 发货时间
   */
  deliverTime: string;

  /**
   * 签收时间
   */
  signTime: string;

}

export interface ShippingInfoForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 订单号
   */
  orderNo?: number;

  /**
   * 物流公司
   */
  deliverCompany?: string;

  /**
   * 物流单号
   */
  deliverNo?: string;

  /**
   * 发货时间
   */
  shippingTime?: string;

  /**
   * SKU ID
   */
  skuId?: string | number;

  /**
   * 商品名称
   */
  skuName?: string;

  /**
   * 商品规格
   */
  skuAttr?: string;

  /**
   * 商品售后数量
   */
  skuNum?: string;

  /**
   * 收货人
   */
  receiverName?: string;

  /**
   * 收货电话
   */
  receiverPhone?: string;

  /**
   * 收货地址
   */
  receiverAddress?: string;

  /**
   * 发货时间
   */
  deliverTime?: string;

  /**
   * 签收时间
   */
  signTime?: string;

}

export interface ShippingInfoQuery extends PageQuery {

  /**
   * 订单号
   */
  orderNo?: number;

  /**
   * 物流公司
   */
  deliverCompany?: string;

  /**
   * 物流单号
   */
  deliverNo?: string;

  /**
   * 发货时间
   */
  shippingTime?: string;

  /**
   * SKU ID
   */
  skuId?: string | number;

  /**
   * 商品名称
   */
  skuName?: string;

  /**
   * 商品规格
   */
  skuAttr?: string;

  /**
   * 商品售后数量
   */
  skuNum?: string;

  /**
   * 收货人
   */
  receiverName?: string;

  /**
   * 收货电话
   */
  receiverPhone?: string;

  /**
   * 收货地址
   */
  receiverAddress?: string;

  /**
   * 发货时间
   */
  deliverTime?: string;

  /**
   * 签收时间
   */
  signTime?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



