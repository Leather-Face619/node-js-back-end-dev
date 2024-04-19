var arr = [2,4,6,7,12]
//foreach
arr.forEach((v, i) =>{
    // console.log(v, i);
})
//map
var e= arr.map((v, i) =>{
    return v*2;

})
//  console.log(e);
 //filter
 var f = arr.filter((v, i) =>{
     if(v<=6){
        return false
    } else{
        return true
    }

})
// console.log(f);
//Find
var g =arr.find((v, i) =>{
    return (v==55)
})
// console.log(g);
//indexof

var h = arr.indexOf(4)
console.log(h);