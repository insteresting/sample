/*程序功能: 函数ReadDat()实现从文件in.dat中读取1000个十进制整数到数组xx中，请编制函数Compute分别计算出xx中数值为偶数的个数even,所有数值为奇数的平均值ave1，偶数的平均值ave2以及所有偶数的言状totfc的值，最后调用WriteDat()把结果输出到时out.dat文件中。
 * 时间:
 * 作者:
 *
 *
 */
#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#define MAX 1000
int xx[MAX], even = 0;
double avel=0.0, ave2=0.0,totfc=0.0;
void WriteDat(void);
/*从文件in.dat中读取100个十进制整数到数组xx中*/
int ReadDat(void)
{
  FILE *fp;
  int i;
  if((fp=fopen("in.dat","r"))==NULL)
    return 1; //如果文件in.dat为空，则返回1
  for(i = 0; i < MAX; i++)
    fscanf(fp,"%d,",&xx[i]); //从文件in.dat中读取MAX个数，存入数组xx
  fclose(fp);
  return 0;//成功从in.dat中读取MAX个数并存入数组xx中，函数返回0
}
void Compute(void)
{
}


void main()
{
  int i;
  for (i = 0; i < MAX; i++)
    xx[i] = 0;
  if (ReadDat())
    {
      printf("数据文件in.dat不能打开!\007\n");
      return;
    }
  Compute();
  printf("EVEN=%d\nAVE1=%lf\nAVE2=%lf\nTOTFC=%lf\n",even,ave1,ave2,totfc);
  WriteDat();
}
/*把结果输出到out.dat文件中*/
void WriteDat(void)
{
  FILE *fp;
  fp = fopen("out.dat","w");
  fprintf(fp,"%d\n%lf\n%lf\n%lf\n",even,ave1,ave2,totfc);
  fcolse(fp);
}


