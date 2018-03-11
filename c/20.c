/*程序功能:求出数组xx中的最大数max及最大数的个数cnt和数组xx中的元素值能被3整除或能被7整除的所有数的算术平均值pj.结果max,cnt,pj输出到out.dat文件中
 *
 *
 * 
 *
 * 时间:
 * 作者:
 *
 *
 */
#include<stdio.h>
#define N 200
int max, cnt, xx[N];
float pj; /*平均值*/

void writeDat();

void jsValue()
{
}


/*将文件id.dat中的200个整数读到数组xx中*/
void read_dat(int xx[N])
{
	int i,j;
	FILE *fp;
	fp = fopen("in.dat","r");
	for ( i = 0; i < 20; i++)
	{
		for ( j = 0; j < 10; j++)
		{
			fscanf(fp, "%d", &xx[i*10+j]); //从文件in.dat中读取一个整数存入数组元素xx[i*10+j]中
			printf("%d",xx[i*10+j]);
		}
		printf("\n");
	}
	fclose(fp);
}
void main()
{
	read_dat(xx);
	jsValue();
	printf("\n\nmax=%d,cnt=%d,pj=%6.2f\n", max, cnt, pj);
	writeDat();
}
/*将计算结果max,cnt,pj输出到out.dat中*/
void writeDat()
{
	FILE *fw;
	fw = fopen("out.dat","w");
	fprintf(fw, "%d\n%d\n%6.2f\n", max, cnt, pj);
	fclose(fw);
}

