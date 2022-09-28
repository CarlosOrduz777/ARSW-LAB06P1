# Laboratorio 6 parte 1
## Laura Valentina Alvarado,Carlos Orduz
### Front-End - Vistas
1.Cree el directorio donde residirá la aplicación JavaScript. Como se está usando SpringBoot, la ruta para poner en el mismo contenido estático (páginas Web estáticas, aplicaciones HTML5/JS, etc) es:

![imagen](https://user-images.githubusercontent.com/98195579/192691718-70ae491a-6149-435d-a59f-ee944e44be49.png)

### Front-End - Lógica
1.	Ahora, va a crear un Módulo JavaScript que, a manera de controlador, mantenga los estados y ofrezca las operaciones requeridas por la vista. Para esto tenga en cuenta el patrón Módulo de JavaScript, y cree un módulo en la ruta static/js/app.js .
2.	Copie el módulo provisto (apimock.js) en la misma ruta del módulo antes creado. En éste agréguele más planos (con más puntos) a los autores 'quemados' en el código.
3.	Agregue la importación de los dos nuevos módulos a la página HTML (después de las importaciones de las librerías de jQuery y Bootstrap):
 
5.	Haga que el módulo antes creado mantenga de forma privada:
o	El nombre del autor seleccionado.
o	El listado de nombre y tamaño de los planos del autor seleccionado. Es decir, una lista objetos, donde cada objeto tendrá dos propiedades: nombre de plano, y número de puntos del plano.
Junto con una operación pública que permita cambiar el nombre del autor actualmente seleccionado.

![imagen](https://user-images.githubusercontent.com/98195579/192691792-95c0f6f8-88f7-4147-8f1d-625659ba0c38.png)

6.	Agregue al módulo 'app.js' una operación pública que permita actualizar el listado de los planos, a partir del nombre de su autor (dado como parámetro). Para hacer esto, dicha operación debe invocar la operación 'getBlueprintsByAuthor' del módulo 'apimock' provisto, enviándole como callback una función que:
o	Tome el listado de los planos, y le aplique una función 'map' que convierta sus elementos a objetos con sólo el nombre y el número de puntos.
Al obtener los planos por medio de apimock, realizamos el map correspondiente para tener el nombre y el total de los puntos.

![imagen](https://user-images.githubusercontent.com/98195579/192691861-9c1130a2-c84a-4fbe-88be-4e2fb9956714.png)

o	Sobre el listado resultante, haga otro 'map', que tome cada uno de estos elementos, y a través de jQuery agregue un elemento <tr> (con los respectvos <td>) a la tabla creada en el punto 4. Tenga en cuenta los selectores de jQuery y los tutoriales disponibles en línea. Por ahora no agregue botones a las filas generadas.
 
o	Sobre cualquiera de los dos listados (el original, o el transformado mediante 'map'), aplique un 'reduce' que calcule el número de puntos. Con este valor, use jQuery para actualizar el campo correspondiente dentro del DOM.
Le enviamos a reduce, para que sume el total de los puntos y lo coloque en la interfaz.

![imagen](https://user-images.githubusercontent.com/98195579/192692044-9a2f330b-109d-4c02-8ae0-ebe50783e28d.png)

7.	Asocie la operación antes creada (la de app.js) al evento 'on-click' del botón de consulta de la página.
8.	Verifique el funcionamiento de la aplicación. Inicie el servidor, abra la aplicación HTML5/JavaScript, y rectifique que al ingresar un usuario 
existente, se cargue el listado del mismo. 

![imagen](https://user-images.githubusercontent.com/98195579/192692094-9a00096f-9019-48d8-aaa2-0e92daaadf6e.png)

