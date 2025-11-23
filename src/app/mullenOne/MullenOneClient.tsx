'use client';

import Navbar from '@components/Navbar/Nav';
import Hero from './Hero/Hero';
import Overview from './Overview/Overview';
import Capability from './Capability/Capability';
import Charging from './Charging/Charging';
import Gallery from './Gallery/Gallery';
import PoweredByShaedFooter from '@components/Footer/poweredByShaed';
import styles from './page.module.scss';
import Business from './Business/Business';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Modal from '@components/Modal/Modal';
import ContactForm from '@components/Form/ContactForm/ContactForm';
import Technology from './Technology/Technology';
import Design from './Design/Design';
import Specs from './Specs/Specs';
import Build from './Build/Build';
import VideoContainer from './Video/Video';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useRouter } from 'next/navigation';
import SectionRenderer from '@components/SectionRenderer/SectionRenderer';

declare global {
    interface Window {
        _linkedin_data_partner_ids: string[];
        lintrk_q: Array<[string, { conversion_id: number }]>;
    }
}

export default function MullenOneClient({ data }: { data: any }) {
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
        router.push('/mullenone/thankyou');
    }, [closeModal, router]);

    const sectionTitles = useMemo(() => {
        const titles: { [key: string]: string } = {};

        if (
            data.sectionVisibility.overview &&
            data.overview.specs.some(
                (spec: any) => spec.description || spec.title || spec.imageUrl
            )
        ) {
            titles.overview = data.overview.navLinkText;
        }

        if (
            data.sectionVisibility.capabilities &&
            data.capabilities.specs.some(
                (spec: any) => spec.label || spec.value || spec.imageUrl || spec.otherValue
            )
        ) {
            titles.capabilities = data.capabilities.navLinkText;
        }

        if (
            data.sectionVisibility.charging &&
            data.charging.chargingOptions.some(
                (option: any) => option.title || option.description || option.imageUrl
            )
        ) {
            titles.charging = data.charging.navLinkText;
        }

        if (
            data.sectionVisibility.technologies &&
            data.technologies.technology.some(
                (tech: any) => tech.title || tech.description || tech.imageUrl
            )
        ) {
            titles.technologies = data.technologies.navLinkText;
        }

        if (
            data.sectionVisibility.design &&
            data.design.images.some((image: any) => image.imageUrl)
        ) {
            titles.design = data.design.navLinkText;
        }

        if (
            data.sectionVisibility.business &&
            data.business.businessPoints.some(
                (point: any) => point.title || point.description
            )
        ) {
            titles.business = data.business.navLinkText;
        }

        if (
            data.sectionVisibility.gallery &&
            data.gallery.images.some((image: any) => image.url)
        ) {
            titles.gallery = data.gallery.navLinkText;
        }

        if (
            data.sectionVisibility.specs &&
            data.specs.specDetails.some(
                (section: any) => section.title || section.data.some((item: any) => item)
            )
        ) {
            titles.specs = data.specs.navLinkText;
        }

        titles['request-info'] = 'Get A Free Quote';
        return titles;
    }, [data]);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.lintrk) {
            window.lintrk('track', { conversion_id: 18238308 });
        }
    }, []);

    if (!data) return null;

    return (
        <ThemeProvider brandColor={data.siteConfig.brandColor}>
            <div className={styles.home}>
                <Navbar
                    vehicleId='mullenOne'
                    openModal={openModal}
                    sectionTitles={sectionTitles}
                />
                <div id='home' className={`${styles.section} ${styles.heroSection}`}>
                    <div className={styles.sectionContent}>
                        <Hero heroPoints={data.hero} openModal={openModal} />
                    </div>
                </div>
                <SectionRenderer
                    id='overview'
                    isVisible={data.sectionVisibility.overview}
                    hasData={data.overview.specs.some(
                        (spec: any) => spec.description || spec.title || spec.imageUrl
                    )}
                    wrapperClass={`${styles.section} ${styles.overviewSection}`}
                    contentClass={styles.sectionContent}
                >
                    <Overview overview={data.overview} />
                </SectionRenderer>

                <div className={`${styles.sectionContent} ${styles.videoSection}`}>
                    <div className={styles.sectionContent}>
                        <VideoContainer src={data.video} />
                    </div>
                </div>

                <SectionRenderer
                    id='capabilities'
                    isVisible={data.sectionVisibility.capabilities}
                    hasData={data.capabilities.specs.some(
                        (spec: any) =>
                            spec.label || spec.value || spec.imageUrl || spec.otherValue
                    )}
                    wrapperClass={`${styles.section} ${styles.capabilitySection}`}
                    contentClass={styles.sectionContent}
                >
                    <Capability capabilities={data.capabilities} />
                </SectionRenderer>

                <SectionRenderer
                    id='charging'
                    isVisible={data.sectionVisibility.charging}
                    hasData={data.charging.chargingOptions.some(
                        (option: any) => option.title || option.description || option.imageUrl
                    )}
                    wrapperClass={`${styles.section} ${styles.chargingSection}`}
                    contentClass={styles.sectionContent}
                >
                    <Charging chargingPoints={data.charging} />
                </SectionRenderer>

                <SectionRenderer
                    id='technologies'
                    isVisible={data.sectionVisibility.technologies}
                    hasData={data.technologies.technology.some(
                        (tech: any) => tech.title || tech.description || tech.imageUrl
                    )}
                    wrapperClass={`${styles.section} ${styles.technologySection}`}
                    contentClass={styles.sectionContent}
                >
                    <Technology technologyPoints={data.technologies} />
                </SectionRenderer>

                <SectionRenderer
                    id='design'
                    isVisible={data.sectionVisibility.design}
                    hasData={data.design.images.some((image: any) => image.imageUrl)}
                    wrapperClass={`${styles.section} ${styles.designSection}`}
                    contentClass={styles.sectionContent}
                >
                    <Design designPoints={data.design} />
                </SectionRenderer>

                <SectionRenderer
                    id='business'
                    isVisible={data.sectionVisibility.business}
                    hasData={data.business.businessPoints.some(
                        (point: any) => point.title || point.description
                    )}
                    wrapperClass={`${styles.section} ${styles.businessSection}`}
                    contentClass={styles.sectionContent}
                >
                    <Business businessPoints={data.business} />
                </SectionRenderer>

                <SectionRenderer
                    id='gallery'
                    isVisible={data.sectionVisibility.gallery}
                    hasData={data.gallery.images.some((image: any) => image.url)}
                    wrapperClass={`${styles.section} ${styles.gallerySection}`}
                    contentClass={styles.sectionContent}
                >
                    <Gallery images={data.gallery.images} />
                </SectionRenderer>

                <SectionRenderer
                    id='specs'
                    isVisible={data.sectionVisibility.specs}
                    hasData={data.specs.specDetails.some(
                        (section: any) => section.title || section.data.some((item: any) => item)
                    )}
                    wrapperClass={`${styles.section} ${styles.specsSection}`}
                    contentClass={styles.sectionContent}
                >
                    <Specs specPoints={data.specs.specDetails} />
                </SectionRenderer>

                <SectionRenderer
                    id='build'
                    isVisible={data.sectionVisibility.build}
                    hasData={data.build.buildSections.some(
                        (section: any) => section.vehicleImageUrl
                    )}
                    wrapperClass={`${styles.section} ${styles.buildSection}`}
                    contentClass={styles.sectionContent}
                >
                    <Build buildPoints={data.build.buildSections} />
                </SectionRenderer>
                <PoweredByShaedFooter />

                <Modal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    isSubmitted={isSubmitted}
                    pageName='Mullen One'
                    vehiclePath='mullenone'
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
