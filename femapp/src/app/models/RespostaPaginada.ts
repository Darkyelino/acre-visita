export type RespostaPaginada<T> = {
    content: T[];
    totalElements: number;
    size: number;
    number: number;
    totalPages: number;

    numberOfElements: number; // O número de elementos na página ATUAL
    first: boolean;           // 'true' se for a primeira página
    last: boolean;            // 'true' se for a última página
}