/*程序功能:1.求出该文件中共有多少个正整数totNum;
 * 2.求这些正整数右移1位二进制后，产生的新数是偶数的数的个数totCnt,以及满足此条件的这些正整数(右移前的值)的算术平均值totPjz。最后main()函数调用函数WriteDat()把所求的结果输出到out.dat文件中
 * 时间:
 * 作者:
 *
 *
 */
#include<stdio.h>
#define MAXNUM 200
int xx[MAXNUM];
int totNum = 0; //文件in.dat中共有多少个正整数
int totCnt = 0; //符合条件的正整数的个数
double totPjz = 0.0; //平均值
int ReadDat(void);
void WriteDat(void);
void CalValue(void)
{

}






void main()
{
 int i;
 for( i = 0; i < MAXNUM; i++)
	 xx [ i ] =0;
 if(ReadDat())
   {
     printf("数据文件in.dat不能打开! \007\n");
     return;
   }
 CalValue();
 printf("文件in.dat中共有正整数=%d个\n",totNum);
 printf("符合条件的正整数的个数=%d个\n",totCnt);
 printf("平均值=%.2lf\n",totPjz);
 WriteDat();
}
/*读取这若干个正整数并存入数组xx中*/
int ReadDat(void)
{
  FILE *fp;
  int i = 0;
  if((fp=fopen("in.dat","r"))==NULL)
    return 1; //如果in.dat文件为空，则返回1
  /*while一直执行，直到文件in.dat的结尾退出*/
  while(!feof(fp))
    
    {
      fscanf(fp,"%d,",&xx[i++]); //从文件in.dat读取一个整数存入xx[i]中返回0
    }
  /*把计算结果存入文件out.dat中*/
  void WriteDat(void)
  {
    FILE *fp;
    fp = fopen("out.dat","w");
    fprintf(fp,"%d\n%d\n%.2lf\n",totNum,totCnt,totPjz);
    fclose(fp);
  }
