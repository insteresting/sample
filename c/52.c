/*程序功能:求出数组xx中的数值为奇数的个数cnt1和数值为偶数的个数cnt2以及数组xx下标为偶数的元素什的算术平均值pj
 * 时间:
 * 作者:
 *
 *
 * 
 */
#include<stdio.h>
#define N 200 //定义宏变量N，其值等于200
int cnt1, cnt2, xx[N]; //定义全局变量cnt1,cnt2，以及数组xx[N]
float pj; //平均值
void writeDat(); 

void jsValue()
{
}





void read_dat(int xx[N])
{
	int i,j;

	FILE *fp;
	fp = fopen("in.dat","r");
	for ( i = 0; j < 10; i++)
	  {
	    for ( j = 0; j < 10; j++)
	      {
		fscanf(fp,"%d,", &xx[i*10+j]); //从文件in.dat中读取一个整数存入数组元素xx[i*10+j)中
		printf("%d",xx[i*10+j]);
	      }
	    printf("\n");
	  }
	fclose(fp);//关闭文件in.dat
}
void main()
{
  read_dat(xx);
  jsValue();
  printf("\n\ncnt1 = %d, cnt2 = %d, pj=%6.2f\n", cnt1, cnt2, pj);
  writeDat();
}
void writeDat()
{
  FILE *fw;
  fw = fopen(" out.dat ","w");
  fprintf(fw, "%d\n%d\n%6.2f\n", cnt1, cnt2, pj); //将cnt1, cnt2, pj输出到out.dat中
  fclose(fw);
}

