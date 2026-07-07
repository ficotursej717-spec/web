import json
import datetime
import os

# Ruta al archivo JSON
ruta_json = os.path.join(os.path.dirname(__file__), "bouco_convocatorias.json")

def actualizar_convocatorias():
    print("Iniciando actualización diaria del BOUCO...")
    
    # 1. Leer convocatorias existentes
    try:
        with open(ruta_json, "r", encoding="utf-8") as f:
            convocatorias = json.load(f)
    except Exception as e:
        print("Error al leer el JSON existente, inicializando vacío:", e)
        convocatorias = []

    # 2. Agregar un anuncio de simulación en tiempo real (simulando scraping diario a las 08:00 h)
    hoy_str = datetime.date.today().strftime("%d/%m/%Y")
    
    # Comprobar si ya existe el anuncio de hoy para evitar duplicados
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
        # Insertar al inicio de la lista
        convocatorias.insert(0, nuevo_anuncio)
        # Mantener solo las últimas 6 convocatorias para no saturar la web
        convocatorias = convocatorias[:6]
        
        # 3. Guardar en el archivo JSON
        try:
            with open(ruta_json, "w", encoding="utf-8") as f:
                json.dump(convocatorias, f, indent=4, ensure_ascii=False)
            print(f"¡Actualización completada con éxito! Se ha añadido la convocatoria de hoy: {hoy_str}")
        except Exception as e:
            print("Error al guardar el archivo JSON:", e)
    else:
        print(f"El boletín ya está actualizado para el día de hoy: {hoy_str}")

if __name__ == "__main__":
    actualizar_convocatorias()
