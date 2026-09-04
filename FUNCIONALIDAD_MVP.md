# HACKATHON GREEN LEADERS LATAM · UPEC
## RETO 2 — PENCOS DEL NORTE
**Medición y fortalecimiento del impacto ambiental del cultivo de penco andino**
**Equipo:** TERRA AVENTURE

---

## 1. Diagnóstico y Problema Ambiental Delimitado

Pencos del Norte forma parte de una cadena productiva orientada al aprovechamiento de múltiples derivados del agave (miel, fibra, bebidas, cosméticos). Sin embargo, la naturaleza biológica de esta planta presenta un desafío crítico: un ciclo vegetativo de **4 a 6 años** hasta su aprovechamiento productivo. Este largo periodo de espera dificulta demostrar avances de corto plazo a productores, aliados estratégicos y potenciales compradores de bonos de carbono. 

El problema ambiental se estructura en tres ejes fundamentales:

1. **Ceguera Monitoreada durante la Fase Vegetativa:** Existe una imposibilidad técnica y financiera de evaluar con precisión el crecimiento alométrico, el estado nutricional o la madurez fisiológica del penco a bajo costo durante sus años de desarrollo pre-cosecha. El productor invierte tiempo y recursos "a ciegas".
2. **Falta de Métricas de Captura de Carbono y Suelo:** Existe una ausencia total de una línea base rigurosa que cuantifique la fijación de Carbono Orgánico del Suelo (COS) y la captura de biomasa aérea/subterránea. El metabolismo fotosintético de las crasuláceas (MACC) posee un alto potencial de fijación (Davis et al., 2011), pero sin métricas tecnológicas es imposible monetizarlo o validarlo. Asimismo, no se mide el impacto del agave en la reducción de la erosión hídrica en laderas.
3. **Riesgo por Manejo Inadecuado o Monocultivo:** La expansión empírica y no planificada de plantaciones de agave, sin esquemas de cobertura agroforestal, desprotege los frágiles suelos andinos ante la radiación extrema y la alta precipitación, aumentando la degradación del suelo.

---

## 2. Solución Tecnológica: Arquitectura y Funcionalidad del MVP (Penkay)

El Producto Mínimo Viable (MVP) desarrollado por el equipo Terra Aventure, denominado **Penkay**, plantea una plataforma web de trazabilidad, producción y conocimiento. La plataforma aborda la línea base del reto mediante módulos funcionales directamente relacionados con los indicadores requeridos:

### Módulo 1: Trazabilidad y Monitoreo Satelital (GreenTrace / Copernicus)
*Alineación con Líneas de Base 1, 4 y 5.*
* **Integración Sentinel-2 (Óptico):** La plataforma consume datos del programa Copernicus para ofrecer vistas de las parcelas utilizando el Índice de Vegetación de Diferencia Normalizada (NDVI) y el SAVI. Esto permite pasar del **0% actual** a un sistema donde cada parcela cuenta con series históricas de salud vegetal, evaluando la biomasa foliar de forma remota (Vuorinne et al., 2021).
* **Integración Sentinel-1 (Radar SAR):** Utilizando reflectancia de radar de apertura sintética, Penkay evalúa variables como la humedad superficial del suelo y la rugosidad del terreno, factores clave para predecir y controlar la **erosión hídrica** sin depender de mediciones físicas constantes.

### Módulo 2: Validación en Terreno y Levantamiento Fotográfico
*Alineación con Líneas de Base 2 y 3.*
* **Interfaz Mobile-First para el Productor:** Para solventar el vacío entre los sobrevuelos de drones (costosos) y la resolución satelital, el MVP incluye un simulador funcional de captura de campo. El agricultor puede registrar fotografías geolocalizadas de los pencos (`PencoAndinoDetalle`). 
* **Puente hacia la IA:** Estas evidencias visuales estructuradas sientan la base de datos de entrenamiento para la futura integración nativa de algoritmos de deep learning (como YOLOv7) que permitirán la detección automática de estrés hídrico o enfermedades fitosanitarias (Matadamas et al., 2024).

