### CASO 1

 Dada las siguientes funciones

  ```javascript
    var Foo = function( a ) {
      var baz = function() {
        return a;
      };
      this.baz = function() {
        return a;
      };
    };

    Foo.prototype = {
      biz: function() {
        return a;
      }
    };

    var f = new Foo( 7 );
    f.bar(); 
    f.baz(); 
    f.biz(); 
  ```

 1. ¿Cuál es el resultado de las últimas 3 líneas?

 2. Modificá el código de `f.bar()` para que retorne `7`?

 3. Modificá el código para que `f.biz()` también retorne `7`?


 1. 
 
 De la linea "f.bar()": El resultado es "f.bar is not defined", ya que en la funcion que en este caso llamamos "Foo" no se declara este metodo (para usar posteriormente instanciando con "new")

```javascript
 this.bar = function(){
   //hacer algo
 };
 ```

 Luego, de la segunda linea "f.baz()": El resultado es 7, ya que se construye el objeto f usando 7 como valor de argumento de Foo, entonces la funcion:

```javascript
 this.baz = function(){
   return a;
 };
 ```
 Devuelve 7 ya que al asginarle "new Foo(7)" a "f" creamos un closure donde para los metodos de "f", "a" siempre sera 7 y "vivira" en esa nueva instancia de "Foo" creada usando "new Foo(7)".

 2.

 ```javascript
    var Foo = function( a ) {
      this.baz = function() {
        return a;
      };

      this.bar = this.baz;
    };

 ```

 3.

  ```javascript
    Foo.prototype = {
      biz: function(a) {
        return this.baz();
      }
    };
 ``` 



### CASO 2

Partiendo del siguiente array:

```javascript
var endorsements = [
  { skill: 'css', user: 'Bill' },
  { skill: 'javascript', user: 'Chad' },
  { skill: 'javascript', user: 'Bill' },
  { skill: 'css', user: 'Sue' },
  { skill: 'javascript', user: 'Sue' },
  { skill: 'html', user: 'Sue' }
];
```

¿Cómo podrías ordenarlo de la siguiente forma?:

```javascript
[
  { skill: 'css', users: [ 'Bill', 'Sue', 'Sue' ], count: 2 },
  { skill: 'javascript', users: [ 'Chad', 'Bill', 'Sue' ], count: 3 },
  { skill: 'html', users: [ 'Sue' ], count: 1 }
]
```
Podria resolverlo de la siguiente manera ...

```javascript
var endorsements = [
  { skill: 'css', user: 'Bill' },
  { skill: 'javascript', user: 'Chad' },
  { skill: 'javascript', user: 'Bill' },
  { skill: 'css', user: 'Sue' },
  { skill: 'javascript', user: 'Sue' },
  { skill: 'html', user: 'Sue' }
];


var solver = {
  internalObj: {},
  
  addUser: function(skill, name){
    if(!this.internalObj[skill]){
      this.internalObj[skill] = [name]; 
    }else{
      this.internalObj[skill].push(name);
    }
  },
  
  addFromEndorsements: function(arr){
    arr.forEach(function(currObj){
      this.addUser(currObj.skill, currObj.user);
    }.bind(this));
  },
  
  arrObj: function(){
    var arrOut = [];
    
    for (var key in this.internalObj){
      arrOut.push(
        {
          skill: key,
          users: this.internalObj[key],
          count: this.internalObj[key].length,
        }
      );
    }
    
    return arrOut;
  },
  solve: function(endorsements){
    this.addFromEndorsements(endorsements);
    return this.arrObj();
  }
};



var nuevoEndorsements = solver.solve(endorsements);

console.log(nuevoEndorsements);
```

### CASO 3

Tengo las siguientes funciones:

```javascript
function buscarEnFacebook(texto, callback) {
  /* Hace algunas cosas y las guarda en "result" */
  if (result.error) {
    callback(error, result.error)
  } else {
    callback(null, result.data);
  }
}
function buscarEnGithub(texto, callback) {
  /* Hace algunas cosas y las guarda en "result" */
  if (result.error) {
    callback(error, result.error)
  } else {
    callback(null, result.data);
  }
}
```

  - ¿Qué debería hacer para usar la funcionalidad con promesas y no callbacks?


  ```javascript
  function buscarEnFacebook(texto){
    
    /* Hace algunas cosas y devuelve una promesa que resuelve o rechaza en "result" */


    algunasCosasDevuelveUnaPromesa(/*argumentos*/)
    
    //Tal como puede ser una llamada http a un servicio rest con axios
      
      .then(function(result){

        //la promesa vuelve en estado 'fullfilled' y por eso sabemos que los datos estan

        return result.data;
      })
      .catch(function(result){
        
        //la promesa vuelve en estado 'rejected y por eso sabemos que recibimos un error

        return result.error
      })
  }
  ```


  - ¿Podés replicar la siguiente API?
    ```javascript
    buscador('hola')
    .facebook()
    .github()
    .then((data) => {
      // data[0] = data de Facebook
      // data[1] = data de GitHub
    })
    .catch(error => {
      // error[0] = error de Facebook
      // error[1] de GitHub
    })
    ```

    La replique en index.js

  - y a la solución anterior
  - ¿Cómo podrías agregarle otra búsqueda?

  Referirse a index.js

  - ¿Cómo solucionas el problema de si una API entrega un error, mientras las otras devuelven data?

  Se usa catch en la promise para efectuar una HTTP response acorde a lo que necesite la aplicacion








