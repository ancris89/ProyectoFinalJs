var presupuesto= 0;
var porcentajeEgreso = 0;


let egresos = [new Egreso ('Renta',40000),new Egreso ('Ropa',9200),new Egreso ('test',  200)];
let ingresos = [new Ingreso ('Salario',20000),new Ingreso('Venta auto',50000), new Ingreso('Rentas',80000), new Ingreso('Prueba',80000), new Ingreso('Pruebaaaa',80000)];


const cargarCabecero = () =>  {
    presupuesto = totalIngresos() - totalEgresos();
    porcentajeEgreso = totalEgresos() / totalIngresos();
    document.getElementById('presupuestoo').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML= formatoPorcentaje(porcentajeEgreso);
    document.getElementById('egresos').innerHTML= formatoMoneda(totalEgresos());
    document.getElementById('ingresos').innerHTML= formatoMoneda(totalIngresos());
   
}

//totalIngresos
let totalIngresos = () => {
    let totalIngresos = 0;

    for (let ingreso of ingresos) {
        totalIngresos += parseFloat(ingreso.valor);
    }
    return totalIngresos;  
};
//totalEgreso
let totalEgresos = () => {
    let totalEgresos = 0;

    for (let egreso of egresos) {
        totalEgresos += parseFloat(egreso.valor);
    }  
    return totalEgresos;
};

const formatoMoneda = (numero) => {
    numero = numero.toLocaleString('es-MX', {style: 'currency',currency: 'MXN', minimumFractionDigits: 2});
    return numero;
}

const formatoPorcentaje = (porcentaje) => {
    porcentaje = porcentaje.toLocaleString('es-MX', {style: 'percent', minimumFractionDigits: 2});
    return porcentaje;
};


const cargarAPP=() =>{
    cargarCabecero();
    cargarIngresos(ingresos)
    cargarEgresos(egresos)
}

//cargarIngresos
const cargarIngresos = (ingresos)=>{
    console.log(ingresos);
    let ingresosHTML ='';
    for (let ingreso of ingresos) {
        ingresosHTML += `
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">
                ${ingreso._descripcion}
            </div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">
                    ${formatoMoneda(ingreso._valor)}
                </div>
                <div class="elemento_eliminar">
                    <button class="elemento_eliminar_btn"><ion-icon name="close-circle-outline" onclick="eliminarIngreso(${ingreso.Id})" role="img" class="md hydrated"></ion-icon></button>
                </div>
            </div>
        </div>`
    }
    document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
}

//cargarEgresos
const  cargarEgresos = (egresos)=>{
    let egresosHTML ='';
    for (let egreso of egresos) {
        egresosHTML += `
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">
                ${egreso._descripcion}
            </div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">
                    ${formatoMoneda(egreso._valor)}
                </div>
                <div class="elemento_eliminar">
                    <button class="elemento_eliminar_btn"><ion-icon name="close-circle-outline" onclick="eliminarEgreso(${egreso.Id})" role="img" class="md hydrated"></ion-icon></button>
                </div>
            </div>
        </div>`
    }
    console.log(egresosHTML);

    document.getElementById("lista_egresos").innerHTML = egresosHTML;
}

//crearIngresosHtml
const crearIngresosHTML =(ingreso)=>{
    let ingresosHTML = 
                `<div class="limpiarEstilos; elemento">
                <div class=elemento_descripcion">${ingreso._descripcion}
                        <div class="limpiarEstilos; derecha"> 
                                <div class="elemento_valor">${formatoMoneda(ingreso._valor)}</div>
                                <div class="elemento_eliminar">
                                        <button class="elemento_eliminar--btn">
                                        <ion-icon name="close-circle-outline" onclick="eliminarIngreso(${ingreso._id})"></ion-icon>
                                        </button>
                                </div>
                                </div>
                        </div>
                </div>`;
     
        return ingresosHTML;
}

//crearEgresosHtml
const crearEgresosHTML =(egreso)=>{
    let egresosHTML = 
                `<div class="limpiarEstilos; elemento">
                <div class=elemento_descripcion">${egreso._descripcion}
                    <div class="limpiarEstilos; derecha"> 
                        <div class="elemento_valor">${formatoMoneda(egreso._valor)}</div>
                        <div class="elemento_porcentaje">${formatoPorcentaje(egreso._valor/totalEgresos())}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                            <ion-icon name="close-circle-outline" onclick="eliminarEgreso(${egreso._id})"></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>
            </div>`;

        return egresosHTML;

}

//EliminarIngreso
const eliminarIngreso = (id)=>{
    let indiceEliminar =  ingresos.findIndex(ingreso => ingreso.Id === id );
                         
    ingresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos(ingresos);
  }

  //eliminarEgreso
const eliminarEgreso = (id)=>{  
    let indiceEliminar =  egresos.findIndex(egreso => egreso.Id === id );
    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos(egresos);
}

//agregarDato
let agregarDato = ()=>{
    let forma = document.getElementById('forma');
    let tipoSelect = forma.querySelector('#tipo');
    let descripcionInput = forma.querySelector('#descripcion');
    let valorInput = forma.querySelector('#valor');

    let tipo = tipoSelect.value
    let descripcion = descripcionInput.value
    let valor = valorInput.value

    if(descripcion === '' || valor === 0){
        alert('La descripcion y/o valor esta vacia.  Por favor ingrese un concepto');
        return
    };
    if(tipo === 'ingreso'){
        ingresos.push(new Ingreso (descripcion,valor));
        cargarIngresos(ingresos);
    }else{
        egresos.push(new Egreso (descripcion,valor));
        cargarEgresos(egresos);
    }
    cargarCabecero();
    descripcionInput.value = ""
    valorInput.value = ""
}
