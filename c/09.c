/*程序功能:已知数据文件in.dat中存有200个四位数，并已调用读函数readDat()把这些数存入数组a中，请考生编制一函数jsVal(),其功能是:把千位数字和十位数字重新组成一个新的含有两位数字的数ab(新数的十位数字是原四位数的千位数字，新数的个位数字是原四位数的十位数字)，以及把个位数字和百位数字组成另一个新的含有两位数字的数cd(新十位数的十位数字是原四位数的个位数字，新十位数的个位数字是原四位数的百位数字)，如果新组成的两个数ab<cd，ab必须是大奇数且不能被5整除，cd必须是偶数，同时两个新数的十位数字均不为零，则将满足此条件的四位数按从大到小的顺序存入数组b中，并要计算满足上述条件的四位数的个数cnt。最后main函数调用写函数writeDat()把结果cnt以及数组中符合条件的四位数输出到out.dat中。
 * 时间:
 * 作者:
 *
 *
 */
#include<stdio.h>
#define MAX 200 //定义宏变量MAX，其值等于200
int a[MAX], b[MAX], cnt = 0; //定义全局整型一维数组a[MAX],b[MAX]和变量cnt,其初始值为0
void writeDat();



void jsVal()
{
}

void readDat()
{
	FILE *fp; //定义文件指针变量fp
	int i; //定义整型变量i
	fp = fopen("in.dat","r"); //以只读的方式打开文件in.dat，并用fp指向这个文件
	for (i = 0; i < 200; i++)
		fscanf(fp,"%d",&a[i]); //从文件in.dat中读取300个四位数到数组a中
	fclose(fp); //关闭文件in.dat
}


void main()
{
	int i;
	readDat();
	jsVal(); //调用jsVal()函数，实现题目要求的功能
	printf(“满足条件的数=%d\n",cnt);
	for ( i= 0; i < cnt; i++)
		printf("%d",b[i]);
	printf("\n");
	writeDat();

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
