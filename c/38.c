/*程序功能:函数ReadDat()实现从文件in.dat中读取一篇英文文章，存入到无符号字符串数组xx中；编制函数encryptChar()，按给定的替代关系对数组xx中的所有字符进行替代，其替代值仍存入数组xx所对应的位置上，最后调用函数writeDat()把结果xx输出到文件out.dat中 
 * 替代关系：f(p)=p*11 mod 256, mod为取余运算，p是数组XX中某一个字符的ASCII值，f(P)是计算后的无符号整形值，如果计算后f(p)仁小于等于32或大于130,则该字符不变，否则用f(p）替代所对应的字符。
 * 时间:
 * 作者:
 *
 *
 */
#include<stdio.h>
#include<string.h>
#include<ctype.h>
unsigned char xx[50][80]
int maxline = 0; /*文章的总行数*/
int ReadDat(void);
void WriteDat(void);
void encryptChar()
{
}





void main()
{
	if(ReadDat())
	{
		printf("数据文件in.dat不能打开!\n\007");
		return;
	}
	encryptChar();
	WriteDat();

}
int ReadDat(void)
{
	FILE *fp; 
	int i = 0;
	unsigned char *p; //定义无符号字符型指针变量p
	if((fp=fopen("in.dat","r"))==NULL)
		return 1;
	while(fgets(xx[i],80,fp)!=NULL)
	{
		p = strchr(xx[i],'\n');
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
	for (i=0; i < maxline; i++)
	{
		printf("%s\n", xx[i]);
		fprintf(fp, "%s\n", xx[i]);
	}
	fclose(fp);
}
