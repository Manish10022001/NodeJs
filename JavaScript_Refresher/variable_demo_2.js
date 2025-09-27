function varTest(){
    if(2==2){
        var a = 10;
        console.log("inside block",a);
    }
    console.log("Outside block", a);
}
varTest();

function letTest(){
    if(3==3){
        let b = 20;
        console.log("inside block",b);
    }
    //console.log("outside block",b);  b not visible outside block
}
letTest();

function constTest(){
    if(4==4){
        let c = 30;
        console.log("inside block",c);
    }
    //console.log("outside block",c);
}
constTest();