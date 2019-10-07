# Markdown Links

## Guía de uso e instalación de la librería

Para instalar esta librería debes ejecutar la siguiente linea de comando: `npm install --global SarAbigail/md-links`.
También puedes importarlo con `require` para usarlo programáticamente : `const mdLinks = require('md-links');`

## Documentación técnica de la librería

### API

#### `mdLinks(path, options)`

##### Argumentos

- `path`: Ruta absoluta o relativa al archivo o directorio. Si la ruta pasada es
  relativa se convierte a absoluta
- `options`: Un objeto con las siguientes propiedades:
  * `validate`: Booleano que determina si se desea validar los links
    encontrados.

##### Valor de retorno

La función debe retornar una promesa (`Promise`) que resuelva a un arreglo
(`Array`) de objetos (`Object`), donde cada objeto representa un link y contiene
las siguientes propiedades:

- `href`: URL encontrada.
- `text`: Texto que aparecía dentro del link (`<a>`).
- `file`: Ruta del archivo donde se encontró el link.

#### Ejemplo

```js
const mdLinks = require("md-links");

mdLinks.mdLinks("./some/example.md")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);

mdLinks.mdLinks("./some/example.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }]
  })
  .catch(console.error);

mdLinks.mdLinks("./some/dir")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);
```

### CLI (Command Line Interface - Interfaz de Línea de Comando)

El ejecutable de nuestra aplicación debe poder ejecutarse de la siguiente
manera a través de la terminal:

`md-links <path-to-file> [options]`

Por ejemplo:

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```

El comportamiento por defecto solo identifica el archivo markdown (a partir de la ruta que recibe como
argumento), analiza el archivo Markdown e imprime los links que vaya
encontrando, junto con la ruta del archivo donde aparece y el texto
que hay dentro del link (truncado a 50 caracteres).

#### Options

##### `--validate`

Si pasamos la opción `--validate`, el módulo debe hacer una petición HTTP para
averiguar si el link funciona o no. Si el link resulta en una redirección a una
URL que responde ok, entonces consideraremos el link como ok.

Ejemplo:

```sh13d99df067c1
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ OK 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html FAIL 404 algún doc
./some/example.md http://google.com/ OK 301 Google
```

Vemos que el _output_ en este caso incluye la palabra `OK` o `FAIL` después de
la URL, así como el status de la respuesta recibida a la petición HTTP a dicha
URL.

##### `--stats`

Si pasamos la opción `--stats` el output (salida) será un texto con estadísticas
básicas sobre los links.

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```

También podemos combinar `--stats` y `--validate` para obtener estadísticas que
necesiten de los resultados de la validación.

```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```

## Diagrama de flujo que soluciona el problema

[Diagrama de flujo](https://github.com/SarAbigail/LIM010-fe-md-links/blob/master/img/Diagrama%20de%20flujo.png?raw=true)

## Board con el backlog para la implementación de la librería

![Project](https://github.com/SarAbigail/md-links/blob/master/img/1.png)
![Backlog](https://github.com/SarAbigail/md-links/blob/master/img/2.png)

## Objetivos de aprendizaje

### Anteriores

- [x] Testeo asíncrono

### Javascript

- [x] Uso de callbacks
- [x] Consumo de Promesas
- [x] Creacion de Promesas
- [x] Modulos de Js
- [x] Recursión

### Node

- [x] Sistema de archivos
- [x] package.json
- [x] crear modules
- [x] Instalar y usar modules
- [x] npm scripts
- [x] CLI (Command Line Interface - Interfaz de Línea de Comando)

### Testing

- [x] Testeo de tus funciones
- [x] Testeo asíncrono
- [ ] Uso de librerias de Mock
- [ ] Mocks manuales
- [x] Testeo para multiples Sistemas Operativos

### Git y Github

- [x] Organización en Github

### Buenas prácticas de desarrollo

- [] Modularización
- [x] Nomenclatura / Semántica
- [x] Linting
