### ALGORITMOS

Escribir una función simple (no más de 100 caracteres) que retorne un boolean indicando si un string
dado es un palíndromo.


```javascript
function p(s) {
  return !!s && s.toLowerCase() == s.toLowerCase().split('').reverse().join('');
}
```

### JAVASCRIPT 

What will the code below output to the console and why?

```javascript
var myObject = {
    foo : "bar",
    func:function() {
        var self=this;
        console.log("outer func: this.foo = "+this.foo);
        console.log("outer func: self.foo = "+self.foo);
        (function(){
            console.log("inner func: this.foo = " +this.foo);
            console.log("inner func: self.foo = " +self.foo);   
        }());
    }
};

myObject.func();
```

"outer func: this.foo = bar"

Porque cuando se declara una funcion como propiedad de un objeto el contexto de 'this' dentro de la misma es el objeto mismo, y aca se referencia la propiedad foo de this (en este caso this === myObject)


"outer func: self.foo = bar"

porque dentro de la misma funcion se declara que 'self' es igual a 'this' (por las razones que mencione anteriormente), entonces:

this === self

y

this.foo === self.foo


"inner func: this.foo = undefined"

Aca se usa un patron llamado 'module pattern' que usa una 'immediately invoked function expression' que en efecto hace que this se vuelva undefined

Esto es porque es una funcion inmediatamente invocada como una expresion (porque la invocacion esta entre parentesis, y dentro de parentesis no pueden haber statements, entonces el compilador la trata como expresion); a diferencia de los usos mas normales (aclaro mas normales porque es un tema bastante extenso) donde se declara una funcion como una propiedad del objecto global (window en el caso del navegador) y luego cuando se ejecuta entonces toma el objeto global como 'this', o cuando se declara como propiedad de un objeto y entonces toma 'this' como el objecto mismo, aca se ejecuta sin contexto 'this' ya que no esta declarada en ningun lado, entonces 'this' es undefined.

"inner func: self.foo = bar"

A pesar de que se ejecuta sin contexto 'this' todavia responde a la manera en que javascript trata el scope de las variables comunes y corrientes (que se llama functional scope), entonces al no encontrar 'self' en su scope local (el de la IIFE) lo encuentra en el de 'myObject.func', donde 'self' es 'myObject', y entonces 'self.foo === "bar"'



a. What is a Promise?

Una promesa es una manera de lidiar con la resolucion exitosa o fallida de tareas asincronicas.


b. What is ECMAScript?

ECMAScript es una especificacion estandarizada del lenguaje javascript del cual resultan distintas implementaciones o engines (node.js, los distintos motores que se encuentran en los navegadores, y otros)


c. What is NaN? What is its type? How can you reliably test if a value is equal to NaN ?

NaN es una propiedad del objeto global que significa "not a number", utilizando los operadores de comparacion NaN siempre es desigual a si misma.

Para chequear si un valor es igual a NaN se puede usar en ES5 la funcion isNan(value)

d. What will be the output when the following code is executed? Explain.

```javascript 
console.log(false=='0')
console.log(false==='0')
```

true
false


Esto ocurre porque cuando el operador '==' compara un booleano con otra expresion de otro tipo de datos, utiliza la coercion de tipos de dato a booleano de la expresion no booleana, entonces, expresiones tal como 0, '', null, y otros, terminan siendo evaluadas como false.

Por eso se dice que tales expresiones son falsey.

Esto no ocurre con el operador '===', el mismo no hace coercion de tipos de dato para evaluar expresiones de distinto tipo de datos, simplemente las considera desiguales.

### Node

Explain what does "event-driven, non-blocking I/O" means in Javascript.

Non-blocking I/O significa que las escrituras y las lecturas a disco pueden hacerse asincronicamente, lo que quiere decir es internamente Node cuenta con una API local que se encarga de hacer una lectura o escritura (I/O) mientras el programa sigue ejecutandose, especificando un callback a ejecutar una vez que esos datos esten disponibles, una vez que los datos estan disponibles se pone ese callback en la 'task queue' o 'cola de tareas' y a traves de un loop que se llama 'event loop' se van ingresando al stack apenas el mismo se encuentre vacio.

Por eso se llama non-blocking ya que podemos programar la aplicacion para que no se detenga nunca a esperar que se obtenga un recurso.

https://youtu.be/8aGhZQkoFbQ











