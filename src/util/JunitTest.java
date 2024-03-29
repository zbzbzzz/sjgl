package util;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import com.teacherms.all.domain.*;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.google.gson.Gson;
import com.teacherms.satffinfomanage.service.AdminService;
import com.teacherms.satffinfomanage.service.TeacherService;
import com.teacherms.satffinfomanage.vo.TableInfoAndUserVo;
import com.teacherms.studentinfomanage.service.StudentService;
import com.teacherms.system.service.SystemService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:applicationContext*.xml" })
public class JunitTest {
	@Resource
	private AdminService adminService;
	@Resource
	private TeacherService teacherService;
	@Resource
	private SystemService systemService;
	@Resource
	private StudentService studentService;

	public void setAdminService(AdminService adminService) {
		this.adminService = adminService;
	}

	public void setTeacherService(TeacherService teacherService) {
		this.teacherService = teacherService;
	}

	public void setSystemService(SystemService systemService) {
		this.systemService = systemService;
	}

	public void setStudentService(StudentService studentService) {
		this.studentService = studentService;
	}

	@Test
	public void test11() {
		// PageVO<Object> list =
		// adminService.getSpecifiedInformationByPaging("TeacherAward", "1", "",
		// "20", "信息与计算机工程学院");
		// System.out.println(new Gson().toJson(list));
		TeacherInfo teacherInfo = null;
		System.out.println(teacherInfo == null);
	}

	@Test
	public void test12() {
		TableInfoAndUserVo list = adminService.getTeacherTableInfoById("TeacherAward",
				"0c52c25a-b844-4e6d-9b33-576e8938c611");
		System.out.println(new Gson().toJson(list));
	}

	@Test
	public void test_export() {
		// XSSFWorkbook workbook = adminService.getExcel("1,2,3,6,7,8,9,14,15",
		// "TeacherInfo",
		// "649674ef-66c8-4ec1-9eb6-60761e95a708,6fd38307-40af-4e7c-8042-e6d542e56755");
		XSSFWorkbook workbook = adminService.getExcel("12,10,9,8,7", "TeacherAward",
				"016a004d-9b9e-4244-9f56-da94b60daf75,04248d06-3c45-476c-ad4e-ba8945186646,044a2baf-d4e9-4b11-8d27-511fe3ca6db3");
		try {
			FileOutputStream out = new FileOutputStream("E:/Attachment/张三/TeacherAward/test.xlsx");
			workbook.write(out);
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Test
	public void getIdByName() {
		System.out.println(adminService.getUserIdOrderingByUserName("罗晓娟,lu"));
	}

	@Test
	public void getQueryInfo() {
		PageVO<Object> pageVO = adminService.getSpecifiedInformationByPaging("TeacherInfo", "1", "", "40", "信息与计算机工程学院",
				new TeacherInfo(null, null, null, null, null, null, null, null, null, null, null, null, null, null,
						null, null, null, null, "2000/1,2017/1", null, null, null, null, null, null, null, null, null,
						null, null, null, null, null, null, null, null, null, null, null, null, null, null, null),
				null, null);
		System.out.println(pageVO.toString());
	}

	@Test
	public void test_modifyIntroduction() {
		try {
			System.out.println(adminService.modifyIntroduction(new Introduction(1, null, null, null, "111", null)));
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		}
	}

	@Test
	public void test_curingInfomation() {
		try {
			System.out.println(adminService.curingInfomation(new TeacherInfo("dd12c8ec-4d22-4ff9-a024-22e3071dc8bb",
					"23010007", null, null, null, null, null, null, null, null, null, null, null, null, null, null,
					null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
					null, null, null, null, null, null, null, null, "0000", "20", TimeUtil.getStringDay())));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Test
	public void test_getAllAdminUser() {
		try {
			System.out.println(systemService.getAllAdminUser());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Test
	public void test_getDE() {
		try {
			System.out.println(systemService.GetTheDepartmentWithTheCollege());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/*---------------------------------------------------------------------------*/
	@Test
	public void test_teacher_export() {
		XSSFWorkbook workbook = teacherService.getExcel("1,2,3,6,7,8,9,14,15", "TeacherAward",
				"8aa24038-0f98-49ff-bd91-d74cc18bbc81,8b82b969-b5c9-4741-bb9f-736ed2dfbc50");
		try {
			FileOutputStream out = new FileOutputStream("E:/Attachment/张三/TeacherAward/teacher.xlsx");
			workbook.write(out);
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Test
	public void test_userGetTeacherInfo() {
		System.out.println(teacherService.userGetTeacherInfo("23010003"));
	}

	@Test
	public void test_PuchInfoToadmin() {
		teacherService.PuchInfoToadmin("TeacherInfo", "e6ce9843-8fb0-405a-ab04-35176538ca7e");
	}

	@Test
	public void test_teacher_getallinfo() {
		// PageVO<Object> listAdmin =
		// teacherService.getTableInfoInPaging("1001", "TeacherAward", "1", "");
		// System.out.println(new Gson().toJson(listAdmin));
	}

	@Test
	public void test_teacher_getoneinfo() {
		Object listAdmin = teacherService.userGetTableInfoByTableId("TeacherAward",
				"e6bb6dde-2ac5-4997-9b5d-b2fcc7e21ce2");
		System.out.println(new Gson().toJson(listAdmin));
	}

	@Test
	public void test_teacher_userAttachmentUpload() {
		List<File> file1 = new ArrayList<File>();
		List<String> file1FileName = new ArrayList<String>();
		List<String> file1ContentType = new ArrayList<String>();
		File fs = new File("E:/Attachment/imgtest");
		File[] files = fs.listFiles();
		System.out.println(files.length);
		for (File file2 : files) {
			if (!file2.isDirectory()) {
				file1.add(file2);
				file1FileName.add(file2.getName());
				String path = file2.getAbsolutePath();
				file1ContentType.add(path.substring(path.indexOf("."), path.length()));
			}
		}
		teacherService.userAttachmentUpload(file1, file1FileName, file1ContentType, "何毅", "TeacherAward",
				"f2046bac-f4b9-4629-b35b-78f94010cb8d");
	}

	/*
	 * @Test public void getBase64() { List<String> info =
	 * teacherService.getImage("张三", "TeacherAward",
	 * "0c52c25a-b844-4e6d-9b33-576e8938c611"); for (String str : info) {
	 * System.out.println(str.length()); System.out.println(); } }
	 */

	/*---------------------------------------------------------------------------*/

	@Test
	public void test_getAllinfo() {
		PageVO<Object> pageVO = studentService.getSpecifiedInformationByPaging("StudentProject", "1", "", "20",
				"信息与计算机工程学院", new StudentProject(), new User(), "1");
		System.out.println(pageVO);
	}

	@Test
	public void test_getStudentAllInfo() {
		try {
			System.out.println(studentService.getStudentAllInfo("StudentAward", "1"));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Test
	public void test_getStudentOneInfo() {
		try {
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Test
	public void test111() {
		System.out.println(md5.GetMD5Code("admin"));
	}

}
