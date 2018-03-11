#include<stdio.h>
void writeDAT();
int cnt, sum;
int isPrime(int number)
{
  int i, tag = 1; //define variable i & tag
  if (number == 1)
    return 0;
  for (i=2; tag && i<= number /2; i++) //from 2, i__,until i <- number/2,&& tag=1,exit loop
    if (number % i ==0)
      tag = 0; //if number can be divided i, tag = 0
  return tag; //return tag value
}
void countValue()
{
}
void main()
{
  cnt = sum = 0; //cnt,sum=0
  countValue(); //usefunctiontocompute
  printf("满足条件的整数的个数=%d\n",cnt); //在屏幕上输出满足条件的整数个数cnt
  printf("满足条件的整数的和值=%d\n",sum); //在屏幕上输出满足条件的整数的和sum
  wirteDAT();//把计算结果写入到文件out.dat中
}
void writeDAT()
{
	FILE *fp; //定义文件指针fp
	fp = fopen("out.dat","w"); //以只写的方式的打开文件out.dat,并且fp指向此文件
	fprintf(fp,"%d\n%d\n",cnt,sum); //把素数的个数值cnt,和的值sum写入到文件out.dat
	fclose(fp); //关闭文件out.dat
}


