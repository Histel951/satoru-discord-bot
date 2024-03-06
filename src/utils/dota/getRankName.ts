import { RanksEnum } from "../../enums/RanksEnum";
import { RanksShortedEnum } from "../../enums/RanksShortedEnum";

export default (rankId: any, isShort: boolean = false): string | null => {
    const rankName: string = RanksEnum[rankId];

    if (isShort && rankName !== undefined) {
        return RanksShortedEnum[rankName as keyof typeof RanksShortedEnum];
    }

    return rankName ?? null;
}