/*程序功能: 已知在文件in.dat中存有100个产品销售记录，每个产品销售记录由产品代码dm(字符型4位）,产品名称mc(字符型10位)，单价dj(整型)，金额(长整型)五部分组成。其中:金额＝单价*数量。函数ReadDat()读取这100个销售记录并存入结构数组sell中，请编制函数sortDat()，其功能要求:按产品代码从大到小的顺序排列，若产品代码相同，则按金额从大到小进行排列，最终排列结果仍存入结构数组shell中，最后main()函数调用函数WriteDat()把结果输出到时文件out.dat中
 * 时间:
 * 作者:
 *
 *
 */
#include<stdio.h>
#include<string.h>
#include<stdlib.h>
#define MAX 1000
typedef struct
{
  char dm[5]; /*产品代码*/
  char mc[11]; /*产品名称*/
  int dj; /*单价*/
  int sl; /*数量*/
  long je; /*金额*/
} PRO; //定义结构体PRO
PRO sell[MAX]; //定义结构体一维数组蛮sell[MAX]
void ReadDat();
void WriteDat();
void SorDat()
{
}
void main()
{
  memset(sell,0,sizeof(sell)); //为sell分配sizeof(sell)大小的内存空间
  ReadDat();
  SortDat();
  WriteDat();
}
/*读取这100个销售记录并存入结构数组sell中*/
void ReadDat()
{
  FILE *fp;
  char str[80], ch[11];
  int i;
  fp = fopen("in.dat","r");
  for (i =0 ; i <100; i++)
    {
      fgets(str,80,fp);//从文件in.dat中读取长度为79的字符串存入字符数组str中
      memcpy(sell[i].dm,str,4); //从字符串str的开始位置取长度为4的字符串赋给产品代码
      memcpy(sell[i].mc,str+4,10); //从字符串str+4的位置取长度为10的字符串赋给产品名称
      memcpy(ch,str ＋ 14，4）； //从字符串str+14的位置取长度为4的字符串赋给字符数组ch
	ch[4] = 0; //把零赋给字符数组元素ch[4]
      sell[i].dj = atoi(ch); //把字符数组ch转化成整型数值赋给产品单价
      memcpy(ch,str + 18,5); //从字符串str+18的位置取长度为5的字符串赋给字符数组ch
      ch[5] = 0; //把零赋给字符数组元素ch[5]
      sell[i].s1 = atoi(ch); //把字符数组ch转化成整开进数值赋给产品数量
      sell[i].je = (long)sell[i].dj * sell[i].s1; //产品单价乘以产品数量等于产品金额
    }
  fclose(fp);
}
/*把结果输出到文件out.dat中*/
void WriteDat()
{
  FILE *fp;
  int i;
  fp = fopen("out.dat","w");
  /*把经过处理的100条记录写入到文件out.dat*/
  for(i = 0; i < 100; i++)
    {
      fprintf(fp,"%s%s%4d%5d%10ld\n",sell[i].dm,sell[i].mc,sell[i].dj,sell[i].sl,sell[i].je);
    }
  fclose(fp);
}
