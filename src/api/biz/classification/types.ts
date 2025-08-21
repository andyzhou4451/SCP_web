export interface ClassificationVO {
  /**
   * 分类ID
   */
  id: string | number;

  /**
   * 父级分类ID
   */
  parentId: string | number;

  /**
   * 分类等级
   */
  classLevel: number;

  /**
   * 分类名称
   */
  className: string;

  /**
   * 分类编码
   */
  classCode: string;

  /**
   * 图标地址
   */
  icon: string;

  /**
   * 是否展示：0不展示 1展示
   */
  showStatus: number;

  /**
   * 排序
   */
  sort: number;

  /**
   * 状态（0禁用 1正常）
   */
  status: string;

  /**
   * 备注
   */
  remark: string;

    /**
     * 子对象
     */
    children: ClassificationVO[];
}

export interface ClassificationForm extends BaseEntity {
  /**
   * 分类ID
   */
  id?: string | number;

  /**
   * 父级分类ID
   */
  parentId?: string | number;

  /**
   * 分类等级
   */
  classLevel?: number;

  /**
   * 分类名称
   */
  className?: string;

  /**
   * 分类编码
   */
  classCode?: string;

  /**
   * 图标地址
   */
  icon?: string;

  /**
   * 是否展示：0不展示 1展示
   */
  showStatus?: number;

  /**
   * 排序
   */
  sort?: number;

  /**
   * 状态（0禁用 1正常）
   */
  status?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface ClassificationQuery {

  /**
   * 父级分类ID
   */
  parentId?: string | number;

  /**
   * 分类等级
   */
  classLevel?: number;

  /**
   * 分类名称
   */
  className?: string;

  /**
   * 分类编码
   */
  classCode?: string;

  /**
   * 图标地址
   */
  icon?: string;

  /**
   * 是否展示：0不展示 1展示
   */
  showStatus?: number;

  /**
   * 排序
   */
  sort?: number;

  /**
   * 状态（0禁用 1正常）
   */
  status?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



