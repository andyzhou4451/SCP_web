export interface AfterSalesOrderDetailVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 售后订单号
   */
  afterSalesOrderNo: number;

  /**
   * 原订单明细ID
   */
  orderDetailNo: number;

  /**
   * SPU ID
   */
  spuId: string | number;

  /**
   * SPU名称
   */
  spuName: string;

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
   * 退款金额
   */
  afterSalesPrice: number;

  /**
   * 售后备注
   */
  remark: string;

}

export interface AfterSalesOrderDetailForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 售后订单号
   */
  afterSalesOrderNo?: number;

  /**
   * 原订单明细ID
   */
  orderDetailNo?: number;

  /**
   * SPU ID
   */
  spuId?: string | number;

  /**
   * SPU名称
   */
  spuName?: string;

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
   * 退款金额
   */
  afterSalesPrice?: number;

  /**
   * 售后备注
   */
  remark?: string;

}

export interface AfterSalesOrderDetailQuery extends PageQuery {

  /**
   * 售后订单号
   */
  afterSalesOrderNo?: number;

  /**
   * 原订单明细ID
   */
  orderDetailNo?: number;

  /**
   * SPU ID
   */
  spuId?: string | number;

  /**
   * SPU名称
   */
  spuName?: string;

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
   * 退款金额
   */
  afterSalesPrice?: number;

    /**
     * 日期范围参数
     */
    params?: any;
}



