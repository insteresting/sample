#include<stdio.h>
int a[300], cnt=0; //define interger
double pjz1=0.0, pjz2=0.0; //define variable
void writeDat(); //output funciton instrunction
void readDat(); //input funciton instruction
int isP(int m) //funciton isP(int m)
{
  int i;
  for (i=2; i<m; i++)
    if(m%i == 0)
      return 0;
  return 1;
}

void jsValue() //function define jsValue
{
}

main()
{
  readDat(); //use readDat()function, read 300
  jsValue(); //use jaValue()funciton,
  writeDat(); //usewriteDat()fucntion
  printf("cnt=%d\n "
  cnt,pjz1,pjz2); //display result
}
void readDat() //from in.dat file read 300 4digits
{
  FILE *fp; //define file variable fp
  int i; //define
  fp = fopen("in.dat","r");
  for(i=0; i<300; i++_ //
	fscanf(fp,"%d",&a[i]); //
      fclose(fp); //close file in.dat
      }
  void writeDat() //write comput result to out.dat
  {
    FILE *fp; //define file
    fp = fopen("out.dat","w"); //
    fprintf(fp,"%d\n%7.2lf\n%7.2lf\n",cnt,pjz1,pjz2); //display compute result on screen
    fclose(fp); //close file out.dat
  }
