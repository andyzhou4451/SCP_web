export interface OriginalOrderVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 原始订单号(渠道订单号)
   */
  originalOrderNo: string;

  /**
   * 销售渠道(如:鲁商生活)
   */
  saleChannelId: string | number;

  /**
   * 店铺ID
   */
  saleShoppeId: string | number;

  /**
   * 店铺名称
   */
  saleShoppeName: string;

  /**
   * 用户ID
   */
  userId: string | number;

  /**
   * 订单日期
   */
  orderDate: string;

  /**
   * 订单状态
   */
  saleStatus: string;

  /**
   * 售后状态
   */
  afterSalesStatus: string;

  /**
   * 收货人
   */
  receiverName: string;

  /**
   * 收货电话
   */
  receiverMobile: string;

  /**
   * 收货地址
   */
  receiverAddress: string;

  /**
   * 订单总金额
   */
  orderPrice: number;

  /**
   * 运费金额
   */
  shippingFee: number;

  /**
   * 优惠金额
   */
  discountFee: number;

  /**
   * 实付金额(支付后填写)
   */
  paidPrice: string | number;

  /**
   * 支付方式
   */
  paymentMethod: string;

  /**
   * 支付时间
   */
  paymentTime: string;

  /**
   * 订单来源(APP/小程序/PC)
   */
  sourceType: string;

  /**
   * 配送方式(快递/自提)
   */
  deliveryType: string;

  /**
   * 订单备注
   */
  remark: string;

  /**
   * 原始信息
   */
  rawInfo: string;

}

export interface OriginalOrderForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 原始订单号(渠道订单号)
   */
  originalOrderNo?: string;

  /**
   * 销售渠道(如:鲁商生活)
   */
  saleChannelId?: string | number;

  /**
   * 店铺ID
   */
  saleShoppeId?: string | number;

  /**
   * 店铺名称
   */
  saleShoppeName?: string;

  /**
   * 用户ID
   */
  userId?: string | number;

  /**
   * 订单日期
   */
  orderDate?: string;

  /**
   * 订单状态
   */
  saleStatus?: string;

  /**
   * 售后状态
   */
  afterSalesStatus?: string;

  /**
   * 收货人
   */
  receiverName?: string;

  /**
   * 收货电话
   */
  receiverMobile?: string;

  /**
   * 收货地址
   */
  receiverAddress?: string;

  /**
   * 订单总金额
   */
  orderPrice?: number;

  /**
   * 运费金额
   */
  shippingFee?: number;

  /**
   * 优惠金额
   */
  discountFee?: number;

  /**
   * 实付金额(支付后填写)
   */
  paidPrice?: string | number;

  /**
   * 支付方式
   */
  paymentMethod?: string;

  /**
   * 支付时间
   */
  paymentTime?: string;

  /**
   * 订单来源(APP/小程序/PC)
   */
  sourceType?: string;

  /**
   * 配送方式(快递/自提)
   */
  deliveryType?: string;

  /**
   * 订单备注
   */
  remark?: string;

  /**
   * 原始信息
   */
  rawInfo?: string;

}

export interface OriginalOrderQuery extends PageQuery {

  /**
   * 原始订单号(渠道订单号)
   */
  originalOrderNo?: string;

  /**
   * 销售渠道(如:鲁商生活)
   */
  saleChannelId?: string | number;

  /**
   * 店铺ID
   */
  saleShoppeId?: string | number;

  /**
   * 店铺名称
   */
  saleShoppeName?: string;

  /**
   * 用户ID
   */
  userId?: string | number;

  /**
   * 订单日期
   */
  orderDate?: string;

  /**
   * 订单状态
   */
  saleStatus?: string;

  /**
   * 售后状态
   */
  afterSalesStatus?: string;

  /**
   * 收货人
   */
  receiverName?: string;

  /**
   * 收货电话
   */
  receiverMobile?: string;

  /**
   * 收货地址
   */
  receiverAddress?: string;

  /**
   * 订单总金额
   */
  orderPrice?: number;

  /**
   * 运费金额
   */
  shippingFee?: number;

  /**
   * 优惠金额
   */
  discountFee?: number;

  /**
   * 实付金额(支付后填写)
   */
  paidPrice?: string | number;

  /**
   * 支付方式
   */
  paymentMethod?: string;

  /**
   * 支付时间
   */
  paymentTime?: string;

  /**
   * 订单来源(APP/小程序/PC)
   */
  sourceType?: string;

  /**
   * 配送方式(快递/自提)
   */
  deliveryType?: string;

  /**
   * 原始信息
   */
  rawInfo?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



