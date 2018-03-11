/*程序功能: 按每个数的后三位的大小进行降序排列，如果出现后三位相等的数值，则对这些数值按原始4位数据进行升序排列，将排序后的前10个数存入数组bb中
 * 时间:
 * 作者:
 *
 *
 */
#include<stdio.h>
#include <string.h>
void readDat();
void writeDat();
int aa[200], bb[10];


void jsSort()
{
}




void main()
{
	readDat();
	jsSort();
	writeDat();

}
void readDat()
{
	FILE *in; //定义文件指针变量fp
	int i; //定义整型变量i
	fp = fopen("in.dat","r"); //以只读的方式打开文件in.dat，并用fp指向这个文件
	for (i = 0; i < 200; i++)
		fscanf(in,"%d",&aa[i]); //从文件in.dat中读取300个四位数到数组a中
	fclose(in); //关闭文件in.dat
}
void writeDat()
{
	FILE  *out; //定义文件指针变量fp
	int i; //定义整型变量i
	out = fopen("out.dat","w"); //以只写的方式打开文件out.dat，并用fp指向这个文件
	for(i = 0; i < 10; i++)
	{
		printf("i=%d,%d\n", i + 1, bb[i]);
		fprintf(out, "%d\n", bb[i]);
	}
	fclose(out); //关闭文件out.dat
}
