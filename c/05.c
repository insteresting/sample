/*程序功能:选出大于100小于1000的所有个位数字与十位数字之和被10除所得余数恰是百位数字的所有素数，计算并输出上述这些素数的个数cnt以及这些素数值的和sum。
 * 时间:
 * 作者:
 *
 *
 */
#include<stdio.h> //include语句说明各程序中包含vc6.0标准输入输出库函数stdio.h
int cnt, su; //定义全局整型变量cnt ,sum
void writeDAT(); //writeDAT()的说明语句
int isP(int num) //函数isP(num)判断num是否是素数，如果是，则返回1，否则返回0
{
	int i; //定义整型变量i
	for ( i = 2; i < num / 2; i++) //循环变量i从2得出，每次递增1，直到其值等于或大于num / 2,退出循环
		if( num % i == 0)
			return 0; //如果num能被i整除，则返回0
	return 1; //否则，返回1
}

void countValue()
{
}




void main()
{
	cnt = sum = 0; //给全局变量cnt, sum赋初值0
	countValue(); //调用函数countValue(), 实现题目上所要求的功能
	printf("素数的个数=%d\n", cnt); //在屏幕上显示素数的个数
	printf("满足条件素数修士的和=%d",sum); //在屏幕上显示满足条件素数值的和
	writeDAT(); //把计算结果写入到文件out.dat

}
void writeDat()
{
	FILE  *fp; //定义文件指针变量fp
	fp = fopen("out.dat","w"); //以只写的方式打开文件out.dat，并用fp指向这个文件
	fprintf(fp,"%d\n%d\n",cnt,sum); //把素数的个数写入到文件out.dat
	fclose(fp); //关闭文件out.dat
}
