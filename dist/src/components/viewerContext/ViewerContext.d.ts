import React, { FC, ReactNode, ReactElement } from 'react';
import { IRenderBboxProps } from "../bbox/Bbox";
export declare const ViewerContext: React.Context<{
    page: number;
    setPage(page: number): void;
    maxPage: number;
    setMaxPage(page: number): void;
    scrollInto: {
        page: number;
    };
    setScrollIntoPage(page: number): void;
    renderBbox?: ((props: IRenderBboxProps) => ReactElement) | undefined;
}>;
declare const ViewerProvider: FC<{
    children: ReactNode;
    renderBbox?: (props: IRenderBboxProps) => ReactElement;
}>;
export default ViewerProvider;
