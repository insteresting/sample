/*程序功能:依次从数组中取出一个四位数，如果该四位数小于该四位数以后的连续五个数且该数是偶数(该四位数以后不满五个数,则不统计),则统计出满足此条件的个数cnt,并把这些四位数存入数组b中，而后对数组b进行升序排序，最后调用写函数writeDat()把结果cnt以及数组b中符合条件的四位数输出到out.dat文件中 
 * 时间:
 * 作者:
 *
 *
 */
#include<stdio.h>
#define MAX 200 //定义宏变量MAX其值等于200
int a[MAX], b[MAX], cnt = 0; //其初始值为0,定义全局整型一维数组a[MAX],b[MAX]和变量cnt
void writeDat(); //writeDat()函数的说明语句




void jsVal()
{

}





void readDat()
{
	FILE *fp; //定义文件指针变量fp
	int i; //定义整型变量i
	fp = fopen("in.dat","r"); //以只读的方式打开文件in.dat，并用fp指向这个文件
	for (i = 0; i < MAX; i++)
		fscanf(fp,"%d",&a[i]); //从文件in.dat中读取300个四位数到数组a中
	fclose(fp); //关闭文件in.dat
}

void main()
{
	int i;
	readDat();
	jsVal(); //调用jsVal()函数，实现题目要求的功能
	printf("满足条件的数=%d\n",cnt);
	for ( i=0; i < cnt; i++)
		printf("%d",b[i]);
	printf("\n");
	writeDat();

}
void writeDat()
{
	FILE  *fp; //定义文件指针变量fp
	int i; //定义整型变量i
	fp = fopen("out.dat","w"); //以只写的方式打开文件out.dat，并用fp指向这个文件
	fprintf(fp,"%d\n",cnt); //把素数的个数写入到文件out.dat
	for(i = 0; i < cnt; i++)
		fprintf(fp,"%d\n",b[i]); //把数组b中的所有元素写入到文件out.dat
	fclose(fp); //关闭文件out.dat
}
