export interface Testable {
    testId?: string,
}

export const getTestProps = (testId: string | undefined) => {
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