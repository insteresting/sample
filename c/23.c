/*程序功能: 若一个四位数的千位数位置上的值小于等于百倍数位置上的值，百位数位置上的值小于等于十位数位置上的值，以及十位数位置上的值小于等于个位数位置上的值，并且原四位数是偶数，则统计出满足此条件的个数cnt并把这些四位数按从小到大的顺序存入数组b中，最后调用写函数writeDat()把结果cnt以及数组b中符合条件的四位数输出到文件out.dat中。
 * 时间:
 * 作者:
 *
 *
 */
#include<stdio.h>
#define MAX 200 //定义宏变量MAX，其值等于200
int a[MAX], b[MAX] ,cnt = 0; //定义整型数组a[MAX],b[MAX]和变量cnt，并赋变量cnt的初值为0
void writeDat();




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
	jsVal(); //调用jsVal()函数实现题目要求的功能
	printf("满足条件的数=%d\n",cnt);
	for ( i=0; i<cnt; i++)
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
