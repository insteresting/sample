/*程序功能: compute分别计算出xx中数值为奇数的个数odd,xx中所有可数的平均值avel，并求出x中数值为偶数的平均值av2以及所有可数的方差totfc的值，最后调用函数WriteDat()把结果输出到out.dat文件中。
 * 时间:
 * 作者:
 *
 *
 * 
 */
#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#define MAX 1000
int xx[MAX], odd = 0, even = 0;
double ave1=0.0, ave2=0.0, totfc=0.0;
void WriteDat(void);
/*从文件in.dat中读取1000个十进制整数到数组xx中*/
int ReadDat(void)
{
  FILE *fp; int i;
  if((fp=fopen("in.dat","r"))==NULL)
    return 1;
  for(i = 0; i < MAX; i++)
    fscanf(fp,"%d,",&xx[i]);
  fclose(fp);
  return 0;
}
void main()
{
  int i;
  for(i = 0; i < MAX; i++)
    xx[i] = 0;
  if(ReadDat())
    {
      printf("数据文件in.dat不能打开！\007\n");
      return;
    }
  Compute();
  printf("ODD=%d\nAVE1=%lf\nAVE2=%lf\nTOTFC=%lf\n",odd,ave1,ave2,totfc);
  WriteDat();
}
/*把结果输出到out.dat文件中*/
void WriteDat(void)
{
  File *fp;
  fp = fopen("out.dat","w");
  fprintf(fp,"%d\n％lf\n%lf\n%lf'n",odd,ave1,ave2,totfc);
  fclose(fp);
}
