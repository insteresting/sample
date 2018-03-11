/*程序功能:求出1到1000之内能被7或被11整除但不能同时被7或11整除的所有整数，其结果按从小到大的顺序放在数组a中，并通过形式参数n传递这些数的个数
 * 时间:
 * 作者:
 *
 *
 */
#include<stdio.h>
#include<conio.h>
void writeDAT();
void countValue(int *a, int *n)
{
}




main()
{
	int aa[1000], n , k;
	countValue( aa, &n );
	for ( k = 0; k < n; k++)
		if ((k+1)%10 == 0)
			printf("%5d\n",aa[k]); //10个数为一组在屏幕上输出
		else printf("%5d", aa[k]);
	writeDAT();

}
/*
 * void readDat()

{
	FILE *fp; //定义文件指针变量fp
	int i; //定义整型变量i
	fp = fopen("in.dat","r"); //以只读的方式打开文件in.dat，并用fp指向这个文件
	for (i = 0; i < 300; i++)
		fscanf(fp,"%d",&a[i]); //从文件in.dat中读取300个四位数到数组a中
	fclose(fp); //关闭文件in.dat
}
*/

void writeDAT()
{
	int aa[1000], n, k;
	FILE  *fp; //定义文件指针变量fp
	fp = fopen("out.dat", "w");
	countValue(aa, &n);
	for (k = 0; k < n; k++)
	if (( k + 1) %10 ==  0)
		fprintf(fp,"5d\n",aa[k]); //10个数为一组输出到文件out.dat中
	else
		fprintf(fp,"5d",aa[k]); 
	
	fclose(fp); //关闭文件out.dat
}
