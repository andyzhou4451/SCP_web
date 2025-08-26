export interface GoodsSpuVO {
  /**
   * id
   */
  id: string | number;

  /**
   * 商品名称
   */
  spuName: string;

  /**
   * 商品编码/条码
   */
  productCode: string;

  /**
   * 商品预览图
   */
  spuImg: string;

  /**
   * 商品分类名称
   */
  productClassName: string;

  /**
   * 品牌名称
   */
  brandName: string;

  /**
   * 商品供货商
   */
  supplierId: string | number;

  /**
   * 商品仓库
   */
  warehouseId: string | number;

  /**
   * 商品来源：0-自建商品，1-供货商同步
   */
  productSource: string;

  /**
   * 发布状态：0-新建，1-上架，2-下架，3-待审核
   */
  publishStatus: string;

  /**
   * 计价方式：0-记重商品，1-一口价商品
   */
  priceMethod: string;

  /**
   * 开票类型  01金条  02黄金饰品
   */
  invoiceType: string;

  /**
   * 成色
   */
  quality: string;

  /**
   * 标签id，逗号分隔
   */
  labelId: string | number;

  /**
   * 状态：1-正常，0-禁用
   */
  status: string;

  /**
   * 租户编号
   */
  tenantId: string | number;

}

export interface GoodsSpuForm extends BaseEntity {
  /**
   * id
   */
  id?: string | number;

  /**
   * 商品名称
   */
  spuName?: string;

  /**
   * spu描述
   */
  spuDesc?: string;

  /**
   * 商品编码/条码
   */
  productCode?: string;

  /**
   * 商品分类
   */
  productClass?: string;

  /**
   * 商品预览图
   */
  spuImg?: string;

  /**
   * 商品分类名称
   */
  productClassName?: string;

  /**
   * 品牌id
   */
  brandId?: string | number;

  /**
   * 品牌名称
   */
  brandName?: string;

  /**
   * 商品供货商
   */
  supplierId?: string | number;

  /**
   * 商品仓库
   */
  warehouseId?: string | number;

  /**
   * 商品来源：0-自建商品，1-供货商同步
   */
  productSource?: string;

  /**
   * 发布状态：0-新建，1-上架，2-下架，3-待审核
   */
  publishStatus?: string;

  /**
   * 计价方式：0-记重商品，1-一口价商品
   */
  priceMethod?: string;

  /**
   * 开票类型  01金条  02黄金饰品
   */
  invoiceType?: string;

  /**
   * 成色
   */
  quality?: string;

  /**
   * 标签id，逗号分隔
   */
  labelId?: string | number;

  /**
   * 供货商商品id(一个商品有一个供应商）
   */
  supplierSpuId?: string | number;

  /**
   * 是否允许其分销：0-否，1-是
   */
  isAllowDistribu?: string;

  /**
   * 状态：1-正常，0-禁用
   */
  status?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface GoodsSpuQuery extends PageQuery {

  /**
   * 商品名称
   */
  spuName?: string;

  /**
   * 商品编码/条码
   */
  productCode?: string;

  /**
   * 商品分类
   */
  productClass?: string;

  /**
   * 品牌id
   */
  brandId?: string | number;

  /**
   * 商品供货商
   */
  supplierId?: string | number;

  /**
   * 商品仓库
   */
  warehouseId?: string | number;

  /**
   * 租户编号
   */
  tenantId?: string | number;

    /**
     * 日期范围参数
     */
    params?: any;
}



