import Link from 'next/link';

export default function AcademicStages() {
    const stages = [
        {
            id: 'foundational',
            title: 'Foundational Stage',
            subtitle: 'Bal Vatike II to Grade II',
            href: '/foundational-stage'
        },
        {
            id: 'elementary',
            title: 'Elementary Stage',
            subtitle: 'Grade III to V',
            href: '/elementary-stage'
        },
        {
            id: 'middle',
            title: 'Middle Stage',
            subtitle: 'Grade VI to VIII',
            href: '/middle-stage'
        },
        {
            id: 'secondary',
            title: 'Secondary Stage',
            subtitle: 'Grade IX to XII',
            href: '/secondary-stage'
        }
    ];

    return (
        <section className="academic-stages-section">
            <div className="academic-stages-grid">
                {stages.map((stage, index) => (
                    <Link
                        key={stage.id}
                        href={stage.href}
                        className={`stage-card stage-card-${index + 1}`}
                    >
                        <h2 className="stage-title">{stage.title}</h2>
                        <p className="stage-subtitle">{stage.subtitle}</p>
                    </Link>
                ))}
            </div>
        </section>
    );
}
