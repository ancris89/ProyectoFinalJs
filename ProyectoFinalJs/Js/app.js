var presupuesto= 0;
var porcentajeEgreso = 0;


let egresos = [new Egreso ('Renta',40000),new Egreso ('Ropa',9200)];
let ingresos = [new Ingreso ('Salario',20000),new Ingreso('Venta auto',50000), new Ingreso('Rentas',80000)];


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
    let ingresosHTML ='';
    for (let ingreso of ingresos) {
        console.log(ingreso._descripcion, ingreso._valor);
    }
    document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
}

//cargarEgresos
const  cargarEgresos = ()=>{
    let egresosHTML ='';
    for (let egreso of egresos) {
        console.log(egreso._descripcion, egreso._valor);
    }
    document.getElementById("lista-egresos").innerHTML = egresosHTML;
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
        let forma = document.getElementById('#forma');
        let tipo = document.querySelector('#tipo');
        let descripcion = document.getElementById('#descripcion');
        let valor = document.getElementById('#valor');

    if(descripcion !== '' || valor !== 0){
        if(tipo === 'ingreso'){
                ingresos.push(new Ingreso (descripcion,valor));
                
        }else{
                egresos.push(new Egreso (descripcion,valor));
        }       
};
if(descripcion === '' || valor === 0){
        alert('La descripcion y/o valor esta vacia.  Por favor ingrese un concepto');
};
cargarCabecero();
cargarIngresos();

}
