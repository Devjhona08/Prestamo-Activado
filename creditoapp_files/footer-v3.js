const footerbcp = document.querySelector('.bcp_footer');

const fechaDerechoReservado = new Date();
const periodoDerechoReservado = fechaDerechoReservado.getFullYear();
footerbcp.querySelectorAll('.bcp_texto_derecho_reservado p').forEach(item => {
    if (item.innerHTML.indexOf('#periodo') != -1) {
        item.innerHTML = item.innerHTML.replace('#periodo', periodoDerechoReservado);
    }
})

const eleOpciones = footerbcp.querySelectorAll('.bcp_opciones');
eleOpciones.forEach(opcion => {
        agregarDataTransaleElementosHijosDescripcion(opcion);
})
const replaceAllFooter = (str, find, replace) => {
    return str.replace(new RegExp(find, 'g'), replace);
}
footerbcp.querySelectorAll('.bcp_opciones').forEach(item => {
    let anterior = replaceAllFooter(item.innerHTML, `<p dir="ltr">`, `<li>`);
    anterior = replaceAllFooter(anterior, `</p>`, `</li>`);
    item.innerHTML = anterior
})

//Regreso
footerbcp.querySelector('.bcp_contenedor_btn_regreso .bcp_btn_regreso').addEventListener('click', () => {

    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })

    digitalData.push({
        "action": {
            "group": "Footer",
            "category": "Footer",
            "name": "Click",
            "label": 'Volver a arriba'
        },
        "event": "trackAction"
    })
})

//Menu interaccion
if (window.matchMedia("(min-width: 767px)").matches) {
    footerbcp.querySelectorAll('.bcp_titulo_opciones.mobile').forEach(item => item.removeAttribute('aria-expanded'));
} else {
    footerbcp.querySelectorAll('.bcp_titulo_opciones.mobile').forEach(item => item.setAttribute('aria-expanded', 'false'));
}

footerbcp.querySelectorAll('.bcp_titulo_opciones.mobile').forEach(function (element_titulo_grupo_click) {
    element_titulo_grupo_click.addEventListener("click", function (event) {

        let isDesktop = window.matchMedia("(min-width: 768px)").matches;

        if(!isDesktop){
            let element = event.currentTarget;
            let opciones = element.parentElement.querySelector('.bcp_opciones.mobile');
    
            if (element.parentElement.className.indexOf('mostrar') == -1) {
                opciones.parentElement.classList.add('mostrar');
                opciones.style.height=opciones.scrollHeight+'px';
                element.setAttribute('aria-expanded', 'true');
            } else {
                    opciones.parentElement.classList.remove('mostrar');
                opciones.style.height='0px';
                element.setAttribute('aria-expanded', 'false');
            }
        }
    })
})

//taggeo de opciones de footer
footerbcp.querySelectorAll('.bcp_opciones.mobile a').forEach(function (opcion) {
    opcion.addEventListener('click', (event) => {
        let elementClick = event.currentTarget;
        let labelCategoria = fnGetParent(elementClick, '.bcp_opciones.mobile').parentElement.querySelector('.bcp_titulo_opciones.mobile').innerText.trim();
        let labelOpcion = elementClick.innerText.trim();

        digitalData.push({
            "action": {
                "group": "Footer",
                "category": labelCategoria,
                "name": "Click",
                "label": cleanLabel(labelOpcion)
            },
            "event": "trackAction"
        })
    })
})

//Taggeo Ubicanos o Agencias BCP
footerbcp.querySelectorAll('.bcp_column_ubicanos a').forEach((btnAgencia) => {
    btnAgencia.addEventListener('click', (event) => {

        digitalData.push({
            "element": {
                "container": "Footer",
                "type": "Link",
                "name": "Ver Agencias"
            },
            "event": "trackElement"
        })
    })
})

//Contactanos
footerbcp.querySelector('.bcp_enlace_ayuda_whatsapp').addEventListener("click", (btn) => {
    let btnClick = btn.currentTarget.querySelector("span").innerText
    digitalData.push({
        "action": {
            "group": "Footer",
            "category": "Contactanos",
            "name": "Click",
            "label": cleanLabel(btnClick)
        },
        "event": "trackAction"
    })
})

footerbcp.querySelector('.bcp_enlace_ayuda_ubicanos').addEventListener("click", (btn) => {
    let btnClick = btn.currentTarget.querySelector("span").innerText
    digitalData.push({
        "action": {
            "group": "Footer",
            "category": "Contactanos",
            "name": "Click",
            "label": cleanLabel(btnClick)
        },
        "event": "trackAction"
    })
})


//Redes sociales
footerbcp.querySelectorAll('.bcp_acceso_redes_sociales a').forEach((opcion) => {
    opcion.addEventListener('click', (event) => {

        let labelContacto = cleanLabel(event.currentTarget.dataset.redsocial);
        digitalData.push({
            "element": {
                "container": "Footer",
                "type": "Icono",
                "name": `Redes Sociales-${labelContacto}`
            },
            "event": "trackElement"
        })
    })
})

//Accesos-Sellos
footerbcp.querySelectorAll('.bcp_grupo_imagenes_reservado a').forEach((btnSello) => {
    btnSello.addEventListener('click', (event) => {
        let elementClick = event.currentTarget;
        let name = elementClick.dataset.image;

        digitalData.push({
            "element": {
                "container": "Footer",
                "type": "Icono",
                "name": cleanLabel(name)
            },
            "event": "trackElement"
        })
    })
})

//Taggeo Descarga de apps
footerbcp.querySelectorAll('.bcp_acceso_descarga_banca_movil .bcp_grupos_apps a').forEach((btnApp) => {
    btnApp.addEventListener('click', (event) => {

        let elementClick = cleanLabel(event.currentTarget.dataset.enlace);

        digitalData.push({
            "action": {
                "group": "Home",
                "category": "Banner Descarga",
                "name": "Click",
                "label": elementClick
            },
            "event": "trackAction"
        })
    })
})

//Taggeo ADOBE 
window.addEventListener("load", (event) => {
    try {
        const cleamHTMLSpace = (e) => { return e.replace(/&nbsp;/g, " ") };
        footerbcp.querySelectorAll('.bcp_opciones.mobile a')?.forEach((e, i) => {
            const parametros = `rfid=footer:${prepareString(cleamHTMLSpace(e.innerHTML))}:link:${i + 1}`;
            agregarParemetrosGet(e, parametros)
        })

        const verAgencias = footerbcp.querySelector('.bcp_column_ubicanos .bcp_opciones a');
        const p1 = `rfid=footer:ubicanos-agencias:link:1`;
        agregarParemetrosGet(verAgencias, p1);

    } catch (error) { console.error(error) }
})

//Adobe, funcion para saber que es final de la pagina y empezar a injectar codigo
if (_satellite && _satellite.pageBottom) {
  _satellite.pageBottom();
}
