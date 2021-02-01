import React from 'react';
import './pdfPage.scss';
interface IEmptyPageProps {
    height?: number;
    width?: number;
    page: number;
    onPageInViewport?(page: number): void;
}
declare const _default: React.NamedExoticComponent<IEmptyPageProps>;
export default _default;
