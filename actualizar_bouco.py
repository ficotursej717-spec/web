import json
import datetime
import os
import re
import urllib.request
import html

# Rutas de los archivos JSON
dir_actual = os.path.dirname(__file__)
ruta_bouco = os.path.join(dir_actual, "bouco_convocatorias.json")
ruta_boletines = os.path.join(dir_actual, "uco_boletines.json")

MESES_ES = {
    'enero': 1, 'febrero': 2, 'marzo': 3, 'abril': 4, 'mayo': 5, 'junio': 6,
    'julio': 7, 'agosto': 8, 'septiembre': 9, 'octubre': 10, 'noviembre': 11, 'diciembre': 12
}

def parsear_fecha_bouco(fecha_str):
    """Convierte '01/10/2026' a objeto date para ordenación precisa."""
    try:
        partes = [int(p) for p in fecha_str.strip().split('/')]
        if len(partes) == 3:
            return datetime.date(partes[2], partes[1], partes[0])
    except Exception:
        pass
    return datetime.date(2000, 1, 1)

def parsear_fecha_boletin(fecha_str):
    """Convierte '02 Octubre 2026' a objeto date para ordenación precisa."""
    try:
        tokens = fecha_str.strip().lower().split()
        if len(tokens) >= 3:
            dia = int(tokens[0])
            mes = MESES_ES.get(tokens[1], 1)
            ano = int(tokens[2])
            return datetime.date(ano, mes, dia)
    except Exception:
        pass
    return datetime.date(2000, 1, 1)

def clasificar_convocatoria(titulo, descripcion=""):
    """Clasifica con precisión la resolución, proyecto o anuncio según palabras clave."""
    texto = (titulo + " " + (descripcion or "")).lower()
    
    # Proyectos y Licitaciones
    if re.search(r'\b(proyecto|proyectos|licitaci[oó]n|licitaciones|subvenci[oó]n|subvenciones)\b', texto):
        return "Proyectos"
    # Normativa y Reglamentos
    if re.search(r'\b(reglamento|reglamentos|instrucci[oó]n|instrucciones|normativa|acuerdo|acuerdos|estatuto)\b', texto):
        return "Normativa"
    # Empleo y Bolsas de Trabajo
    if re.search(r'\b(contrato|contratos|plaza|plazas|empleo|bolsa de trabajo|bolsa|investigador|investigadora|personal|concurso|ptgas|profesor|profesora|profesorado|ayudante|ayudantes)\b', texto):
        return "Empleo"
    # Becas, Ayudas y Premios
    if re.search(r'\b(beca|becas|ayuda|ayudas|premio|premios|award|awards|campus rural)\b', texto):
        return "Becas"
    # Resoluciones
    if re.search(r'\b(resoluci[oó]n|resoluciones)\b', texto):
        return "Resolución"
    # Convocatorias generales
    if re.search(r'\b(convocatoria|convocatorias|se convoca)\b', texto):
        return "Convocatoria"
    # Convenios
    if re.search(r'\b(convenio|convenios)\b', texto):
        return "Convenio"
        
    return "Anuncio"

