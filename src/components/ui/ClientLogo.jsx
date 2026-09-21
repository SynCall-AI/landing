import './ClientLogo.css';

export default function ClientLogo({ client, compact = false }) {
    return (
        <a
            className={`client-logo${client.darkBackground ? ' client-logo--on-dark' : ''}${compact ? ' client-logo--compact' : ''}`}
            href={client.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ '--client-logo-width': `${client.width}px`, '--client-logo-height': `${client.height}px` }}
        >
            <img src={client.logo} alt={client.name} width={client.width} height={client.height} loading="lazy" decoding="async" />
        </a>
    );
}
