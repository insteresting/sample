/*程序功能: 求出千位数上的数加个位数上的数等于百位数上的数加十位数上的数的个数cnt,再求出所有满足上条件的四位数平均值pjz1,以及所有不满足此条件的四位数平均值pjz2.最后mian()函数调用写函数writeDat()把结果cnt,pjz1,pjz2输出到out.dat文件。
 * 时间:
 * 作者:
 *
 *
 */
#include<stdio.h>
int a[300], cnt=0;
double pjz1=0.0, pjz2=0.0;
void readDat();
void writeDat();



void jsValue()
{
}




void main()
{
	readDat();
	jsValue();
	writeDat();
	printf("cnt=%d\n满足条件的平均值pjz1=%7.2lf\n不满足条件的平均值pjz2=7.2lf\n",cnt,pjz1,pjz2);

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
	FILE  *fp; //定义文件指针变量fp
	fp = fopen("out.dat","w"); //以只写的方式打开文件out.dat，并用fp指向这个文件
	fprintf(fp,"%d\n%7.2lf\n%7.2lf\n",cnt,pjz1,pjz2); //把数组b中的所有元素写入到文件out.dat
	fclose(fp); //关闭文件out.dat
}
