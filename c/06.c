/*程序功能:计算500~800区间内素数的个数cnt,并按所求素数的值从大到小的顺序，计算其间隔减，加之和，即第1个素数－第2个素数＋第3个素数－第4素数+第5个素数的值sum。
 * 时间:
 * 作者:
 *
 *
 */
#include<stdio.h>
int cnt, sum; //定义全局整型变量cnt,sum
void WriteDAT(); //writeDAT()说明语句
int isPrime(int num) //函数isPrime(num)判断num是否为素数，如果是，则返回1，否则返回0
{
	int i; //定义整型变量i
	for(i = 2; i <= num /2; i++) //循环变量i从2开始，每次加1,直到其值大于num/2
		if(num % i == 0)
			return 0; //如果num能被i整除，则返回0
	return 1; //否则返回1
}



void countValue()
{

}




void main()
{
	cnt = sum = 0; //给全局变量cnt,sum赋初值0
	countValue(); //调用countValue()函数，实现题目要求的功能
	printf("素数的个数=%d\n",cnt); //在屏幕上显示素数的个数cnt
	printf("按要求计算的值=%d\n",sum); //在屏幕上显示按要求计算的值sum
	writeDAT(); //把计算结果写入到文件out.dat中


}
void writeDat()
{
	FILE  fp; //定义文件指针变量fp
	fp = fopen("out.dat","w"); //以只写的方式打开文件out.dat，并用fp指向这个文件
	fprintf(fp,"%d\n%d\n",cnt,sum); //把素数的个数写入到文件out.dat
	fclose(fp); //关闭文件out.dat
}
