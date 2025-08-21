import request from '@/utils/request';

export interface RegionVO {
  code: string;
  name: string;
  level: number;
  parentCode?: string;
}

export function listProvinces() {
  return request<RegionVO[]>({ url: '/biz/region/level/1', method: 'get' });
}

export function listChildren(parentCode: string) {
  return request<RegionVO[]>({ url: `/biz/region/children/${parentCode}`, method: 'get' });
}

// 可选：编辑回显时用
export function resolvePathByName(params: { province: string; city: string; district: string; street?: string }) {
  return request<{ provinceCode: string; cityCode: string; districtCode: string; streetCode?: string }>({
    url: '/biz/region/path',
    method: 'get',
    params
  });
}
