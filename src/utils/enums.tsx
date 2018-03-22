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
}

export enum SELECT_INPUT_TYPES {
    TEXT,
    INT,
    FLOAT,
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
