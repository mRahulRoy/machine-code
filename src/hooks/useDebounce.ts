export function useDebounce() {
    function deBouncer(delay: number, callback: (query: string) => void) {
        let timerId: NodeJS.Timeout;
        return function (query: string) {
            clearTimeout(timerId);
            timerId = setTimeout(() => callback(query), delay);
        };
    }

    return { deBouncer };
}
