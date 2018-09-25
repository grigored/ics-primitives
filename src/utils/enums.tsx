export enum TEXT_INPUT_TYPES {
    TEXT,
    EMAIL,
    INT,
    FLOAT,
    PASSWORD,
    PHONE,
    JSON,
}

export enum FORM_INPUT_TYPES {
    TEXT,
    SELECT,
    DATE,
    TABLE_ACTIONS,
    ARRAY_OF_OBJECTS,
    PHOTO_UPLOAD,
    ARRAY_PHOTO_UPLOAD,
}

export enum MOMENT_FORMAT {
    LT = 'LT', // 8:30 PM
    L = 'L', // 09/04/1986
    l = 'l', // 9/4/1986
    l_LTS = 'l LTS', // 9/4/1986 08:03:00 AM
    l_LT = 'l LT', // 9/4/1986 08:03 AM
    L_LTS = 'L LTS', // 09/04/1986 08:03:00 AM
    L_LT = 'L LT', // 09/04/1986 08:03 AM
}

export enum LOCALES {
    en_US = 'en_US',
}

export enum DATE_FORMATS {
    yyyymmdd = 'yyyymmdd',
    ddmm = 'ddmm',
    ddmmyy = 'ddmmyy',
    ddmmyyyy = 'ddmmyyyy',
    ddmmyy_hm = 'ddmmyy hm',
    ddmmyy_hms = 'ddmmyy hms',
    ddmm_hms = 'ddmm hms',
    hm = 'hm',
    ddd_ddmm = 'ddd ddmm',
    mmm_dd = 'ddd_ddmm',
    mmm_dd_hm = 'mmm dd, hm',
    ddd_dd_mmm = 'ddd, dd mmm',
    MM_DD_YYYY = 'MM/DD/YYYY',
    YYYY_MM_DD = 'YYYY/MM/DD',
    DD_MM_YYYY = 'DD-MM-YYYY',
}

export enum TIMEZONES {
    UTC = 'UTC',
    EUROPE_BUCHAREST = 'Europe/Bucharest',
    LOS_ANGELES_AMERICA = 'LosAngeles/America',
    AFRICA_CASABLANCA = 'Africa/Casablanca',
}

export enum ACTION_SHEETS_IDS {
    IMAGE_CLICK = 'IMAGE_CLICK',
    POPOVER_ITEM_CLICK = 'POPOVER_ITEM_CLICK',
}

export enum CIRCULAR_PROGRESS_SIZE {
    SMALL,
    LARGE,
}

export enum PUSH_TYPES {
    DEEP_LINKS,
    MODAL,
    REGULAR,
    CLEAR_STACK,
}

export enum HTTP_METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    OPTIONS = 'OPTIONS',
}

export enum PLATFORM {
    WEB = 1,
    ANDROID,
    IOS,
    WEB_ANDROID,
    WEB_IOS,
    WEB_WINDOWS_PHONE,
}

export enum FILTER_OPERATORS {
    LIKE = '~',
    EQUAL = '=',
    LESS = '<',
    GREATER = '>',
    LESS_OR_EQUAL = '<=',
    GREATER_OR_EQUAL = '>=',
    BETWEEN = '><',
}