def actualizar_convocatorias():
    print("Iniciando scraping en vivo de Convocatorias y Resoluciones BOUCO...")
    url = 'https://sede.uco.es/bouco/'
    req = urllib.request.Request(
        url, 
        headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
    )
    
    # 1. Cargar historial existente para acumular resoluciones/anuncios
    items_acumulados = {}
    if os.path.exists(ruta_bouco):
        try:
            with open(ruta_bouco, "r", encoding="utf-8") as f:
                anteriores = json.load(f)
                for item in anteriores:
                    if isinstance(item, dict) and "id" in item:
                        # Re-clasificar según nuevo algoritmo
                        item["tipo"] = clasificar_convocatoria(item.get("titulo", ""), item.get("descripcion", ""))
                        items_acumulados[item["id"]] = item
        except Exception as e:
            print("Aviso al leer datos previos de BOUCO:", e)

    try:
        response = urllib.request.urlopen(req, timeout=15)
        content_bytes = response.read()
        content = content_bytes.decode('utf-8', errors='ignore')
        
        num_matches = list(re.finditer(r'class="accesoTitulo"[^>]*>N\.&ordm;\s+([^<]+)</a>', content))
        if not num_matches:
            raise Exception("No se encontraron elementos en la extracción HTML de BOUCO.")
            
        for idx, match in enumerate(num_matches):
            start_pos = match.start()
            end_pos = num_matches[idx+1].start() if idx + 1 < len(num_matches) else len(content)
            
            snippet = content[start_pos:end_pos]
            snippet_clean = re.sub(r'\s+', ' ', snippet)
            
            num = match.group(1).strip()
            
            title_match = re.search(r'<b><a[^>]*>(.*?)(?:</a>\s*</b>)', snippet_clean)
            title = html.unescape(title_match.group(1).strip()) if title_match else "Sin título"
            title = re.sub(r'\s+', ' ', title).strip()
            
            date_match = re.search(r'Publicado el\s*</label><span[^>]*>(.*?)</span>', snippet_clean)
            date = date_match.group(1).strip() if date_match else "N/D"
            
            # Extraer descripción oficial
            desc_match = re.search(r'<td class="width80">\s*<table>\s*<tbody>\s*<tr>\s*<td><label>(.*?)</label>', snippet_clean, re.IGNORECASE)
            desc = html.unescape(desc_match.group(1).strip()) if desc_match else ""
            desc = re.sub(r'\s+', ' ', desc).strip()
            
            tipo = clasificar_convocatoria(title, desc)
            item_id = f"conv-{num.replace('/', '-')}"
            
            items_acumulados[item_id] = {
                "id": item_id,
                "numero": num,
                "titulo": title,
                "descripcion": desc,
                "fecha": date,
                "tipo": tipo,
                "estado": "Abierto",
                "link": "https://sede.uco.es/bouco/"
            }
            
        # Ordenar de más reciente a más antiguo
        lista_ordenada = sorted(
            items_acumulados.values(),
            key=lambda x: (parsear_fecha_bouco(x.get("fecha", "")), x.get("id", "")),
            reverse=True
        )
        
        # Guardar hasta 50 convocatorias y resoluciones recientes
        resultado = lista_ordenada[:50]
            
        with open(ruta_bouco, "w", encoding="utf-8") as f:
            json.dump(resultado, f, indent=4, ensure_ascii=False)
            
        print(f"¡Sincronización de BOUCO completada! Se guardaron {len(resultado)} convocatorias y resoluciones reales en {ruta_bouco}")
        
    except Exception as e:
        print("Error al sincronizar convocatorias con BOUCO, manteniendo datos previos:", e)


def actualizar_boletines():
    print("Iniciando scraping en vivo de Boletines de Novedades de la UCO...")
    url = 'https://www.uco.es/servicios/actualidad/boletines'
    req = urllib.request.Request(
        url, 
        headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
    )
    
    # 1. Cargar historial existente
    boletines_dict = {}
    if os.path.exists(ruta_boletines):
        try:
            with open(ruta_boletines, "r", encoding="utf-8") as f:
                previos = json.load(f)
                for b in previos:
                    if isinstance(b, dict) and "titulo" in b:
                        boletines_dict[b["titulo"]] = b
        except Exception as e:
            print("Aviso al leer datos previos de Boletines:", e)

    try:
        response = urllib.request.urlopen(req, timeout=15)
        content_bytes = response.read()
        content = content_bytes.decode('utf-8', errors='ignore')
        
        pattern = r"acymailing\.openpopup\('([^']+)'[^\)]*\)[^>]*>([^<]+)</a></span><span class=\"sentondate\">Enviado en ([^<]+)</span>"
        matches = re.findall(pattern, content)
        
        if not matches:
            raise Exception("No se encontraron elementos en la extracción HTML de UCO.es.")
            
        for link, title, date in matches:
            title = html.unescape(title.strip())
            title = title.replace('\xad', '').replace('\u00ad', '').replace('\u200b', '')
            date = html.unescape(date.strip())
            
            if link.startswith('/'):
                link = 'https://www.uco.es' + link
            
            boletines_dict[title] = {
                "titulo": title,
                "fecha": date,
                "link": link
            }
            
        # Ordenar boletines de más reciente a más antiguo
        lista_ordenada = sorted(
            boletines_dict.values(),
            key=lambda x: parsear_fecha_boletin(x.get("fecha", "")),
            reverse=True
        )
        
        boletines_finales = lista_ordenada[:25]
            
        with open(ruta_boletines, "w", encoding="utf-8") as f:
            json.dump(boletines_finales, f, indent=4, ensure_ascii=False)
            
        print(f"¡Sincronización de Boletines completada! Se guardaron {len(boletines_finales)} boletines en {ruta_boletines}")
        
    except Exception as e:
        print("Error al sincronizar boletines con UCO.es, manteniendo datos de respaldo:", e)


def principal():
    print("==================================================")
    print("EJECUTANDO ACTUALIZACIÓN COMPLETA DE CONTENIDOS EN TIEMPO REAL")
    print("==================================================")
    actualizar_convocatorias()
    print("--------------------------------------------------")
    actualizar_boletines()
    print("==================================================")

if __name__ == "__main__":
    principal()
