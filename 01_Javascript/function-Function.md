
### Function与function主要区别：
<li>Function是一个功能完整的对象，作为JS的内置对象之一。
<li>function只是一个关键字，用来创建一个普通函数或对象的构造函数。
<li>JS的普通函数都是Function对象的实例，所以函数本身也是一个对象，就像var一样，只不过这个对象具有可调用特征而已

### function创建对象和普通函数的区别:
<li>如果用function创建构造函数，例如：var a = new function{}() 或者  var b = new Person();  则a、b就不是普通函数，而是作为一个真正对象，是Object类型。
<li>虽然普通函数也是对象，但一个是Function，作为函数；一个是Object，作为对象。 关于这个问题，可以使用instanceof运算符去验证。

### 注意：
关键字function和原始类型的function名称是相同的，但就像object和Object一样，两者没半毛钱关系。一个是作为创建函数的关键字，一个是用来判断一个对象（函数）是不是Funtion类型。


