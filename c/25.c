/*程序功能: 把一个四位数的千位数位置上的值减去百位数位置上的值再减去十位数位置上的值最后减去个位数位置上的值，如果得出的值大于等于零且原四位数是奇数，则统计出满足此条件的个数cnt，并把这些四位数按从小到大的顺序存入数组b中，最后调用写函数writeDat()把结果cnt以及数组b中符合条件的四位数输出到out.dat文件中
 * 时间:
 * 作者:
 *
 *
 */
#include<stdio.h>
#define MAX 200
int a[MAX], b[MAX], cnt = 0;
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
	jsVal();
	printf("满足条件的数=%d\n",cnt);
	for (i = 0; i < cnt; i++)
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
