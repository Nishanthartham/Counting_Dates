//Test Cases
// Inputs

// var D = {'2020-01-01':4,'2020-01-02':4,'2020-01-03':6,'2020-01-04':8,'2020-01-05':2,'2020-01-06':-6,
//  '2020-01-07':2,'2020-01-08':-2 }; //Basic
// Ans = { Mon: -6, Tue: 2, Wed: 2, Thu: 4, Fri: 6, Sat: 8, Sun: 2 }

//var D = {'2020-01-01':6,'2020-01-04':12,'2020-01-05':14,'2020-01-06':2,
//  '2020-01-07':4}; //Contains zeroes for thur,fri
// Ans = { Mon: 2, Tue: 4, Wed: 6, Thu: 8, Fri: 10, Sat: 12, Sun: 14 }

// var D = {'2020-01-05':-8,'2020-01-06':6,'2020-01-07':2};//{ Mon: 6, Tue: 2, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: -8 }
// Ans = { Mon: 6, Tue: 2, Wed: -1, Thu: -1, Fri: -4.5, Sat: -6.25, Sun: -8 }

// var D = {'2020-01-01':4,'2020-01-05':2,'2020-01-06':-9}// { Mon: -9, Tue: 0, Wed: 4, Thu: 0, Fri: 0, Sat: 0, Sun: 2 }
// Ans  = { Mon: -9, Tue: -2.5, Wed: 4, Thu: -3.5, Fri: 3, Sat: 2.5, Sun: 2 }

// var D = {'2020-01-02':4,'2020-01-05':2,'2020-01-06':-6}//{ Mon: -6, Tue: 0, Wed: 0, Thu: 4, Fri: 0, Sat: 0, Sun: 2 }
// Ans = { Mon: -6, Tue: -2, Wed: 1, Thu: 4, Fri: 1.5, Sat: 1.75, Sun: 2 }

//var D = {'1971-03-01':6,'1971-03-05':14,'1971-03-07':4}; //contains { Mon: 6, Tue: 0, Wed: 0, Thu: 0, Fri: 14, Sat: 0, Sun: 4 }
// Ans = { Mon: 6, Tue: 5, Wed: 10, Thu: 12, Fri: 14, Sat: 9, Sun: 4 }

// var D = {'1971-03-01':6,'1971-03-06':14,'1971-03-07':4}; //contains { Mon: 6, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 14, Sun: 4 }
// Ans = { Mon: 6, Tue: 5, Wed: 5, Thu: 5, Fri: 9.5, Sat: 14, Sun: 4 }
 
// var D = {'1971-03-01':6,'1991-03-05':14,
//'2001-06-07':4,'2022-04-25':10,'2003-09-21':18};// { Mon: 16, Tue: 14, Wed: 0, Thu: 4, Fri: 0, Sat: 0, Sun: 18 }
// Ans = { Mon: 16, Tue: 14, Wed: 9, Thu: 4, Fri: 13.5, Sat: 15.75, Sun: 18 }

//Contains input only for monday and sunday
// var D = {'1971-03-01':6,'1971-03-07':4}; //{ Mon: 6, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 4 }
// Ans = { Mon: 6, Tue: 5, Wed: 5, Thu: 5, Fri: 4.5, Sat: 4.25, Sun: 4 }

//var D = {'1971-03-01':6,'2099-03-09':14,
// '1990-06-07':4,'2078-12-25':10,'2003-09-21':18}; //{ Mon: 20, Tue: 0, Wed: 0, Thu: 4, Fri: 0, Sat: 0, Sun: 28 }
// Ans = { Mon: 20, Tue: 24, Wed: 14, Thu: 4, Fri: 21, Sat: 24.5, Sun: 28 } tue = mon+sun/2 default

//var D = {'2020-01-01':-100000,'2020-01-02':999999,'2020-01-03':-90382,'2020-01-04':342908,'2020-01-05':10359,'2020-01-06':-93824,
//'2020-01-07':2,'2020-01-08':98439 }; 
/*Ans = {
    Mon: -93824,
    Tue: 2,
    Wed: -1561,
    Thu: 999999,
    Fri: -90382,
    Sat: 342908,
    Sun: 10359
  }
*/

var D = {'2020-01-01':4,'2020-01-02':4,'2020-01-03':6,'2020-01-04':8,'2020-01-05':2,'2020-01-06':-6,
 '2020-01-07':2,'2020-01-08':-2 };

var D_out = {'Mon':0,'Tue':0,'Wed':0,'Thu':0,'Fri':0,'Sat':0,'Sun':0};

var indices = {0:'Sun',1:'Mon',2:'Tue',3:'Wed',4:'Thu',5:'Fri',6:'Sat'};

var a;
var indi;
var val;
var left;
var right;
var mini;

for (const p in D){
    a =  new Date(p).getDay();//Returns number
    D_out[indices[a]] += D[p]; //Matching number with strings (sun,mon,tue......) and changing their value
}
// console.log(D_out);

//To find mean in case of zero values
for (const p in D_out){
    if (D_out[p] == 0){
        //Finding the numerical value of day ex:thur -> 4
        val = Object.keys(indices).find(key => indices[key] === p);//As it is unordered we are doing this
        val = parseInt(val)
        left = val-1;
        right = val+1;
        //LR function returns absolute left and right values which helps in calculating mean
        //We are doing this because let's say thu and fri has no value ..
        //then we should not take mean of fri instead we take (tue,sat) as (wed,fri) is not taken
        arr = LR(val,left,right);
        left = arr[0];
        right = arr[1];
        D_out[p] = (D_out[indices[left]]+D_out[indices[right]])/2;
    }
}
console.log(D_out);

function LR(val,left,right){

    mini = Math.min(val,6-val)-1//to cal no of iter
    if (val == 6){
        mini = 1;
        left = 5;//fri
        right = 0;//sun
    }
    if (val == 5){
        mini = 2;
    }
    while (mini>0){
        if (val == 5 && mini == 1)
            right = 0;
        if (D_out[indices[left]] == 0 || D_out[indices[right]] == 0){//Ex left = 3 -> indices[left]=Wed D_out[wed]= numerical
            left -= 1;
            right += 1;
        }
        else
            break;
        mini -= 1;
    }
    if (mini == 0){//default take mean of sun and mon
        left = 0;//sun
        right = 1;//mon
    }
    return [left,right];
}