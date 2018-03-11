/*程序功能: 千位数字与百位数字之和等于十位数字与个位数字之和，且千位数字与百位数字之和等于个位数字与千位数字之差的整10倍。计算并输出这些四位自然数的个数cnt以及这些数的和sum。
 * 时间:
 * 作者:
 *
 *
 */
#include<stdio.h>
int cnt, sum; //定义整型全局变量cnt 和  sum
void writeDAT();
void countValue()
{


}

void main()
{
	cnt = sum = 0; //给全局变量cnt,sum赋初值为0
	countValue(); //调用函数countValue()，实现题目要求的功能
	printf("满足条件的自然数的个数=%d \n", cnt);
	printf("满足条件的自然数值的和=%d \n", sum);
	writeDAT();

}

void writeDat()
{
	FILE  *fp; //定义文件指针变量fp
	fp = fopen("out.dat","w"); //以只写的方式打开文件out.dat，并用fp指向这个文件
	fprintf(fp,"%d\n%d\n",cnt,sum); //把素数的个数写入到文件out.dat
	fclose(fp); //关闭文件out.dat
}
