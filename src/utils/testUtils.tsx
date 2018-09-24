export interface Testable {
    testId?: string,
}

const TESTING = false;

export const getTestProps = ( testId: string | undefined ) => {
    if (!TESTING) {
        return {};
    }
    if (!!testId) {
        return {
            accessible: true,
            id: testId,
            testId: testId,
            accessibilityLabel: testId,
        };
    }
    return {};
};