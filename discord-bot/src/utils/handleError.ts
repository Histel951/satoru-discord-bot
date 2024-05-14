import { CatchErrorT } from "../types/CatchErrorT";

export default (error: CatchErrorT) => {
    if (error instanceof Error) {
        return error.message;
    }

    return 'Unknown error';
}