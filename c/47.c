/*程序功能: 按给定关系对数组xx中的所有字符进行替代
 * f(p)=p*11 mod 256
 * 时间:
 * 作者:
 *
 *
 */
#include<stdio.h>
#include <string.h>
#include <ctype.h>
unsigned char xx[50][80];
int maxline = 0; /*文章的总行数*/
int ReadDat(void);
void WriteDat(void);
void encryptChar()
{
	unsigned int val;
}







void main()
{
	if(ReadDat())
	{
		printf("数据文件in.dat不能打开! \n\007");
		return;
	}
	encryptChar();
	WriteDat();

}
void readDat()
{
	FILE *fp; //定义文件指针变量fp
	int i=0; //定义整型变量i
	unsigned char *p;
	if((fp=fopen("in.dat","r"))==NULL)
	  return 1;
	while(fgets(xx[i],80,fp) !=NULL)
	  {
	    p = strchr(xx[i], '\n');
	    if(p) *p = 0;
	    i++;
	  }
	maxline = i;
	fclose(fp);
	return 0;
}
/*把结果xx输出到文件out.dat中*/
void WriteDat(void)
{
  FILE *fp;
  int i;
  fp = fopen("out.dat","w");
  for(i = 0; i < maxline; i++)
    {
      printf("%s\n",xx[i]);
      fprintf(fp,"%s\n",xx[i]);
    }
  fclose(fp);
}
