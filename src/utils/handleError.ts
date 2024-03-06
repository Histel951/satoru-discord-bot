export default (error: undefined | Error) => {
    if (error instanceof Error) {
        return error.message;
    }

    return 'Unknown error';
}