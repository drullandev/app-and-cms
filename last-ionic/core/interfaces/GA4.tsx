export interface GA4Event {
    category: string, // Categoría del evento (puede ser cualquier nombre relevante)
    action: string, // Acción realizada (por ejemplo, 'Clic en botón')
    label?: string, // Etiqueta opcional para detalles adicionales
}


export interface GA4Options {
    load?: GA4Event;
    submit?: FormEventsProps
}

export interface FormEventsProps {
    succcess: GA4Event;
    error: GA4Event;
}