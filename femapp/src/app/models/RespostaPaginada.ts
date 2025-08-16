export type RespostaPaginada<T> = {
    content: T[];
    totalElements: number;
    size: number;
    number: number;
}