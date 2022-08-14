let lista;
let lista_productos = [];
let monto;



// Producto en carro


class Comprar{
    constructor(id, nombre_producto, valor_producto, cantidad_comprar, total_producto){
        this.id = id;
        this.nombre_producto = nombre_producto;
        this.valor_producto = valor_producto;
        this.cantidad_comprar = cantidad_comprar;
        this.total_producto = total_producto;
    }
}

class listado{
    constructor(nombre_producto, valor_producto){
        this.nombre_producto = nombre_producto;
        this.valor_producto = valor_producto;
    }
}

//Información de Productos

fetch("productos.json") //Uso de Fetch para traer una lista de productos desde un archivo JSON 

.then(response => response.json())
.then(productos =>{ lista = productos;

    let k = 0;

    for(k; k < lista.length; k++) {
    
        let nombre_producto = lista[k].nombre;
        let valor_producto = lista[k].precio;
        let creacion_producto = new listado(nombre_producto,valor_producto);
        lista_productos.push(creacion_producto);
    
    }

// Carrito de compras con todos los productos

let carrito_compras = [];

//Información de presentaciones - Cantidades

let lista_cantidades = [0.25, 0.5, 0.75, 1];

// Entrada de información - Selección de productos

let agregar = document.getElementsByClassName("add");

let i = 0;
let n;

// Captura de click en botones de agregar a carrito

for(i; i<lista_productos.length; i++){

    agregar[i].addEventListener("click",seleccionar)
    }
 
            
let seleccion_producto = 0;
monto = 0;

function seleccionar(e){

let boton = e.target;
let producto_padre = boton.parentNode;

producto = producto_padre.getElementsByClassName("card-title");
seleccion_producto =producto[0].textContent;
seleccion_producto = seleccion_producto.replaceAll('',"");
seleccion_producto = seleccion_producto.toLocaleLowerCase();

// Busqueda de elementos en catalogo de productos según click

function buscar_producto(busqueda){

    return busqueda.nombre_producto == seleccion_producto;

    }

let nombre = lista_productos.find(buscar_producto);
            
// Seleccion de cantidad a comprar

let cantidad = producto_padre.getElementsByClassName("form-select");
cantidad = cantidad[0].value;
cantidad = parseFloat(cantidad);

if(cantidad != 0){

        // Se crea producto en carro

        let id = carrito_compras.length;
        let {nombre_producto, valor_producto} = nombre; //Operador avanzado desestructuración
        let cantidad_comprar = cantidad;
        let total_producto = valor_producto * cantidad_comprar;

        let producto_en_carro = new Comprar(id, nombre_producto, valor_producto, cantidad_comprar, total_producto);

        // Se agrega producto a carro de compra

        carrito_compras.push(producto_en_carro);

        monto = producto_en_carro.total_producto + monto;

        //Se imprime información en carro de compras

        //Se resetea carro luego de cada compra
        let reset_2 = document.getElementById("carrito_interior");
        reset_2.innerHTML = `<tr class="elemento">
                            </tr>`;

        // Se imprime nueva lista de compras en carro

        let m=0;
        let lista_compras;
        let elemento_compra;

        for (let prouducto_comprado of carrito_compras){

        m++; //Contador de elementos en carrito

        lista_compras = document.getElementById("carrito_interior");
        elemento_compra= document.createElement("tr");
        elemento_compra.className = "elemento"
        elemento_compra.innerHTML = `   <td class="cont">${m}</td>
                                        <td>${prouducto_comprado.nombre_producto}</td> 
                                        <td>${prouducto_comprado.cantidad_comprar} Kg</td>
                                        <td>${prouducto_comprado.valor_producto} $/Kg</td>
                                        <td class="tot">${prouducto_comprado.total_producto} $</td>
                                        <td><button class='btn btn-success borrar'>Borrar</button></td>`;
        lista_compras.appendChild(elemento_compra);
    
        }

        // Se imprime el total de lista de compras en carro

        let total = document.getElementById("total");
        total.innerHTML =`<h4 class="total" id="total">El total a pagar por su compra es: ${monto} $</h4>`;

        if (monto > 0){

            //Redirección a pagina de checkout

            let redirect = document.getElementById("end");
            redirect.innerHTML =`<a href="checkout.html"> Finalizar la Compra </a>`;
            

            let checkout = document.getElementById("end");
            checkout.addEventListener("click",probar);
            
            function probar(e){
            checkout=e.button;

            // Se guarda carro de compras final y monto total en session storage para ser usado en checkout
    
            checkout === 0 && sessionStorage.setItem('Monto total',monto); //Operador avanzado lógico AND
            checkout === 0 && sessionStorage.setItem('Carrito de compras',JSON.stringify(carrito_compras));
          
             }
             }

        

        // Eliminar productos en carro

        let botones_borrar = document.querySelectorAll(".borrar");

            
        for( let boton of botones_borrar){

            boton.addEventListener("click" , borrar_elemento);
        }


        function borrar_elemento(e){

            // Se extraen del dom datos como el id del producto y el valor de ese producto para manipular el array

            let boton = e.target;
            let campo = boton.parentNode;
            let fila = campo.parentNode;
           
            cuenta_elemento = fila.getElementsByClassName("cont");
            cuenta=cuenta_elemento[0].textContent;
            cuenta=cuenta.replaceAll('',"");
            cuenta=parseInt(cuenta)-1;
            carrito_compras.splice(cuenta,1);
            cuenta=cuenta+1;

            cuenta_total = fila.getElementsByClassName("tot");
            cuenta_total = cuenta_total[0].textContent;
            cuenta_total = cuenta_total.replaceAll('',"");
            cuenta_total = parseInt(cuenta_total);


            fila.remove();

            //Se resetea carro luego de cada compra
            let reset_2 = document.getElementById("carrito_interior");
            reset_2.innerHTML = `<tr class="elemento">
                                </tr>`;

            
            m = 0;

            // Se imprime nueva lista de compras en carro
            

            for (let prouducto_comprado of carrito_compras){
    
            m++; //Contador de elementos en carrito
    
            lista_compras = document.getElementById("carrito_interior");
            elemento_compra= document.createElement("tr");
            elemento_compra.className = "elemento"
            elemento_compra.innerHTML = `   <td class="cont">${m}</td>
                                            <td>${prouducto_comprado.nombre_producto}</td> 
                                            <td>${prouducto_comprado.cantidad_comprar} Kg</td>
                                            <td>${prouducto_comprado.valor_producto} $/Kg</td>
                                            <td class="tot">${prouducto_comprado.total_producto} $</td>
                                            <td><button class='btn btn-success borrar'>Borrar</button></td>`;
            lista_compras.appendChild(elemento_compra);

            let botones_borrar = document.querySelectorAll(".borrar");

            
            for( let boton of botones_borrar){
    
                boton.addEventListener("click" , borrar_elemento);
            }

           
            }

            monto = monto - cuenta_total;

            if (monto > 0){

            // Se imprime el total de lista de compras en carro

            let total = document.getElementById("total");
            total.innerHTML =`<h4 class="total" id="total">El total a pagar por su compra es: ${monto} $</h4>`;

                }

            else {

            let total = document.getElementById("total");
            total.innerHTML =`<h4 class="total" id="total">No ha seleccionado ningún producto todavía</h4>`;

           }


          

            // proceso de checkout transferencia a página de toma de datos
        

        if (monto > 0){

            //Redirección a pagina de checkout

            let redirect = document.getElementById("end");
            redirect.innerHTML =`<a href="checkout.html"> Finalizar la Compra </a>`;
            

            let checkout = document.getElementById("end");
            checkout.addEventListener("click",probar);
            
            function probar(e){
            checkout=e.button;

            // Se guarda carro de compras final y monto total en session storage para ser usado en checkout
    
            checkout === 0 && sessionStorage.setItem('Monto total',monto); //Operador avanzado lógico AND
            checkout === 0 && sessionStorage.setItem('Carrito de compras',JSON.stringify(carrito_compras));
          
             }
             }

            else  {

                let redirect = document.getElementById("end");
                redirect.innerHTML =`<a href="#"> Finalizar la Compra </a>`;

             }
            }




         }
        
   }})

        
     


