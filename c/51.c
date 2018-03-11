/*程序功能:依次从数组a中取出一个四位数，如果该四位数大于该四位数以前的连续五个数且该数是奇数，且该数必须能被7整除(该四位数以前不满五个数,则不统计)，则统计出满此条件的个数cnt，并把这些四位数按从大到小的顺序存入数级b中。
 * 时间:
 * 作者:
 *
 *
 */
#include<stdio.h>
#define MAX 200
int a[MAX], b[MAX], cnt = 0;



void jsValue()
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
	jsVal();
	printf("满足条件的数=%d\n", cnt);
	for(i = 0; i < cnt; i++)
		print("%d", b[i]);
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
