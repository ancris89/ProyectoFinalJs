var presupuesto= 0;
var porcentajeEgreso = 0;


const ingresos = [
    new Ingreso("Salario", 2100.00),
    new Ingreso("Venta coche ", 1500)
];

const egresos = [
    new Egreso("Renta departamento", 900),
    new Egreso("Ropa", 400)
];


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
        totalIngresos += ingreso.valor;
    }
    return totalIngresos;  
};
//totalEgreso
let totalEgresos = () => {
    let totalEgresos = 0;

    for (let egreso of egresos) {
        totalEgresos += egreso.valor;
    }  
    return totalEgresos;
};

const formatoMoneda = (numero) => {
    console.log(numero);
    numero = numero.toLocaleString('es-MX', {style: 'currency',currency: 'MXN', minimumFractionDigits: 2});
    return numero;
}

const formatoPorcentaje = (porcentaje) => {
    porcentaje = porcentaje.toLocaleString('es-MX', {style: 'percent', minimumFractionDigits: 2});
    return porcentaje;
};

const cargarAPP=() =>{
    cargarCabecero();
}

//cargarIngresos
const cargarIngresos = ()=>{
    let ingresosHTML ="";
    for (let ingreso of ingresos) {
        ingresosHTML += crearIngresosHTML(ingreso);
    }
    document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
}

//cargarEgresos
const  cargarEgresos = ()=>{
    let egresosHTML ="";
    for (let egreso of egresos) {
        egresosHTML += crearEgresosHTML(egreso);
    }
    document.getElementById("lista-egresos").innerHTML = egresosHTML;
}

//crearIngresosHtml
const crearIngresosHTML =(ingreso)=>{
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${ingreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
                <div class="elemento_eliminar">
                    <button class="elemento_eliminar--btn">
                        <ion-icon name="close-circle-outline" 
                        onclick="eliminarIngreso(${ingreso.id})"  ></ion-icon>
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
    return ingresoHTML;
}

//crearEgresosHtml
const crearEgresosHTML =(egreso)=>{
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${egreso.descripcion} </div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor"> ${formatoMoneda(egreso.valor)}</div>
            <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos()) }</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline"
                    onclick="eliminarEgreso(${egreso.id})"   ></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;
    return egresoHTML;

}

//EliminarIngreso
const eliminarIngreso = (id)=>{
    let indiceEliminar =  ingresos.findIndex(ingreso => ingreso.id === id );
                         
    ingresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
  }

  //eliminarEgreso
const eliminarEgreso = (id)=>{
    let indiceEliminar =  egresos.findIndex(egreso => egreso.id === id );
    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
}

//agregarDato
let agregarDato = ()=>{
    let forma = document.forms["forma"];
    let tipo = forma["tipo"];
    let descripcion= forma["descripcion"];
    let valor = forma["valor"];

    if (descripcion.value !== "" && valor.value !=="") {
        if (tipo.value==="ingreso") {
            
            ingresos.push(new Ingreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarIngresos();
        } else if(tipo.value ==="egreso"){
            egresos.push( new Egreso(descripcion.value, Number(valor.value)));
            cargarCabecero();   
            cargarEgresos();
        }
        

    } 

}
