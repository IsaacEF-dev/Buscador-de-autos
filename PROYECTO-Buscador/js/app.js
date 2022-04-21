//Variables
const resultado = document.querySelector("#resultado");

const year = document.querySelector("#year");
const marca = document.querySelector("#marca");
const priceMin = document.querySelector("#minimo");
const priceMax = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");

const max = new Date().getFullYear() - 2;
const min = max - 10;

datosDeBusqueda = {
    year: "",
    marca: "",
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
};

document.addEventListener("DOMContentLoaded", () => {
        mostrarAutos(autos);

        llenarSelect();
    })
    /**Funciones */
function mostrarAutos(autos) {
    limpiarHtml() //limpia el html antes previo
    autos.forEach(auto => {
        const autoHtml = document.createElement('p');
        autoHtml.textContent = `
        ${auto.marca} ${auto.modelo} - ${auto.year} - ${auto.puertas} puertas - Transmicion: ${auto.transmision} - Precio:${auto.precio} - Color:${auto.color} 
        `;

        resultado.appendChild(autoHtml);
    })
}

marca.addEventListener('change', e => {
    datosDeBusqueda.marca = e.target.value;
    filtrarAuto();
});

year.addEventListener('change', e => {
    datosDeBusqueda.year = e.target.value;
    filtrarAuto();
});

priceMax.addEventListener('change', e => {
    datosDeBusqueda.maximo = e.target.value;
    filtrarAuto();
});

priceMin.addEventListener('change', e => {
    datosDeBusqueda.minimo = e.target.value;
    filtrarAuto();
});

puertas.addEventListener('change', e => {
    datosDeBusqueda.puertas = e.target.value;
    filtrarAuto();
});

transmision.addEventListener('change', e => {
    datosDeBusqueda.transmision = e.target.value;
    filtrarAuto();
});

color.addEventListener('change', e => {
    datosDeBusqueda.color = e.target.value;
    filtrarAuto();
});



function llenarSelect() {
    for (let i = max; i >= min; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);
    };
}

function limpiarHtml() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

/**Funcion que realiza una busqueda en base al filtro */
function filtrarAuto() {
    const busqueda = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMin).filter(filtrarMax).filter(filtrarPuertas).filter(filtrartransmision).filter(filtrarColor);
    if (busqueda.length) {
        mostrarAutos(busqueda);
    } else {
        noResultados();
    }

}

function noResultados() {
    limpiarHtml();
    const mensaje = document.createElement('div');
    mensaje.classList.add('error', 'alerta')
    mensaje.textContent = "No Hay Resutados, Intente Con Otro Terminos";
    resultado.appendChild(mensaje);
}

function filtrarMarca(auto) {
    const { marca } = datosDeBusqueda;
    if (marca) {
        return auto.marca === datosDeBusqueda.marca
    } else {
        return auto;
    }
}

function filtrarYear(auto) {
    const { year } = datosDeBusqueda;
    if (year) {
        return auto.year === parseInt(year);
    } else {
        return auto;
    }
}

function filtrarMin(auto) {
    const { minimo } = datosDeBusqueda;
    if (minimo) {
        return auto.precio >= parseInt(minimo);
    } else {
        return auto;
    }
}

function filtrarMax(auto) {
    const { maximo } = datosDeBusqueda;
    if (maximo) {
        return auto.precio <= parseInt(maximo);
    } else {
        return auto;
    }
}

function filtrarPuertas(auto) {
    const { puertas } = datosDeBusqueda;
    if (puertas) {
        return auto.puertas === parseInt(puertas);
    } else {
        return auto;
    }
}

function filtrartransmision(auto) {
    const { transmision } = datosDeBusqueda;
    if (transmision) {
        return auto.transmision === transmision;
    } else {
        return auto;
    }
}

function filtrarColor(auto) {
    const { color } = datosDeBusqueda;
    if (color) {
        return auto.color === color;
    } else {
        return auto;
    }
}