/*程序功能: 按给定的替代关系对数组xx中的所有字符进行替代，仍存入数组xx对应的位置上，最后调用函数writerDat()把结果输出到文件ou.tdat中。
 * 替代关系:f(p)=p*11 mod 256, mod 为取余运算，p是数组xx中某一个字符的ASCII值,f(p)是计算后的无符号整型值(注意:中间变量定义成整型变量),如果计算后f(p)值小于等于32或f(p)对应的字符是数字0至9,则该字符不变，否则用f(p)替代对应的字符。
 * 时间:
 * 作者:
 *
 *
 */
#include<stdio.h>
#include<string.h>
#include<ctype.h>
unsigned char xx[50][80];
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
void ReadDat(void)
{
	FILE *fp; //定义文件指针变量fp
	int i = 0; //定义整型变量i
	unsigned char *p;
	if((fp=fopen("in.dat","r"))==NULL)
		return 1;
	while (fgets(xx[i],80,fp) != NULL)
	{
		p = strchr(xx[i],'\n');
		if(p) *p = 0;
		i++;
	}
	maxline = i;
	fclose(fp);
	return 0;
}
void writeDat()
{
	FILE  *fp; //定义文件指针变量fp
	int i; //定义整型变量i
	fp = fopen("out.dat","w"); //以只写的方式打开文件out.dat，并用fp指向这个文件
	for( i = 0; i < maxline; i++)
	{
	printf("%s\n",xx[i]);
	fprintf(fp,"%s\n",xx[i]);
	}	
	fclose(fp); //关闭文件out.dat
}
