import * as React from "react";
import * as moment from "moment-timezone";
import { DATE_FORMATS, LOCALES, MOMENT_FORMAT, TIMEZONES } from "src/utils/enums";
export function formatDate(locale: LOCALES, format: MOMENT_FORMAT, date: Date): string {
    return moment(date).format(format);
}

export type Timestamp = number;

export function isDateValid(locale: LOCALES, format: DATE_FORMATS, dateString: string): boolean | null {
    if (!dateString || typeof dateString !== "string") {
        return null;
    }
    if (format === DATE_FORMATS.yyyymmdd) {
        return !!dateString.match(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/);
    }
    if (locale === LOCALES.en_US) {
        switch (format) {
            case DATE_FORMATS.ddmmyyyy:
                return !!dateString.match(/^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/);
        }
    } else {
        switch (format) {
            case DATE_FORMATS.ddmmyyyy:
                return !!dateString.match(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/);
        }
    }
    return null;
}

export function profileInputFormat(locale: LOCALES): DATE_FORMATS {
    switch (locale) {
        case LOCALES.en_US:
            return DATE_FORMATS.MM_DD_YYYY;
        default:
            return DATE_FORMATS.DD_MM_YYYY;
    }
}

export function parseFormattedDate(timezone: TIMEZONES, locale: LOCALES, format: DATE_FORMATS, datestr: string): number | null {
    if (format === DATE_FORMATS.yyyymmdd) {
        return tsFromFormattedDate(timezone, moment(datestr, DATE_FORMATS.YYYY_MM_DD, true).toDate());
    }
    if (locale === LOCALES.en_US) {
        switch (format) {
            case DATE_FORMATS.ddmmyyyy:
                return tsFromFormattedDate(timezone, moment(datestr, DATE_FORMATS.MM_DD_YYYY, true).toDate());
        }
    } else {
        switch (format) {
            case DATE_FORMATS.ddmmyyyy:
                return tsFromFormattedDate(timezone, moment(datestr, DATE_FORMATS.DD_MM_YYYY, true).toDate());
        }
    }
    return null;
}

export function formatTs(timezone: TIMEZONES, locale: LOCALES, format: MOMENT_FORMAT, timestamp: number): string {
    let date: Date | null = toFormattedDate(timezone, timestamp);
    if (!date) {
        return '';
    }
    return formatDate(locale, format, date);
}

export function formatDateInterval(timezone: TIMEZONES, locale: LOCALES, dateStart: number, dateEnd: number): string | undefined {
    if (!dateStart || !dateEnd) {
        return undefined;
    }
    const dateStartFormat: string = formatTs(timezone, locale, MOMENT_FORMAT.l, dateStart),
        dateEndFormat: string = formatTs(timezone, locale, MOMENT_FORMAT.l, dateEnd);

    if (dateStartFormat === dateEndFormat) {
        let startMoment = moment(dateStart*1000),
            dateFormat = dateStartFormat;
        if(startMoment.year() == new Date().getUTCFullYear()) {
            dateFormat = dateStartFormat.replace('/'+startMoment.year().toString(),'');
        }
        return `${dateFormat} ${formatTs(timezone, locale, MOMENT_FORMAT.LT, dateStart)} - ${formatTs(timezone, locale, MOMENT_FORMAT.LT, dateEnd)}`;
    }
    return `${formatTs(timezone, locale, MOMENT_FORMAT.l_LT, dateStart)} - ${formatTs(timezone, locale, MOMENT_FORMAT.l_LT, dateEnd)}`;
}


// // TODO: refactor this in a more redux way
// let translations: any = {};
//
// export function setTranslations(newTranslations: Object): void {
//     translations = newTranslations || {};
// }

// export function _t(stringId: string | null | undefined, args: any = {}): string {
//     if (!stringId) {
//         return '';
//     }
//     let locale = getNativeLocale(),
//         localeLanguage: string = locale ? locale.slice(0, 2) : 'en',
//         unformattedString: string =
//             (!!translations && translations[localeLanguage] && translations[localeLanguage][stringId]) || '';
//     if (!unformattedString) {
//         switch (localeLanguage) {
//             case "ro":
//                 unformattedString = ro[stringId] || en[stringId];
//                 break;
//             case "cs":
//                 unformattedString = cs[stringId] || en[stringId];
//                 break;
//             case "es":
//                 unformattedString = es[stringId] || en[stringId];
//                 break;
//             case "zh":
//                 unformattedString = zh[stringId] || en[stringId];
//                 break;
//             default:
//                 unformattedString = en[stringId];
//         }
//     }
//     if (!unformattedString) {
//         unformattedString = stringId;
//     }
//     return unformattedString ?
//         unformattedString.replace(/%\w+%/g, all => {
//             let replacement = args[all.slice(1, -1)];
//             return replacement === null ? '' : replacement;
//         }) :
//         unformattedString;
// }


export function localOffsetMins(tz: TIMEZONES, date: Date): number {
    if (!tz || !date || !moment(date).tz(tz)) {
        return 0;
    }
    return moment(date).tz(tz).utcOffset() + date.getTimezoneOffset();
}

export function utcOffset(tz: TIMEZONES, ts: Timestamp): number {
    return moment(new Date(ts * 1000)).tz(tz).utcOffset() * 60;
}

export function tsFromFormattedDate(tz: TIMEZONES, date: Date): number {
    return date && (Math.floor(date.getTime() / 1000) - localOffsetMins(tz, date) * 60);
}

export function toFormattedDate(tz: TIMEZONES, ts: Timestamp): Date {
    let offsetSecs = localOffsetMins(tz, new Date(ts * 1000)) * 60;
    return new Date((ts + offsetSecs) * 1000);
}
