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
    print("Iniciando scraping en vivo de Convocatorias y Boletines BOUCO...")
    url = 'https://sede.uco.es/bouco/'
    req = urllib.request.Request(
        url, 
        headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    )
    try:
        response = urllib.request.urlopen(req)
        content_bytes = response.read()
        content = content_bytes.decode('utf-8', errors='ignore')
        
        num_matches = list(re.finditer(r'class="accesoTitulo"[^>]*>N\.&ordm;\s+([^<]+)</a>', content))
        
        convocatorias = []
        for idx, match in enumerate(num_matches[:6]):
            start_pos = match.start()
            end_pos = num_matches[idx+1].start() if idx + 1 < len(num_matches) else len(content)
            
            snippet = content[start_pos:end_pos]
            snippet_clean = re.sub(r'\s+', ' ', snippet)
            
            num = match.group(1).strip()
            
            title_match = re.search(r'<b><a[^>]*>(.*?)(?:</a>\s*</b>|</a>\s*</b>)', snippet_clean)
            title = html.unescape(title_match.group(1).strip()) if title_match else "Sin título"
            
            date_match = re.search(r'Publicado el\s*</label><span[^>]*>(.*?)</span>', snippet_clean)
            date = date_match.group(1).strip() if date_match else "N/D"
            
            # Determinar tipo según palabras clave del título
            tipo = "Anuncio"
            title_lower = title.lower()
            if "convocatoria" in title_lower:
                tipo = "Convocatoria"
            elif "resolución" in title_lower:
                tipo = "Resolución"
            elif "instrucción" in title_lower:
                tipo = "Instrucción"
            elif "becas" in title_lower:
                tipo = "Becas"
            elif "convenio" in title_lower:
                tipo = "Convenio"
            elif "contrato" in title_lower:
                tipo = "Contrato"
                
            convocatorias.append({
                "id": f"conv-{num.replace('/', '-')}",
                "titulo": title,
                "fecha": date,
                "tipo": tipo,
                "estado": "Abierto",
                "link": "https://sede.uco.es/bouco/"
            })
            
        if not convocatorias:
            raise Exception("No se encontraron elementos en la extracción HTML de BOUCO.")
            
        with open(ruta_bouco, "w", encoding="utf-8") as f:
            json.dump(convocatorias, f, indent=4, ensure_ascii=False)
            
        print(f"¡Sincronización de BOUCO completada! Se guardaron {len(convocatorias)} convocatorias reales en {ruta_bouco}")
        
    except Exception as e:
        print("Error al sincronizar convocatorias con BOUCO, manteniendo datos de respaldo:", e)
        # Si el archivo no existe, creamos un fallback
        if not os.path.exists(ruta_bouco):
            fallback_data = [
                {
                    "id": "conv-2026-00866",
                    "titulo": "Becas Solidarias UCO-Santander, curso 2025/26. Relación definitiva de solicitudes admitidas y excluidas de la convocatoria",
                    "fecha": "10/07/2026",
                    "tipo": "Becas",
                    "estado": "Abierto",
                    "link": "https://sede.uco.es/bouco/"
                },
                {
                    "id": "conv-2026-00867",
                    "titulo": "Exposición pública de la memoria del plan estudios del Grado en Logística y Transporte",
                    "fecha": "10/07/2026",
                    "tipo": "Anuncio",
                    "estado": "Abierto",
                    "link": "https://sede.uco.es/bouco/"
                }
            ]
            with open(ruta_bouco, "w", encoding="utf-8") as f:
                json.dump(fallback_data, f, indent=4, ensure_ascii=False)


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
