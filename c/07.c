/*程序功能: 
 * 时间:
 * 作者:
 *
 *
 */
#include<stdio.h>
#define MAX 200 //定义宏变量MAX，其值等于200
int a[MAX], b[MAX], cnt = 0; //定义全局整型一维数组a[MAX], b[MAX]和变量cnt，其初值等于0
void writeDat();




void jsValue()
{
}




void main()
{
	int i;
	readDat();
	jsVal(); //调用jsVal{}函数实现题目要求的功能
	printf("满足条件的数=%d\n",cnt);
	for ( i = 0; i < cnt; i++)
	  printf("%d", b[i]);
	printf("\n");
	writeDat();
		
		
}
void readDat()
{
	int i;
	FILE *fp; //定义文件指针变量fp
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
