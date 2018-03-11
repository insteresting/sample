/*程序功能:功能是:在三位整数(100至999)中寻找符合下面条件的整数，并依次从小到大存入数组b[]中。条件如下：某数的既是完全平方数，又有两位数字相同，例如144,676等。
 * 时间:
 * 作者:
 *
 *
 */
#include<stdio.h>

void writeDat(int num, int b[]); //writeDat()函数的说明语句


int jsValue(int bb[])
{
}




void main()
{
	int b[20], num; //定义一维整型数组b[20]和变量num
	num = jsValue(b); //调用函数jsValue(b)，返回满足条件的三位数的个数并赋给变量num
	writeDat(num, b);//把满足条件的三位数的个数和其值写入到文件out.dat中

}
void readDat()
{
	FILE *fp; //定义文件指针变量fp
	int i; //定义整型变量i
	fp = fopen("in.dat","r"); //以只读的方式打开文件in.dat，并用fp指向这个文件
	for (i = 0; i < 300; i++)
		fscanf(fp,"%d",&a[i]); //从文件in.dat中读取300个四位数到数组a中
	fclose(fp); //关闭文件in.dat
}
void writeDat()
{
	FILE  fp; //定义文件指针变量fp
	int i; //定义整型变量i
	fp = fopen("out.dat","w"); //以只写的方式打开文件out.dat，并用fp指向这个文件
	fprintf(fp,"%d\n",cnt); //把素数的个数写入到文件out.dat
	for(i = 0; i < cnt; i++)
		fprintf(fp,"%d\n",b[i]); //把数组b中的所有元素写入到文件out.dat
	fclose(fp); //关闭文件out.dat
}
