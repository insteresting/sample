/*程序功能: 已知数据文件in.dat中存有200个四位数,并已调用读函数readDat()把这些数存入数组a中 .把千位数字和十位数字重新组成一个新的含有两位数字的数(新数的十位数字是原四位数的千位数字，新数的个位数字是原四位数的十位数字)，以及把个位数字和百位数字组成另一个新的含有两位数字的数(新数的十位数字是原十位数的个位数字，新数的个位数字是原四位数的百位数字)，如果两个新组成的数均是素数且新数的十位数字均不为0，则将满足此条件的四位数从大到小的顺序存入数组b中，并要计算满足上述条件的四位数的个数cnt.。最后main函数调用写函数writeDat()把结果cnt以及数组b中符合条件的四位数输出到out.dat文件中。
 * 时间:
 * 作者:
 *
 *
 */
#include<stdio.h>
#define MAX 200
int a[MAX],b[MAX],cnt = 0;
void writeDat();
int isprime(int m) //函数isprime(int m)判断m是否为素数，如果是素数则返回1，否则返回0
{
  int i;
  for (i = 2; i < m/2; i++） //循环变量i开始，每次加1，直到其值小于等于m/2
    if(m % i == 0)
      return 0; //如果m能被1带队，则说明m不是素数，返回0
  return 1; //否则,m是素数，返回1
}


void jsValue()
{
  
}
void readDat() //从in.dat文件中读取200个四位数存入数组a中
{
  int i;
  FILE *fp;
  fp = fopen("in.dat","r");
  for ( i = 0; i < MAX; i++)
    fscanf(fp, "%d", &a[i]);
  fclose(fp);
}



void main()
{
  int i;
  readDat();
  jsVal(); //调用函数jsVal()，实现题目要求的功能
  printf("满足条件的数=%d\n", cnt);
  for ( i = 0; i < cnt; i++)
    printf("%d", b[i]);
  printf("\n");
  writeDat();

}

void writeDat()
{
	FILE  fp; //定义文件指针变量fp
	int i; //定义整型变量i
	fp = fopen("out.dat","w"); //以只写的方式打开文件out.dat，并用fp指向这个文件
	fprintf(fp,"%d\n",cnt); //把素数的个数写入到文件out.dat
	for(i = 0; i < cnt; i++)
		fprintf(fp,"%d\n",b[i]); //把数组b中的所有元素写入到文件out.dat
	fclose(fp); //关闭文件out.dat
}
