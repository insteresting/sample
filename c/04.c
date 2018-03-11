/*程序功能:1已知数据文件in.dat中存有300个四位数，并已调用读函数readDat()把这些数存入数组a中，编制一函数jsValue(),其功能是:求出所有这些四位数是素数的个数cnt,再把所有的满足此条件的四位数依次存入数组b中，然后对数组b的四位数按从小到大的顺序进行排序进行排序。最后main()函数调用写函数writeDat()把数组b中的数输出到out.dat文件中。
 * 时间:
 * 作者
 *
 *
 */
#include<stdio.h>
int a[300], b[300], cnt=0; //定义全局数组a[300],b[300]和变量cnt，并且对变量cnt赋初值0
void readDat(); //函数readDat()说明语句
void writeDat(); //函数writeDat()说明语句
void jsValue(); //函数jsValue()说明语句
int isP(int m) //函数isP(m)判断m是否为素数,如果是素数，返回1，否则返回0
{
	int i; //定义变量i
	for(i = 2;i < m;i++) //循环变量i从2依次递增，直到i等于或大于m退出循环
		if(m % i == 0)
			return 0; //如果m能被1整除，返回0
	return 1; //否则返回1
}
void jsValue()
{
}




void main()
{
	int i; //定义变量;
	readDat(); //调用readDat()函数从数据文件in.dat中读取300个四位数存入数组a中
	jsValue(); //调用函数jsValue()实现题目所要求的功能		
	writeDat(); //调用函数writeDat()函数把计算结果写入到数组b中的数输出到out.dat文件
	printf("cnt=%d\n",cnt);//在屏幕上显示素数的个数
	for(i = 0; i < cnt; i++)
		printf("b[%d]=%d\n", i,b[i]); //在屏幕上显示数组b中的所有元素


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
