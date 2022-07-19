// Resumen y finalización de compra

// Data traida desde el session storage

let monto = sessionStorage.getItem('Monto total');
console.log(monto);

let prouducto_comprado = JSON.parse(sessionStorage.getItem("Carrito de compras"));


// Se imprime tabla resumen a partir de los datos del storage
        let m=0;
        let lista_compras;
        let elemento_compra;
        let carrito_compras = prouducto_comprado;

//Se imprimen elementos en el carrito de compra final
        for (let prouducto_comprado of carrito_compras){

        m = m++; //Contador de elementos en carrito

        lista_compras = document.getElementById("carrito_interior");
        elemento_compra= document.createElement("tr");
        elemento_compra.className = "elemento"
        elemento_compra.innerHTML = `   <td class="cont">${m}</td>
                                        <td>${prouducto_comprado.nombre_producto}</td> 
                                        <td>${prouducto_comprado.cantidad_comprar} Kg</td>
                                        <td>${prouducto_comprado.valor_producto} $/Kg</td>
                                        <td class="tot">${prouducto_comprado.total_producto} $</td>`;
        lista_compras.appendChild(elemento_compra);
    
        }


// Se imprime monto total

        let monto_total = document.getElementById("total_tabla");
        let elemento_total= document.createElement("tr");
        elemento_total.className = "monto_total";
        elemento_total.innerHTML = `<td> El subtotal de su compra es</td>
                                    <td> ${monto} $</td>`;
        monto_total.appendChild(elemento_total);

        let monto_iva = document.getElementById("total_tabla");
        let elemento_iva= document.createElement("tr");
        elemento_iva.className = "monto_total";
        elemento_iva.innerHTML = `<td> El total de su compra con IVA es</td>
                                    <td> ${monto*1.21} $</td>`;
        monto_iva.appendChild(elemento_iva);

