/*程序功能: 功能是:求n以内(不包括n)同时能被3与7整除的所有自然数之和的平方根s,s作为函数返回值，最后结果s输出到文件out.dat文件中
 * 时间:
 * 作者:
 *
 *
 */
#include<stdio.h>
#include<math.h> //这个程序中包含vc6.0中数学库函数
void progReadWrite(); //输入输出函数progReadWrite()的说明语句
double countValue( int n)
{
}



main()
{
	printf("自然数之和的平方根=%f\n",countValue(1000));
	progReadWrite();

}
/*从文件in.dat中读取数据，经过计算后把计算结果写入到文件out.dat中*/
void progReadWrite()
{
	FILE *fp, *wf;
	int i, n;
	double s;
	fp = fopen("in.dat","r"); //以只读的方式打开文件in.dat，并使文件指针fp指向此文件
	if(fp == NULL) //如果文件指针fp为空，则说明数据文件in.dat不存在，返回
	{
		printf("数据文件in.dat不存在!");
		return;
	}
	wf = fopen("out.dat","w"); //以只写的方式打开文件out.dat，并使文件指针指向此文件
	/*依次从文件in.dat读取10个整数赋给n,计算每个n对应平方根s,并把s写入到文件out.dat中*/
	for( i=0; i<10; i++)
	{
		fscanf(fp, "%d" ,&n);
		s = countValue();
		fprintf(wf,"%f\n", s);
	}
	fclose(fp);
	fclose(wf);
}
