/*程序功能: 要求按每个数的后三位的大小进行升序排列，如要出现后三位相等的数值，则对这些数值按原始4位数据进行降序排列，将排序后的前10个数存入数组bb中。最后调用函数writeDat()把结果bb输出到文件out.dat中
 * 时间:
 * 作者:
 *
 *
 */
#include<stdio.h>//include语句说明各函数中包含vc6.0中的标准输入输出库函数stdio.h
#include<string.h>//include语句说明各函数中包含vc6.0中的字符处理函数string.h
void readDat(); //输入函数readDat()的说明语句
void writeDat(); //输出函数writeDat()的说明语句
int aa[200] , bb[10]; //定义全局整型一维数组aa[200]和bb[10]

void jsSort()
{
}






void main()
{
	readDat(); //调用readDat()函数
	jsSort();
	writeDat();

}
void readDat()
{
	FILE *in; //定义文件指针变量fp
	int i; //定义整型变量i
	in = fopen("in.dat","r"); //以只读的方式打开文件in.dat，并用fp指向这个文件
	for (i = 0; i < 200; i++)
		fscanf(fp,"%d",&a[i]); //从文件in.dat中读取300个四位数到数组a中
	fclose(in); //关闭文件in.dat
}
void writeDat()
{
	FILE  *out; //定义文件指针变量fp
	int i; //定义整型变量i
	out = fopen("out.dat","w"); //以只写的方式打开文件out.dat，并用fp指向这个文件
	for(i = 0; i < 10; i++)
{
	printf("i=%d,%d\n", i + 1, bb[i]); //在屏幕上显示bb[1]至bb[10]元素
	fprintf(out,"%d\n",bb[i]);
	//把数组bb写入到文件out.dat中
}
	fclose(out); //关闭文件out.dat
}
