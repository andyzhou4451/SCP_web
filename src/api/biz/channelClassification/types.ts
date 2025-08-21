export interface ChannelClassificationVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 运营主体ID
   */
  tenantId: string | number;

  /**
   * 商品中心三级分类名称
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
   * 渠道三级分类ID
   */
  channelClassId: string | number;

  /**
   * 渠道三级分类名称
   */
  channelClassName: string;

  /**
   * 渠道三级分类编码
   */
  channelClassCode: string;

  /**
   * 状态（0禁用 1正常）
   */
  status: string;

  /**
   * 备注
   */
  remark: string;

}

export interface ChannelClassificationForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 运营主体ID
   */
  tenantId?: string | number;

  /**
   * 商品中心三级分类名称
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
   * 渠道三级分类ID
   */
  channelClassId?: string | number;

  /**
   * 渠道三级分类名称
   */
  channelClassName?: string;

  /**
   * 渠道三级分类编码
   */
  channelClassCode?: string;

  /**
   * 状态（0禁用 1正常）
   */
  status?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface ChannelClassificationQuery extends PageQuery {

  /**
   * 商品中心三级分类名称
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
   * 渠道三级分类ID
   */
  channelClassId?: string | number;

  /**
   * 渠道三级分类名称
   */
  channelClassName?: string;

  /**
   * 渠道三级分类编码
   */
  channelClassCode?: string;

  /**
   * 状态（0禁用 1正常）
   */
  status?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



