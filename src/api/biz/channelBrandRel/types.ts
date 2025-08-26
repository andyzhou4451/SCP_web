export interface ChannelBrandRelVO {
  /**
   * ID
   */
  id: string | number;

  /**
   * 运营主体ID
   */
  businessId: string | number;

  /**
   * 商品中心品牌ID
   */
  brandId: string | number;

  /**
   * 商品中心品牌名称
   */
  className: string;

  /**
   * 渠道ID
   */
  channelId: string | number;

  /**
   * 渠道名称
   */
  channelName: string;

  /**
   * 渠道侧品牌ID
   */
  channelBrandId: string | number;

  /**
   * 渠道侧品牌名称
   */
  channelBrandName: string;

  /**
   * 状态（0禁用 1正常）
   */
  status: string;

  /**
   * 备注
   */
  remark: string;

}

export interface ChannelBrandRelForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number;

  /**
   * 运营主体ID
   */
  businessId?: string | number;

  /**
   * 商品中心品牌ID
   */
  brandId?: string | number;

  /**
   * 商品中心品牌名称
   */
  className?: string;

  /**
   * 渠道ID
   */
  channelId?: string | number;

  /**
   * 渠道名称
   */
  channelName?: string;

  /**
   * 渠道侧品牌ID
   */
  channelBrandId?: string | number;

  /**
   * 渠道侧品牌名称
   */
  channelBrandName?: string;

  /**
   * 状态（0禁用 1正常）
   */
  status?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface ChannelBrandRelQuery extends PageQuery {

  /**
   * 运营主体ID
   */
  businessId?: string | number;

  /**
   * 商品中心品牌ID
   */
  brandId?: string | number;

  /**
   * 商品中心品牌名称
   */
  className?: string;

  /**
   * 渠道ID
   */
  channelId?: string | number;

  /**
   * 渠道名称
   */
  channelName?: string;

  /**
   * 渠道侧品牌ID
   */
  channelBrandId?: string | number;

  /**
   * 渠道侧品牌名称
   */
  channelBrandName?: string;
  /**
   * 品牌编码：同时支持商品中心品牌ID和渠道侧品牌ID的精确查询
   */
  brandCode?: string;
  /**
   * 状态（0禁用 1正常）
   */
  status?: string;

  /***
   日期范围参数
     */
  params?: any;
}



