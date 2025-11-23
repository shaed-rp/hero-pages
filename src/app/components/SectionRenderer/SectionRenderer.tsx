'use client';

import React from 'react';

interface SectionRendererProps {
    id: string;
    isVisible: boolean;
    hasData: boolean;
    wrapperClass: string;
    contentClass: string;
    children: React.ReactNode;
}

export default function SectionRenderer({
    id,
    isVisible,
    hasData,
    wrapperClass,
    contentClass,
    children,
}: SectionRendererProps) {
    if (!isVisible || !hasData) return null;

    return (
        <div id={id} className={wrapperClass}>
            <div className={contentClass}>{children}</div>
        </div>
    );
}
