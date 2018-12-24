
## 数据类型

<li>基本类型-值类型：undefined(未定义)、null(空)、number(数字)、string、boolean、symbol(新增的，没用过)
<li>引用类型-对象类型：object function

<li>一切基于对象，所有事物都可以看作对象。这意味着在JS中使用的一切都是对象。给一个简单实例：给一个变量赋值，这个过程没用到new操作符创建相应对象，但却可以使用它的包装对象方法。

``` 
  <!-- 以字面量形式创建 -->
    <script>
       var a = 15;
       var b = "abcde";
       var len  = b.length;
       var c = b.charAt(0);
       document.write("长度：" + len + ", b索引字符:" + c);
       //结果：长度：5, b:a
    </script>
    <!--以对象形式来创建 -->
    <script>
       var a = new Number(15);
       var b = new String("abcde");
       document.write(a.length + " , " + b.charAt(0)); //结果和上面一样，两者使用方式相同
    </script> 

``` 

<li>在JS中，直接使用值类型给变量赋值，JS也会把基本类型包装成相应对象，这时变量就是一个对象，所以才能直接使用方法。和Java相比，Java只有在需要值类型和包装类需要转换时才会自动进行装箱拆箱，否则严格按照本身定义的类型来使用，不会全部转成对象。所以搞明白JS中的一切都是对象这个概念后，包括变量、函数什么的都可以看作是对象。

<li>原始类型的作用仅仅是在使用 typeof 和 instanceof  用来判断具体类型，或是作为返回的字符串，用来表明该类型是什么，是基本类型还是引用类型

#### 数据类型用对象类型来会更符合JS的定义
<li>Undefined表示的是一个变量被声明但是没有初始化，即没有赋值。值为undefined
<li>Null则和Java中概念差不多，唯一值是null，表示对象的引用地址为空

### 运算符typeof
<li>typeof 的返回值 和用于判断的值都是JS的原始类型，就是:
基本类型-值类型：undefined(未定义)、null(空)、number(数字)、string、boolean、symbol(新增的，没用过)

``` 
  <!-- 使用typeof()来得到变量的原始类型，也可以直接 typeof var -->
    <script>
       var a = 15;
       var b = "abcde";
       var c = false;
       var d = function(){} //这是一个函数
       var e = new Function(); //这是一个函数对象
       var f; //没赋值
      document.write("a:" + typeof(a) + "<br>");
      document.write("b:" + typeof(b) + "<br>");
      document.write("c:" + typeof(c) + "<br>");
      document.write("d:" + typeof(d) + "<br>");
      document.write("e:" + typeof(e) + "<br>");
      document.write("f:" + typeof f +"，undef："+typeof(undef)+ "<br>");
    </script>
    <!--结果
        a:number
        b:string
        c:boolean
        d:function
        e:function
        f:undefined，undef：undefined -->

``` 

<li>typeof var === 'type' 对变量类型进行判断

``` 
 var a = 150;
        var b = "abcde";
        var c = false;
        alert(typeof a === 'number');    //true
        alert(typeof b === 'number');    //fasle
        alert(typeof c === 'boolean');   //true
        alert(typeof d === 'undefined'); //true      

``` 
<li>使用typeof判断对象类型变量时，都是返回object

``` 
 <script>
        //定义两个构造函数
        function cons1(){}
        function cons2(){}
        var a = new cons1();
        var b = new cons2();
        alert(typeof a === cons1);//false
        alert(typeof b === cons2);//false
        alert(typeof a);//object
        alert(typeof b);//object
 </script>
``` 

<li>typeof对于判断对象类型具有局限性，所以判断对象类型应使用insatanceof运算符

### 运算符instanceof


<li>instanceof运算符会判断指定对象类型的prototype
``` 
 //定义两个构造函数
        function cons1(){}
        function cons2(){}
        var a = new cons1();
        var b = new cons2();
        var aa = new Function(); //这是一个函数对象
        var arr = []; //字面量创建数组
        var arr2 = new Array();//数组对象创建数组
        var obj = {name:"傲天", age:19}; //使用字面量创建对象
        alert(a instanceof cons1); //返回true
        alert(b instanceof cons2); //返回true
        alert(aa instanceof Function); //返回true
        alert(arr instanceof Object); //返回true
        alert(arr instanceof Array); //返回true
        alert(obj instanceof Object); //返回true

``` 
##### 主要区别：typeof用于判断基本类型，instanceof 用于判断对象类型











