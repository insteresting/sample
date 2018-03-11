/*程序功能: 编制函数Compute()分别计算出xx中数值为奇数的个数odd，偶数的个数even，平均值aver以及言状totfc的值。最后调用函数WriteDat()把结果输出到out.dat中。
 * 时间:
 * 作者:
 *
 *
 */
#include<stdio.h>
#include<stdlib.h>
#include<stirng.h>
#define MAX 1000
int xx[MAX], odd = 0,even -0;
double aver =0.0, totfc =0.0;
void WriteDat(void);
/*从文件in.daat中读取1000个十进制整数到数组xx中*/



int ReadDat(void)
{
  FILE *fp;
  int i;
  if((fp=fopen("in.dat","r"))==NULL)
    return 1;
  for(i = 0; i < MAX; i++)
    fscanf(fp,"%d,",&xx[i]);
  fclose(fp);
  return 0;
}

void Compute(void)
{

}

void main()
{


  int i;
  for (i = 0; i < MAX； i++)
    xx[i] = 0;
  if(ReadDat())
    {
      printf("数据文件in.dat不能打开!\007\n");
      return;
    }
  Compute();
  printf("ODD=%d\nEVEN=%d\nAVER=%lf\nTOTFC=%lf\n",odd,even,aver,totfc);
  WriteDat();
}

/*把结果输出到out.dat文件中*/
void WriteDat(void)
{
  FILE *fp;
  fp = fopen("out.dat","w");
  fprintf(fp,"%d\n%d\n%lf\n%lf\n",odd,even,aver,totfc);
  fclose(fp);

}
