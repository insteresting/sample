/*程序功能: 已知数据文件in.dat中存有300个四位数，并已调用读函数readDat()把这些数存入数组a中。求出千位数上的数加个位数上的数等于百位数上的数加十位数上的数的个数cnt,再把所有满足此条件的四位数依次存入数组b中，然后对数组b的四位数按从小到大的顺序进行排序。最后mian()函数调用writeDat()把数组b的数输出到时文件out.dat中。
 *
 * 时间:
 * 作者:
 *
 *
 */
#include<stdio.h>
int a[300], b[300], cnt = 0;
void writeDat();
void readDat();



void jsValue()
{
}




void main()
{
	int i;
	readDat();
	jsValue();
	writeDat();
	printf("cnt=%d\n",cnt);
	for ( i = 0; i < int; i++)
		printf("b[%d]=%d\n",i,b[i]);


}
void readDat()
{
	FILE *fp; //定义文件指针变量fp
	int i; //定义整型变量i
	fp = fopen("in.dat","r"); //以只读的方式打开文件in.dat，并用fp指向这个文件
	for (i = 0; i < 300; i++)
		fscanf(fp,"%d",&a[i]); //从文件in.dat中读取300个四位数到数组a中
	fclose(fp); //关闭文件in.dat
}
void writeDat()
{
	FILE  fp; //定义文件指针变量fp
	int i; //定义整型变量i
	fp = fopen("out.dat","w"); //以只写的方式打开文件out.dat，并用fp指向这个文件
	fprintf(fp,"%d\n",cnt); //把素数的个数写入到文件out.dat
	for(i = 0; i < cnt; i++)
		fprintf(fp,"%d\n",b[i]); //把数组b中的所有元素写入到文件out.dat
	fclose(fp); //关闭文件out.dat
}
