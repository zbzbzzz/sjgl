package com.teacherms.satffinfomanage.dao;

import java.util.List;
import com.teacherms.all.domain.*;
import com.teacherms.satffinfomanage.vo.TableInfoAndUserVo;

public interface AdminDao {

	/**
	 * ---获取指定状态的全部教职工信息
	 * 
	 * @param status
	 *            指定的状态
	 * @return 对象list集合
	 */
	List<Object> getAllStatusInfo(String table, String time, String status, String collegeName, String multi_condition,
			String fuzzy);

	/**
	 * ---通过ID获取用户信息
	 * 
	 * @param tableUserID
	 *            用户ID
	 * @return User对象
	 */
	User getUserById(String tableUserID);

	/**
	 * ---通过用户部分+表全信息
	 * 
	 * @param tableName
	 *            所要查询的表名
	 * @param tableId
	 *            数据的ID
	 * @return 信息记录对象
	 */
	TableInfoAndUserVo getInfoById(String tableName, String IdName, String tableId);

	/**
	 * 更新对象
	 * 
	 * @param obj
	 *            对像
	 */
	boolean updateInfo(Object obj);

	/**
	 * 添加对象
	 * 
	 * @param obj
	 * @return 1成功：0失败
	 */
	String addInfo(Object obj);

	/**
	 * --获取信息表中未审核信息数量
	 * 
	 * @param tableName
	 *            信息表名
	 * @return 总记录数
	 */
	Long getInformationCount(String tableName, String status);

	/**
	 * ---通过ID获取单条信息
	 * 
	 * @param tableName
	 *            所要查询的表名
	 * @param tableId
	 *            数据的ID
	 * @return 信息记录对象
	 */
	Object getAInfomationByTableId(String tableName, String tableInfoIdName, String string);

	/**
	 * 通过部门ID获取部门对象
	 * 
	 * @param departmentId
	 *            部门id
	 * @return 部门对象
	 */
	Department getDepartmentById(String departmentId);

	/**
	 * ---导出专用查询
	 * 
	 * @param tableName
	 * @param tableInfoIdName
	 * @param query_id
	 * @return
	 */
	List<Object> export_getAInfomationByTableId(String tableName, String tableInfoIdName, String query_id);

	/**
	 * 通过用户名称获取用户ID
	 * 
	 * @param name
	 *            用户名称
	 */
	List<String> getUserIdByUserName(String name);

	/**
	 * 获取单个介绍信息
	 * 
	 * @param tableId
	 *            表主键
	 * @return 介绍信息对象
	 */
	Introduction getOneOfIntroduction(String tableId);

	/**
	 * 修改介绍信息
	 * 
	 * @param introduction
	 *            介绍对象
	 * @return
	 */
	boolean modifyIntroduction(Introduction introduction) throws IllegalArgumentException, IllegalAccessException;

	/**
	 * 删除介绍信息
	 * 
	 * @param introduction
	 * @return
	 */
	boolean deleteInfo(Introduction introduction);

}
