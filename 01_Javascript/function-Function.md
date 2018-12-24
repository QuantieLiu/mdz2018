
### Function与function主要区别：
<li>Function是一个功能完整的对象，作为JS的内置对象之一。
<li>function只是一个关键字，用来创建一个普通函数或对象的构造函数。
<li>JS的普通函数都是Function对象的实例，所以函数本身也是一个对象，就像var一样，只不过这个对象具有可调用特征而已

### function创建对象和普通函数的区别:
<li>如果用function创建构造函数，例如：var a = new function{}() 或者  var b = new Person();  则a、b就不是普通函数，而是作为一个真正对象，是Object类型。
<li>虽然普通函数也是对象，但一个是Function，作为函数；一个是Object，作为对象。 关于这个问题，可以使用instanceof运算符去验证。

### 注意：
关键字function和原始类型的function名称是相同的，但就像object和Object一样，两者没半毛钱关系。一个是作为创建函数的关键字，一个是用来判断一个对象（函数）是不是Funtion类型。

``` 
        //  函数声明：使用function声明一个函数，再为其指定一个函数名。
        //  每次调用构造函数时都要被解析和编译一次
        function first(){
            alert("函数声明方式");
        }
        //  函数表达式：使用function声明一个函数，但没有函数名，而是将这个函数赋给一个变量。也叫作匿名函数
        //  在使用时只被解析一次
        var second = function(arg1, arg2){
            alert(arg1+"|" + arg2+"\n匿名函数方式")
        }
        //  使用Function对象构造函数创建函数,性能较慢
        var third = new Function(
            "a1", "a2", "alert('函数对象,' + a1 + '|' + a2)"
        );

``` 

``` 
        //  1.直接执行方式或采用事件来执行函数
        first();
        second("ABC", "XYZ");
        third("火", "土");
 
        //  2.函数也是对象，所以像变量一样.把函数名赋给另一个变量，那个变量就指向该函数地址
        //  相当于再进行一次封装。动态添加对象方法时会用到。
        var a = first;
        var b = second; 
        a();
        b("ABC", "XYZ");
 
        //注意！这种方式是直接执行third()函数,而不是赋值函数名。
        var c = third("火", "土");

``` 

### 区别和优缺点：
<li>函数声明在使用之前，就会被加载到作用域中，随时等待调用。而函数表达式(匿名函数)则是在代码执行到那一行才被定义，提前使用则会出错。
  
``` 
        first(); //可以执行
        function first(){
            alert("函数声明方式");
        }
        
        //second函数需提前
        //(15,25); //执行出错
        var second = function(arg1, arg2){
            alert(arg1+"|" + arg2+"\n匿名函数方式")
        }

``` 

<li>匿名函数(函数表达式)与Function()构造函数用法很相似，它们的不同点：匿名函数在使用时只被解析一次。
<li>作为字符串传递给Function()构造函数的JS代码在每次调用构造函数时都要被解析和编译一次。
<li>Function对象的就是通过构造函数动态地创建和编译一个函数，但最好不要过多使用，因为用Function对象构造函数定义函数比其他两种慢多了。
  
### JS函数
<ul>因为JS的弱类型特性，函数形参无法指定具体类型，返回类型自然也没有，return可以返回任何类型。
<ul>JS函数不限制传递的参数数量。这表明就算函数的参数列表已确定，照样可以传入多个参数。
<ul>JS函数没有重载，如果有同名函数，后一个会覆盖前一个。
 
 ``` 
  <script>
        // 定义函数，返回传入的参数值
        function getVal(val){
            return val;
        }
        var a = getVal("传入val值", 200); //传入2个参数
        //只定义了两个参数a,b 可以是任何类型
       function method1(arg1, arg2){
            console.log("method1函数值：" + arg1 + "，" + arg2);
            console.log("a值：" + a);
       }
    </script>
    <!-- 往method1函数中传入4个参数 -->
    <button onclick="method1(1, 'abc', 100, true)">点击</button>
    <!-- 控制台输出
        method1函数值：1，abc
        a值：传入val值 
    -->

``` 

<li>尽管定义函数时参数数量已确定，但依然可以往里面传入多个参数，JS不会对其进行检查。
<li>看起来无参函数和有参函数似乎没啥区别，反正参数可以随便传。但只有定义了形参，函数内部才能方便地使用定义好的形参。
<li>如果函数没有定义形参，你传入一堆参数给无参函数，函数内部无法直接拿到传入的参数值。
<li>这时候就只能通过函数内部的arguments对象来获取实参

#### 参数传入数量

<li>如果传递的参数数量少于函数本身定义的形参数量时，之后的参数值都是undefined，因为没对其传值，就和定义了变量却没赋值一样。
<li>如果是在强类型语言中，这种问题是没有的，所以要注意JS的特性
  
### 关于arguments对象
<li>arguments是每个函数内部都有的内部对象。函数所有接收的实参都由它来存储管理。取值方式和数组差不多
  
``` 
  <script>
        //返回所有传入的参数
        function getArgs(){
            var all = "";
            for(var i = 0; i < arguments.length; i++){
                all += arguments[i] + " ";
            }
            return all;
        }
        function show(){
            var allArgs = getArgs("我", 150, new Date(), "ABC", 555);
            console.log(allArgs);
            // 我 150 Wed Sep 13 2017 21:19:53 GMT+0800 (中国标准时间) ABC 555 
        }       
 </script>
 <button onclick="show()">点击</button>
``` 
通过上面实例，可以看到arguments对象能拿到函数实参，无参函数通过arguments[0] 、argument[1]就能拿到传入的第一个实参和第二个实参。但这种获取实参方式不能乱用。如果规定了形参就使用形参，并且不要多传无用参数。而无参函数就别传入参数，一是无用，二是容易误导，代码写规范点总是没错的。

#### JS函数为什么没重载---动态类型
<li>重载的条件：方法名相同，但只要形参类型不相同或者形参数量不相同，都会导致方法重载。至于有无返回值则和重载条件无关。这样就会出现同名但方法不同。
<li>在JS中，函数参数数量没法确定，而且参数类型可以是任意的，如果函数同名，后面的会覆盖前面的。
<li>可以通过arguments得到参数长度来实现另类重载

 
### 匿名函数
 
 待补充：https://blog.csdn.net/fengwei4618/article/details/77955261
 
 
 
  
