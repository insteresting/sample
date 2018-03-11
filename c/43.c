/*程序功能: 按给定的替代关系对数组xx中的所有字符进行替代，仍存入数组xx对应的位置上
 *替代关系:f(p)=p*12 mod 256
 * 时间:
 * 作者:
 *
 *
 */
#include<stdio.h>
#include<string.h>
#include<ctype.h>
unsigned char xx[50][80];
int maxline = 0;
int ReadDat(vid);
void WriteDat(void);
void encryptChar()
{
}

void main()
{
if(ReadDat())
  {
print("数据文件in.dat不能打开!\n\007"）;
return ;
}
encryptChar();
WriteDat();
}

int ReadDat(void)
{
FILE *fp;
int i = 0;
unsigned char *p ;
if((fp = fopen("in.dat","r"))==NULL)
  return 1;
while ( fgets(xx[i],80,fp) != NULL)
  {
p = strchr(xx[i], '\n');
if(p) *p=0;
i++;
}
maxline = i;
fclose(fp);
return 0;
}

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
