/**
 * Generates an .ics calendar file and triggers a browser download
 */
export function downloadCalendarEvent(card) {
  const weddingDate = new Date(card.weddingDate || '2026-11-30T10:00:00');
  
  // End date default: 8 hours later
  const endDate = new Date(weddingDate.getTime() + 8 * 60 * 60 * 1000);

  const formatDate = (date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
  };

  const startFormatted = formatDate(weddingDate);
  const endFormatted = formatDate(endDate);
  
  const title = `${card.groom?.name || 'Groom'} & ${card.bride?.name || 'Bride'}'s Wedding Ceremony`;
  const description = `${card.welcomeMessage || 'Wedding Invitation'}\nVenue: ${card.venue?.name || ''}, ${card.venue?.address || ''}`;
  const location = `${card.venue?.name || ''}, ${card.venue?.address || ''}`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Royal Wedding Invitations//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `DTSTART:${startFormatted}`,
    `DTEND:${endFormatted}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `${card.groom?.name || 'Wedding'}_and_${card.bride?.name || 'Wedding'}_SaveTheDate.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Creates Google Calendar URL
 */
export function getGoogleCalendarUrl(card) {
  const weddingDate = new Date(card.weddingDate || '2026-11-30T10:00:00');
  const endDate = new Date(weddingDate.getTime() + 8 * 60 * 60 * 1000);

  const formatDate = (date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
  };

  const title = encodeURIComponent(`${card.groom?.name || 'Groom'} & ${card.bride?.name || 'Bride'}'s Wedding Ceremony`);
  const details = encodeURIComponent(`${card.welcomeMessage || 'Wedding Celebration'}\n\nVenue: ${card.venue?.name || ''}`);
  const location = encodeURIComponent(`${card.venue?.name || ''}, ${card.venue?.address || ''}`);
  const dates = `${formatDate(weddingDate)}/${formatDate(endDate)}`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}
