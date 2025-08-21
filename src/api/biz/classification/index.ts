import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { ClassificationVO, ClassificationForm, ClassificationQuery } from '@/api/biz/classification/types';

/**
 * 查询自营商品平台商品分类列表
 * @param query
 * @returns {*}
 */

export const listClassification = (query?: ClassificationQuery): AxiosPromise<ClassificationVO[]> => {
  return request({
    url: '/biz/classification/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询自营商品平台商品分类详细
 * @param id
 */
export const getClassification = (id: string | number): AxiosPromise<ClassificationVO> => {
  return request({
    url: '/biz/classification/' + id,
    method: 'get'
  });
};

/**
 * 新增自营商品平台商品分类
 * @param data
 */
export const addClassification = (data: ClassificationForm) => {
  return request({
    url: '/biz/classification',
    method: 'post',
    data: data
  });
};

/**
 * 修改自营商品平台商品分类
 * @param data
 */
export const updateClassification = (data: ClassificationForm) => {
  return request({
    url: '/biz/classification',
    method: 'put',
    data: data
  });
};

/**
 * 删除自营商品平台商品分类
 * @param id
 */
export const delClassification = (id: string | number | Array<string | number>) => {
  return request({
    url: '/biz/classification/' + id,
    method: 'delete'
  });
};
