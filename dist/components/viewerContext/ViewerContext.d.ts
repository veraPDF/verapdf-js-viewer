import React, { FC, ReactNode } from 'react';
export declare const ViewerContext: React.Context<{
    page: number;
    setPage(page: number): void;
    maxPage: number;
    setMaxPage(page: number): void;
    scrollIntoPage: number;
    setScrollIntoPage(page: number): void;
}>;
declare const ViewerProvider: FC<{
    children: ReactNode;
}>;
export default ViewerProvider;
