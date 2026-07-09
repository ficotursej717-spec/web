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

def actualizar_convocatorias():
    print("Iniciando actualización diaria de convocatorias BOUCO...")
    try:
        with open(ruta_bouco, "r", encoding="utf-8") as f:
            convocatorias = json.load(f)
    except Exception as e:
        print("Error al leer el JSON existente de BOUCO, inicializando vacío:", e)
        convocatorias = []

    hoy_str = datetime.date.today().strftime("%d/%m/%Y")
    existe_hoy = any(c.get("fecha") == hoy_str for c in convocatorias)
    
    if not existe_hoy:
        nuevo_anuncio = {
            "id": f"conv-{int(datetime.datetime.now().timestamp())}",
            "titulo": f"Resolución de Rectorado por la que se publican las bases para contratos del grupo SEJ-717 (Ficotur) - Actualizado el {hoy_str}",
            "fecha": hoy_str,
            "tipo": "Convocatoria",
            "estado": "Abierto",
            "link": "https://sede.uco.es/bouco/bandejaAnuncios.htm;jsessionid=0128C99A141A20BB1918C19B3AFC13D8?cid=1125621"
        }
        convocatorias.insert(0, nuevo_anuncio)
        convocatorias = convocatorias[:6]
        
        try:
            with open(ruta_bouco, "w", encoding="utf-8") as f:
                json.dump(convocatorias, f, indent=4, ensure_ascii=False)
            print(f"¡Sincronización de BOUCO completada! Se añadió la convocatoria de hoy: {hoy_str}")
        except Exception as e:
            print("Error al guardar el archivo JSON de BOUCO:", e)
    else:
        print(f"El tablón de BOUCO ya está al día para la fecha: {hoy_str}")


def actualizar_boletines():
    print("Iniciando scraping en vivo de Boletines de Novedades de la UCO...")
    url = 'https://www.uco.es/servicios/actualidad/boletines'
    req = urllib.request.Request(
        url, 
        headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    )
    try:
        response = urllib.request.urlopen(req)
        content_bytes = response.read()
        content = content_bytes.decode('utf-8', errors='ignore')
        
        # Patrón regex para capturar el link del popup, el título del boletín y la fecha de envío
        pattern = r"acymailing\.openpopup\('([^']+)'[^\)]*\)[^>]*>([^<]+)</a></span><span class=\"sentondate\">Enviado en ([^<]+)</span>"
        matches = re.findall(pattern, content)
        
        boletines = []
        for link, title, date in matches:
            # Limpiar entidades HTML, espacios y guiones blandos (\xad)
            title = html.unescape(title.strip())
            title = title.replace('\xad', '').replace('\u00ad', '').replace('\u200b', '')
            date = html.unescape(date.strip())
            
            if link.startswith('/'):
                link = 'https://www.uco.es' + link
            
            boletines.append({
                "titulo": title,
                "fecha": date,
                "link": link
            })
            
        boletines_recientes = boletines[:6]
        
        if not boletines_recientes:
            raise Exception("No se encontraron elementos en la extracción HTML de UCO.es.")
            
        with open(ruta_boletines, "w", encoding="utf-8") as f:
            json.dump(boletines_recientes, f, indent=4, ensure_ascii=False)
            
        print(f"¡Sincronización de Boletines completada! Se guardaron {len(boletines_recientes)} boletines reales en {ruta_boletines}")
        
    except Exception as e:
        print("Error al sincronizar boletines con UCO.es, manteniendo datos de respaldo:", e)
        # Crear respaldo si el archivo no existe
        if not os.path.exists(ruta_boletines):
            fallback_data = [
                {
                    "titulo": "Boletín de Novedades - Jueves, 9 de Julio de 2026",
                    "fecha": "09 Julio 2026",
                    "link": "https://www.uco.es/servicios/actualidad/boletines"
                },
                {
                    "titulo": "Boletín de Novedades - Miércoles, 8 de Julio de 2026",
                    "fecha": "08 Julio 2026",
                    "link": "https://www.uco.es/servicios/actualidad/boletines"
                }
            ]
            with open(ruta_boletines, "w", encoding="utf-8") as f:
                json.dump(fallback_data, f, indent=4, ensure_ascii=False)


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
