-- 菜单 SQL
insert into sys_menu ( menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_dept, create_by, create_time, update_by, update_time, remark)
values( '敏感词管理', '1', '1', 'sensitiveWord', 'biz/sensitiveWord/index', 1, 0, 'C', '0', '0', 'biz:sensitiveWord:list', '#', 103, 1, sysdate(), null, null, '敏感词管理菜单');

-- 按钮 SQL
insert into sys_menu (menu_id, menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_dept, create_by, create_time, update_by, update_time, remark)
values(${table.menuIds[1]}, '敏感词管理查询', ${table.menuIds[0]}, '1',  '#', '', 1, 0, 'F', '0', '0', 'biz:sensitiveWord:query',        '#', 103, 1, sysdate(), null, null, '');

insert into sys_menu (menu_id, menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_dept, create_by, create_time, update_by, update_time, remark)
values(${table.menuIds[2]}, '敏感词管理新增', ${table.menuIds[0]}, '2',  '#', '', 1, 0, 'F', '0', '0', 'biz:sensitiveWord:add',          '#', 103, 1, sysdate(), null, null, '');

insert into sys_menu (menu_id, menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_dept, create_by, create_time, update_by, update_time, remark)
values(${table.menuIds[3]}, '敏感词管理修改', ${table.menuIds[0]}, '3',  '#', '', 1, 0, 'F', '0', '0', 'biz:sensitiveWord:edit',         '#', 103, 1, sysdate(), null, null, '');

insert into sys_menu (menu_id, menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_dept, create_by, create_time, update_by, update_time, remark)
values(${table.menuIds[4]}, '敏感词管理删除', ${table.menuIds[0]}, '4',  '#', '', 1, 0, 'F', '0', '0', 'biz:sensitiveWord:remove',       '#', 103, 1, sysdate(), null, null, '');

insert into sys_menu (menu_id, menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_dept, create_by, create_time, update_by, update_time, remark)
values(${table.menuIds[5]}, '敏感词管理导出', ${table.menuIds[0]}, '5',  '#', '', 1, 0, 'F', '0', '0', 'biz:sensitiveWord:export',       '#', 103, 1, sysdate(), null, null, '');
