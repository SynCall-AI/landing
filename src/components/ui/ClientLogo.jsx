import './ClientLogo.css';

export default function ClientLogo({ client, compact = false, dark = false }) {
    return (
        <a
            className={`client-logo${dark ? ' client-logo--on-dark' : ''}${compact ? ' client-logo--compact' : ''}`}
            href={client.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ '--client-logo-width': `${client.width}px`, '--client-logo-height': `${client.height}px` }}
        >
            <img src={dark && client.darkLogo ? client.darkLogo : client.logo} alt={client.name} width={client.width} height={client.height} loading="lazy" decoding="async" />
        </a>
    );
}