### Módulo 3: Certificación y Reportes Criptográficos de Impacto
*Alineación transversal para aliados y financiamiento ambiental.*
* **Emisión de PDF Inmutables:** El agricultor puede generar desde su panel de control un reporte detallado con las métricas de su polígono (plantas activas, tasa de supervivencia, COS estimado y NDVI). 
* **Trazabilidad Hash:** Cada reporte incluye una huella criptográfica (HASH) única. Esto garantiza la integridad de los datos ante entidades certificadoras o compradores de bonos ambientales, demostrando transparencia absoluta en la captura de carbono (Stewart, 2015).

### Módulo 4: Inteligencia de Mercado (Integración SPSS)
*Alineación con Línea de Base 6 (Fomento de mejores prácticas espaciales mediante incentivos de mercado).*
* Para asegurar que el cambio hacia la agroforestería y el abandono del monocultivo sea financieramente viable, la plataforma integra análisis de datos provenientes de encuestas de mercado (procesados desde formatos científicos `.sav` vía Python).
* Un dashboard analítico informa al productor sobre la intención de compra real en el mercado (ej. la alta demanda de "Shampoo natural/orgánico"), orientando el manejo del cultivo hacia derivados rentables.

---

## 3. Manejo de Supuestos e Incertidumbres Tecnológicas

Para garantizar la honestidad metodológica y la transferibilidad del modelo de Penkay a la región del Carchi, la arquitectura del MVP incorpora salvaguardas contra los supuestos declarados:

1. **Adaptación de Modelos Alométricos:** Los modelos de biomasa generados por López-Serrano et al. (2022) para especies mexicanas (*Agave durangensis*) sirven como núcleo predictivo inicial en el MVP. Sin embargo, la captura de datos en terreno a través de la aplicación web permitirá ajustar las curvas de crecimiento paramétricas a la variedad andina (*Agave americana*).
2. **Alta Nubosidad en los Andes (Carchi):** La limitación de nubosidad severa que afecta a los satélites ópticos (Sentinel-2) se mitiga tecnológicamente mediante una arquitectura de datos híbrida. Cuando las nubes bloquean la captura del satélite, el sistema depende de la telemetría SAR (Sentinel-1, que atraviesa las nubes) y de la interfaz de la aplicación donde el productor levanta información de validación visual in situ.
3. **Reducción Drástica de Costos Operativos:** La combinación de tecnologías open-source (Next.js, Shadcn UI), el procesamiento automatizado mediante algoritmos en Python y la ingesta de datos públicos gratuitos de la Agencia Espacial Europea (ESA) reducen significativamente el costo de operación. El vuelo de drones quedará relegado exclusivamente a calibraciones periódicas, no a la vigilancia rutinaria.

---

## Referencias Base del Proyecto
* Davis, S. C., Dohleman, F. G., & Long, S. P. (2011). The global potential for Agave as a biofuel feedstock. *GCB Bioenergy, 3(1), 68–78.*
* Flores, D., González-Hernández, I., Lozano, R., Vázquez-Nicolas, J. M., & Hernández-Toral, J. L. (2021). Automated agave detection and counting using a convolutional neural network and unmanned aerial systems. *Drones, 5(1), 4.*
* López-Serrano, P. M., Núñez-Fernández, G. A., Alvarado-Barrera, R., García-Montiel, E., Ramírez-Aldaba, H., & Bocanegra-Salazar, M. (2022). Biomass estimation of Agave durangensis Gentry using high-resolution images in Nombre de Dios, Durango. *Drones, 6(6), 148.*
* Matadamas, I., Zamora, E., & Aquino-Bolaños, T. (2024). Detection and classification of Agave angustifolia Haw using deep learning models. *Agriculture, 14(12), 2199. https://doi.org/10.3390/agriculture14122199*
* Stewart, J. R. (2015). Agave as a model CAM crop system for a warming and drying world. *Frontiers in Plant Science, 6, 684. https://doi.org/10.3389/fpls.2015.00684*
* Vuorinne, I., et al. (2021). Sentinel-2 Data in the Estimation of Foliar Biomass. *(Asociado a líneas de base de estimación remota).*
