export const formatTime = (value: string): string => {
    if (!value) return '';

    const date = new Date(value.replace(' ', 'T'));
    if (isNaN(date.getTime())) return '';

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();

    if (diffMs < 0) {
        return formatDate(date);
    }

    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) {
        return 'Just now';
    }

    if (diffMin < 60) {
        return diffMin === 1 ? '1 minute ago' : `${diffMin} minutes ago`;
    }

    if (diffHour < 24) {
        return diffHour === 1 ? '1 hour ago' : `${diffHour} hours ago`;
    }

    if (diffDay < 7) {
        return diffDay === 1 ? '1 day ago' : `${diffDay} days ago`;
    }

    return formatDate(date);
};

const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date);
};

export const formatNumberToCompact = (value: number) => {
    const compactFormatter = new Intl.NumberFormat('en', {
        notation: 'compact',
        maximumFractionDigits: 1,
    });

    return compactFormatter.format(value);
};
