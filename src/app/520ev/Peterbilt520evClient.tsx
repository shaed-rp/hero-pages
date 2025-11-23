'use client';

import React, { useCallback, useMemo, useState } from 'react';
import Navbar from '@components/Navbar/Nav';
import Hero from './Hero/Hero';
import Overview from './Overview/Overview';
import Capability from './Capability/Capability';
import Charging from './Charging/Charging';
import Gallery from './Gallery/Gallery';
import PoweredByShaedFooter from '@components/Footer/poweredByShaed';
import styles from './page.module.scss';
import Business from './Business/Business';
import Modal from '@components/Modal/Modal';
import ContactForm from '@components/Form/ContactForm/ContactForm';
import Technology from './Technology/Technology';
import Design from './Design/Design';
import Specs from './Specs/Specs';
import Build from './Build/Build';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useRouter } from 'next/navigation';
import SectionRenderer from '@components/SectionRenderer/SectionRenderer';

export default function Peterbilt520evClient({ data }: { data: any }) {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const openModal = useCallback(() => {
        setIsModalOpen(true);
        setIsSubmitted(false);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        setIsSubmitted(false);
    }, []);

    const handleSubmit = useCallback(() => {
        setIsSubmitted(true);
        closeModal();
        router.push('/520ev/thankyou');
    }, [closeModal, router]);

    const orderedSections = useMemo(() => {
        const titles: { [key: string]: string } = {};

        Object.entries(data.sectionVisibility).forEach(
            ([sectionId, isVisible]) => {
                if (!isVisible) return;

                switch (sectionId) {
                    case 'overview':
                        if (
                            data.overview.specs.some(
                                (spec: any) => spec.description || spec.title || spec.imageUrl
                            )
                        ) {
                            titles.overview = data.overview.navLinkText;
                        }
                        break;

                    case 'technologies':
                        if (
                            data.technologies.technology.some(
                                (tech: any) => tech.title || tech.description || tech.imageUrl
                            )
                        ) {
                            titles.technologies = data.technologies.navLinkText;
                        }
                        break;

                    case 'business':
                        if (
                            data.business.businessPoints.some(
                                (point: any) => point.title || point.description
                            )
                        ) {
                            titles.business = data.business.navLinkText;
                        }
                        break;

                    case 'capabilities':
                        if (
                            data.capabilities.specs.some(
                                (spec: any) =>
                                    spec.label || spec.value || spec.imageUrl || spec.otherValue
                            )
                        ) {
                            titles.capabilities = data.capabilities.navLinkText;
                        }
                        break;

                    case 'charging':
                        if (
                            data.charging.chargingOptions.some(
                                (option: any) =>
                                    option.title || option.description || option.imageUrl
                            )
                        ) {
                            titles.charging = data.charging.navLinkText;
                        }
                        break;

                    case 'design':
                        if (data.design.images.some((image: any) => image.imageUrl)) {
                            titles.design = data.design.navLinkText;
                        }
                        break;

                    case 'gallery':
                        if (data.gallery.images.some((image: any) => image.url)) {
                            titles.gallery = data.gallery.navLinkText;
                        }
                        break;

                    case 'specs':
                        if (
                            data.specs.specDetails.some(
                                (section: any) => section.title || section.data.some((item: any) => item)
                            )
                        ) {
                            titles.specs = data.specs.navLinkText;
                        }
                        break;
                }
            }
        );

        titles['request-info'] = 'Get A Free Quote';
        return titles;
    }, [data]);

    if (!data) return null;

    return (
        <ThemeProvider brandColor={data.siteConfig.brandColor}>
            <div className={styles.home}>
                <Navbar
                    vehicleId='peterbilt520ev'
                    openModal={openModal}
                    sectionTitles={sectionTitles}
                />

                <div id='home' className={`${styles.section} ${styles.heroSection}`}>
                    <div className={styles.sectionContent}>
                        <Hero
                            heroPoints={data.hero}
                            siteConfig={data.siteConfig}
                            openModal={openModal}
                        />
                    </div>
                </div>

                {orderedSections.map((sectionId) => {
                    const section = renderSection(sectionId);
                    return section ? (
                        <React.Fragment key={sectionId}>{section}</React.Fragment>
                    ) : null;
                })}

                <PoweredByShaedFooter />

                <Modal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    isSubmitted={isSubmitted}
                    pageName={'Peterbilt 520EV'}
                    vehiclePath='520ev'
                >
                    <ContactForm
                        onSubmit={handleSubmit}
                        siteTitle={data.siteConfig.title}
                    />
                </Modal>
            </div>
        </ThemeProvider>
    );
}
